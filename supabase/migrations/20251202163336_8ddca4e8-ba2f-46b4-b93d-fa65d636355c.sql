-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hikes table
CREATE TABLE public.hikes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  difficulty SMALLINT NOT NULL CHECK (difficulty >= 1 AND difficulty <= 3),
  description TEXT,
  max_spots INTEGER NOT NULL DEFAULT 20,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create registrations table
CREATE TABLE public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  hike_id UUID NOT NULL REFERENCES public.hikes(id) ON DELETE CASCADE,
  is_driver BOOLEAN NOT NULL DEFAULT false,
  passenger_seats INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, hike_id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hikes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Hikes policies (public read, admin write - for now anyone can read)
CREATE POLICY "Anyone can view hikes" ON public.hikes FOR SELECT USING (true);

-- Registrations policies
CREATE POLICY "Users can view all registrations" ON public.registrations FOR SELECT USING (true);
CREATE POLICY "Users can insert their own registration" ON public.registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own registration" ON public.registrations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own registration" ON public.registrations FOR DELETE USING (auth.uid() = user_id);

-- Trigger for profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample hikes data
INSERT INTO public.hikes (title, date, location, difficulty, description, max_spots, image_url) VALUES
  ('נחל דוד - עין גדי', '2024-01-15 08:00:00+02', 'מדבר יהודה', 2, 'טיול מרהיב במדבר יהודה עם מעיינות ומפלים קסומים', 20, '/hike-desert.jpg'),
  ('יער הכרמל הירוק', '2024-01-22 07:30:00+02', 'הר הכרמל', 1, 'טיול משפחתי ביער הכרמל המרהיב בין עצי אורן ואלונים', 25, '/hike-forest.jpg'),
  ('מסלול הר ארבל', '2024-02-05 06:00:00+02', 'הגליל התחתון', 3, 'טיול מאתגר עם תצפיות מרהיבות על הכנרת והגולן', 15, '/hike-galilee.jpg'),
  ('שביל ישראל - קטע הנגב', '2024-02-20 05:30:00+02', 'מכתש רמון', 3, 'חוויה מדברית אותנטית בלב המכתש הגדול בעולם', 12, '/hike-desert.jpg');