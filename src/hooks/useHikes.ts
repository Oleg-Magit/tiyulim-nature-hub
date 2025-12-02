import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type Hike = Tables<"hikes"> & {
  registrationCount: number;
};

export const useHikes = () => {
  return useQuery({
    queryKey: ["hikes"],
    queryFn: async (): Promise<Hike[]> => {
      // Fetch hikes
      const { data: hikes, error: hikesError } = await supabase
        .from("hikes")
        .select("*")
        .order("date", { ascending: true });

      if (hikesError) throw hikesError;

      // Fetch registration counts for each hike
      const { data: registrations, error: regError } = await supabase
        .from("registrations")
        .select("hike_id");

      if (regError) throw regError;

      // Count registrations per hike
      const countMap: Record<string, number> = {};
      registrations?.forEach((reg) => {
        countMap[reg.hike_id] = (countMap[reg.hike_id] || 0) + 1;
      });

      return (hikes || []).map((hike) => ({
        ...hike,
        registrationCount: countMap[hike.id] || 0,
      }));
    },
  });
};

export const useUserRegistrations = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["user-registrations", userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from("registrations")
        .select(`
          *,
          hikes (*)
        `)
        .eq("user_id", userId);

      if (error) throw error;
      return data || [];
    },
    enabled: !!userId,
  });
};

export const formatHebrewDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return date.toLocaleDateString("he-IL", options);
};

export const getDifficultyLabel = (difficulty: number): string => {
  switch (difficulty) {
    case 1:
      return "קל";
    case 2:
      return "בינוני";
    case 3:
      return "מאתגר";
    default:
      return "לא ידוע";
  }
};
