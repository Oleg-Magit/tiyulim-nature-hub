import { motion } from "framer-motion";
import { Mountain, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 hidden md:block"
    >
      <div className="bg-card/80 backdrop-blur-lg border-b border-border/50">
        <div className="container max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Mountain className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">טיולים</span>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-8">
              <a
                href="#"
                className="text-foreground font-medium hover:text-accent transition-colors"
              >
                ראשי
              </a>
              <a
                href="#hikes"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                טיולים
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                אודות
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                צור קשר
              </a>
            </nav>

            {/* CTA */}
            <Button variant="accent" size="default">
              הירשם עכשיו
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
