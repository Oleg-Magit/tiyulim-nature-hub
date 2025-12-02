import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HikesGrid } from "@/components/HikesGrid";
import { MyHikes } from "@/components/MyHikes";
import { BottomNav } from "@/components/BottomNav";
import { JoinDrawer } from "@/components/JoinDrawer";
import { Hike, useHikes } from "@/hooks/useHikes";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedHike, setSelectedHike] = useState<Hike | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: hikes } = useHikes();

  const handleJoinHike = (hike: Hike) => {
    setSelectedHike(hike);
    setIsDrawerOpen(true);
  };

  const handleCtaClick = () => {
    const firstAvailableHike = hikes?.find(
      (h) => h.max_spots - h.registrationCount > 0
    );
    if (firstAvailableHike) {
      handleJoinHike(firstAvailableHike);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <Header />

      <main>
        {activeTab === "home" && (
          <>
            <HeroSection onCtaClick={handleCtaClick} />
            <HikesGrid onJoinHike={handleJoinHike} />
          </>
        )}
        {activeTab === "hikes" && <MyHikes />}
        {activeTab === "profile" && (
          <div className="py-16 px-4 text-center">
            <p className="text-muted-foreground">פרופיל - בקרוב</p>
          </div>
        )}
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
