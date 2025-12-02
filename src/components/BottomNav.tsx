import { motion } from "framer-motion";
import { Home, Mountain, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: "home", label: "ראשי", icon: <Home className="w-5 h-5" /> },
  { id: "hikes", label: "הטיולים שלי", icon: <Mountain className="w-5 h-5" /> },
  { id: "profile", label: "פרופיל", icon: <User className="w-5 h-5" /> },
];

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      <div className="bg-card/90 backdrop-blur-lg border-t border-border shadow-medium">
        <div className="flex items-center justify-around py-2 px-4 safe-area-inset-bottom">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "relative flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors",
                activeTab === item.id
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-accent/10 rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.icon}</span>
              <span className="relative z-10 text-xs font-medium">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};
