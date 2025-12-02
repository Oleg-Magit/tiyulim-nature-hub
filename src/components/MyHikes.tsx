import { motion } from "framer-motion";
import { Calendar, MapPin, Car, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRegistrations, formatHebrewDate } from "@/hooks/useHikes";
import { DifficultyIndicator } from "./DifficultyIndicator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Import local images
import hikeDesert from "@/assets/hike-desert.jpg";
import hikeForest from "@/assets/hike-forest.jpg";
import hikeGalilee from "@/assets/hike-galilee.jpg";

const imageMap: Record<string, string> = {
  "/hike-desert.jpg": hikeDesert,
  "/hike-forest.jpg": hikeForest,
  "/hike-galilee.jpg": hikeGalilee,
};

export const MyHikes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: registrations, isLoading } = useUserRegistrations(user?.id);

  if (!user) {
    return (
      <section className="py-16 px-4 md:px-6">
        <div className="container max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-8"
          >
            <User className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              התחבר לצפייה בטיולים שלך
            </h2>
            <p className="text-muted-foreground mb-6">
              כדי לראות את הטיולים שנרשמת אליהם, יש להתחבר לחשבון
            </p>
            <Button variant="accent" onClick={() => navigate("/auth")}>
              התחבר עכשיו
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-16 px-4 md:px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="glass-card rounded-2xl p-4 animate-pulse">
                <div className="h-32 bg-muted rounded-xl mb-4" />
                <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!registrations || registrations.length === 0) {
    return (
      <section className="py-16 px-4 md:px-6">
        <div className="container max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-8"
          >
            <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              עדיין לא נרשמת לטיולים
            </h2>
            <p className="text-muted-foreground mb-6">
              גלה את הטיולים הקרובים והצטרף לחוויה!
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-6">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            הטיולים שלי
          </h2>
          <p className="text-muted-foreground text-lg">
            הטיולים שנרשמת אליהם
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {registrations.map((reg, index) => {
            const hike = reg.hikes as any;
            if (!hike) return null;

            const imageUrl = imageMap[hike.image_url] || hikeDesert;

            return (
              <motion.div
                key={reg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-40 h-32 sm:h-auto">
                    <img
                      src={imageUrl}
                      alt={hike.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="font-bold text-foreground text-lg mb-2">
                      {hike.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatHebrewDate(hike.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {hike.location}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <DifficultyIndicator difficulty={hike.difficulty as 1 | 2 | 3} />
                      <div className="flex items-center gap-1 text-sm">
                        {reg.is_driver ? (
                          <>
                            <Car className="w-4 h-4 text-accent" />
                            <span className="text-accent">
                              נהג ({reg.passenger_seats} מקומות)
                            </span>
                          </>
                        ) : (
                          <>
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">משתתף</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
