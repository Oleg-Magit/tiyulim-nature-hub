import { motion } from "framer-motion";
import { MapPin, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DifficultyIndicator } from "./DifficultyIndicator";
import { Hike, formatHebrewDate } from "@/data/mockHikes";
import { cn } from "@/lib/utils";

interface HikeCardProps {
  hike: Hike;
  index: number;
  onJoin: (hike: Hike) => void;
}

export const HikeCard = ({ hike, index, onJoin }: HikeCardProps) => {
  const isFull = hike.currentSpots >= hike.maxSpots;
  const spotsLeft = hike.maxSpots - hike.currentSpots;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative rounded-2xl overflow-hidden glass-card",
        index === 0 && "md:col-span-2 md:row-span-2"
      )}
    >
      {/* Image */}
      <div className={cn(
        "relative overflow-hidden",
        index === 0 ? "h-64 md:h-full md:min-h-[400px]" : "h-48"
      )}>
        <img
          src={hike.image}
          alt={hike.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

        {/* Date Badge */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-card/80 backdrop-blur-sm text-foreground border-0 shadow-soft">
            <Calendar className="w-3 h-3 ml-1" />
            {formatHebrewDate(hike.date)}
          </Badge>
        </div>

        {/* Status Badge */}
        {isFull && (
          <div className="absolute top-4 left-4">
            <Badge variant="destructive" className="shadow-soft">
              רשימת המתנה
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className={cn(
          "font-bold text-foreground mb-2",
          index === 0 ? "text-2xl" : "text-lg"
        )}>
          {hike.title}
        </h3>

        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4" />
          <span>{hike.location}</span>
        </div>

        {index === 0 && (
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {hike.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-4">
          <DifficultyIndicator difficulty={hike.difficulty} />
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{spotsLeft > 0 ? `נשארו ${spotsLeft} מקומות` : "מלא"}</span>
          </div>
        </div>

        <Button
          variant={isFull ? "outline" : "accent"}
          className="w-full"
          onClick={() => onJoin(hike)}
        >
          {isFull ? "הירשם לרשימת המתנה" : "הצטרף לטיול"}
        </Button>
      </div>
    </motion.div>
  );
};
