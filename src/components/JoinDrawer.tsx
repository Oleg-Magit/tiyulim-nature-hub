import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { X, Car, User, Calendar, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { DifficultyIndicator } from "./DifficultyIndicator";
import { Hike, formatHebrewDate } from "@/data/mockHikes";
import { useToast } from "@/hooks/use-toast";

interface JoinDrawerProps {
  hike: Hike | null;
  isOpen: boolean;
  onClose: () => void;
}

export const JoinDrawer = ({ hike, isOpen, onClose }: JoinDrawerProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isDriver, setIsDriver] = useState(false);
  const [passengerSeats, setPassengerSeats] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone) {
      toast({
        title: "שדות חסרים",
        description: "נא למלא את כל השדות הנדרשים",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#E07A5F", "#2F4858", "#F6F4EF"],
    });

    setTimeout(() => {
      setIsSuccess(false);
      setName("");
      setPhone("");
      setIsDriver(false);
      setPassengerSeats(1);
      onClose();

      toast({
        title: "נרשמת בהצלחה! 🎉",
        description: `נתראה בטיול ${hike?.title}`,
      });
    }, 2000);
  };

  const resetAndClose = () => {
    setName("");
    setPhone("");
    setIsDriver(false);
    setPassengerSeats(1);
    setIsSuccess(false);
    onClose();
  };

  if (!hike) return null;

  return (
    <Drawer open={isOpen} onOpenChange={resetAndClose}>
      <DrawerContent className="bg-card border-t border-border max-h-[90vh]">
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader className="border-b border-border pb-4">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-xl font-bold">
                הרשמה לטיול
              </DrawerTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={resetAndClose}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </DrawerHeader>

          <div className="p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6"
                  >
                    <Check className="w-10 h-10 text-accent" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    נרשמת בהצלחה!
                  </h3>
                  <p className="text-muted-foreground">נתראה בטיול 🥾</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Hike Summary */}
                  <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
                    <h4 className="font-semibold text-foreground text-lg">
                      {hike.title}
                    </h4>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatHebrewDate(hike.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {hike.location}
                      </div>
                    </div>
                    <DifficultyIndicator difficulty={hike.difficulty} />
                  </div>

                  {/* Personal Details */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">שם מלא</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="הכנס את שמך"
                        className="text-right"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">טלפון (WhatsApp)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="050-1234567"
                        className="text-right"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* Carpool Section */}
                  <div className="bg-secondary/30 rounded-xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                          <Car className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <Label className="font-medium">אני מגיע עם רכב</Label>
                          <p className="text-xs text-muted-foreground">
                            עזרו לחברים להגיע
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={isDriver}
                        onCheckedChange={setIsDriver}
                      />
                    </div>

                    <AnimatePresence>
                      {isDriver ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2 overflow-hidden"
                        >
                          <Label>כמה מקומות פנויים?</Label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4].map((num) => (
                              <Button
                                key={num}
                                type="button"
                                variant={
                                  passengerSeats === num ? "accent" : "outline"
                                }
                                size="sm"
                                className="flex-1"
                                onClick={() => setPassengerSeats(num)}
                              >
                                {num}
                              </Button>
                            ))}
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2 text-sm text-muted-foreground overflow-hidden"
                        >
                          <User className="w-4 h-4" />
                          <span>אשמח לטרמפ 🙏</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full"
                      />
                    ) : (
                      "שריין מקום"
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
