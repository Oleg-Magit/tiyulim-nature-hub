import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Suspense } from "react";
import { Forest3D } from "./Forest3D";

interface HeroSectionProps {
  onCtaClick: () => void;
}

export const HeroSection = ({ onCtaClick }: HeroSectionProps) => {
  const scrollToHikes = () => {
    document.getElementById("hikes")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden bg-primary">
      {/* 3D Forest Background */}
      <Suspense fallback={
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary-foreground/20" />
      }>
        <Forest3D />
      </Suspense>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-2 mb-6 rounded-full bg-card/30 backdrop-blur-md border border-accent/20 text-accent-foreground text-sm font-medium"
          >
            🥾 קהילת הטיולים של ישראל
          </motion.span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-accent-foreground mb-6 leading-tight">
            הטבע קורא לך
            <br />
            <span className="text-accent">הצטרף לטיול הבא</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-accent-foreground/80 mb-10 max-w-xl mx-auto"
          >
            טיולים חודשיים בקבוצות קטנות, מסלולים מרהיבים ואווירה משפחתית
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              variant="hero"
              size="xl"
              onClick={onCtaClick}
            >
              שריין מקום
            </Button>
            <Button
              variant="glass"
              size="xl"
              onClick={scrollToHikes}
              className="text-accent-foreground"
            >
              גלה את הטיולים
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToHikes}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-accent-foreground/60 hover:text-accent-foreground transition-colors"
          >
            <ChevronDown size={32} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
