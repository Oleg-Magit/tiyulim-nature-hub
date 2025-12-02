import { motion } from "framer-motion";
import { HikeCard } from "./HikeCard";
import { Hike, mockHikes } from "@/data/mockHikes";

interface HikesGridProps {
  onJoinHike: (hike: Hike) => void;
}

export const HikesGrid = ({ onJoinHike }: HikesGridProps) => {
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
          {mockHikes.map((hike, index) => (
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
