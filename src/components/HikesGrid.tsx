import { motion } from "framer-motion";
import { HikeCard } from "./HikeCard";
import { useHikes, Hike } from "@/hooks/useHikes";

interface HikesGridProps {
  onJoinHike: (hike: Hike) => void;
}

export const HikesGrid = ({ onJoinHike }: HikesGridProps) => {
  const { data: hikes, isLoading, error } = useHikes();

  if (isLoading) {
    return (
      <section id="hikes" className="py-16 px-4 md:px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              הטיולים הקרובים
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-card rounded-2xl p-4 animate-pulse">
                <div className="h-48 bg-muted rounded-xl mb-4" />
                <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="hikes" className="py-16 px-4 md:px-6">
        <div className="container max-w-6xl mx-auto text-center">
          <p className="text-destructive">שגיאה בטעינת הטיולים</p>
        </div>
      </section>
    );
  }

  return (
    <section id="hikes" className="py-16 px-4 md:px-6">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            הטיולים הקרובים
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            בחרו את הטיול המושלם עבורכם והצטרפו לחוויה בלתי נשכחת בטבע
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hikes?.map((hike, index) => (
            <HikeCard
              key={hike.id}
              hike={hike}
              index={index}
              onJoin={onJoinHike}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
