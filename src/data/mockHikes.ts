import hikeDesert from "@/assets/hike-desert.jpg";
import hikeForest from "@/assets/hike-forest.jpg";
import hikeGalilee from "@/assets/hike-galilee.jpg";

export interface Hike {
  id: string;
  title: string;
  date: string;
  location: string;
  difficulty: 1 | 2 | 3;
  maxSpots: number;
  currentSpots: number;
  image: string;
  description: string;
}

export const mockHikes: Hike[] = [
  {
    id: "1",
    title: "נחל דוד - עין גדי",
    date: "2024-01-15",
    location: "מדבר יהודה",
    difficulty: 2,
    maxSpots: 20,
    currentSpots: 18,
    image: hikeDesert,
    description: "טיול מרהיב במדבר יהודה עם מעיינות ומפלים קסומים"
  },
  {
    id: "2",
    title: "יער הכרמל הירוק",
    date: "2024-01-22",
    location: "הר הכרמל",
    difficulty: 1,
    maxSpots: 25,
    currentSpots: 25,
    image: hikeForest,
    description: "טיול משפחתי ביער הכרמל המרהיב בין עצי אורן ואלונים"
  },
  {
    id: "3",
    title: "מסלול הר ארבל",
    date: "2024-02-05",
    location: "הגליל התחתון",
    difficulty: 3,
    maxSpots: 15,
    currentSpots: 8,
    image: hikeGalilee,
    description: "טיול מאתגר עם תצפיות מרהיבות על הכנרת והגולן"
  },
  {
    id: "4",
    title: "שביל ישראל - קטע הנגב",
    date: "2024-02-20",
    location: "מכתש רמון",
    difficulty: 3,
    maxSpots: 12,
    currentSpots: 5,
    image: hikeDesert,
    description: "חוויה מדברית אותנטית בלב המכתש הגדול בעולם"
  },
];

export const formatHebrewDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };
  return date.toLocaleDateString('he-IL', options);
};

export const getDifficultyLabel = (difficulty: 1 | 2 | 3): string => {
  switch (difficulty) {
    case 1: return "קל";
    case 2: return "בינוני";
    case 3: return "מאתגר";
  }
};
