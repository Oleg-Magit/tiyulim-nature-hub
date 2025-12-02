import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HikesGrid } from "@/components/HikesGrid";
import { BottomNav } from "@/components/BottomNav";
import { JoinDrawer } from "@/components/JoinDrawer";
import { Hike, mockHikes } from "@/data/mockHikes";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedHike, setSelectedHike] = useState<Hike | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleJoinHike = (hike: Hike) => {
    setSelectedHike(hike);
    setIsDrawerOpen(true);
  };

  const handleCtaClick = () => {
    const firstAvailableHike = mockHikes.find(
      (h) => h.currentSpots < h.maxSpots
    );
    if (firstAvailableHike) {
      handleJoinHike(firstAvailableHike);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <Header />

      <main>
        <HeroSection onCtaClick={handleCtaClick} />
        <HikesGrid onJoinHike={handleJoinHike} />
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      <JoinDrawer
        hike={selectedHike}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default Index;
