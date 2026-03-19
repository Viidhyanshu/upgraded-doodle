import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { TeamMember } from "./teamData";

interface FarewellModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember;
}

const Balloon = ({ color, delay }: { color: string; delay: number }) => (
  <motion.div
    initial={{ y: "120vh", x: `${Math.random() * 100}vw`, opacity: 0 }}
    animate={{ y: "-20vh", opacity: [0, 1, 1, 0] }}
    transition={{ duration: 15 + Math.random() * 10, delay, repeat: Infinity, ease: "linear" }}
    style={{
      position: "fixed",
      zIndex: 998,
      fontSize: "40px",
      pointerEvents: "none",
    }}
  >
    <div style={{
      width: "50px",
      height: "65px",
      background: color,
      borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
      position: "relative",
      boxShadow: "inset -5px -5px 10px rgba(0,0,0,0.1)",
    }}>
      <div style={{
        position: "absolute",
        bottom: "-10px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "2px",
        height: "40px",
        background: "rgba(255,255,255,0.3)",
      }} />
    </div>
  </motion.div>
);

const PartyPopper = ({ x, y, delay }: { x: string; y: string; delay: number }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
    transition={{ duration: 2, delay, repeat: Infinity, repeatDelay: 3 }}
    style={{
      position: "absolute",
      left: x,
      top: y,
      fontSize: "40px",
      pointerEvents: "none",
      zIndex: 1001,
    }}
  >
    🎉
  </motion.div>
);

export default function FarewellModal({ isOpen, onClose, member }: FarewellModalProps) {
  useEffect(() => {
    if (isOpen) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1002 };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const shootStars = () => {
        const starDefaults = {
          spread: 360,
          ticks: 50,
          gravity: 0,
          decay: 0.94,
          startVelocity: 30,
          colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
        };

        const shoot = () => {
          confetti({
            ...starDefaults,
            particleCount: 40,
            scalar: 1.2,
            shapes: ["star"],
          });

          confetti({
            ...starDefaults,
            particleCount: 10,
            scalar: 0.75,
            shapes: ["circle"],
          });
        };

        setTimeout(shoot, 0);
        setTimeout(shoot, 100);
        setTimeout(shoot, 200);
      };

      const shootSideCannons = () => {
        const end = Date.now() + 3 * 1000;
        const cannonColors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

        const frame = () => {
          if (Date.now() > end) return;
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            origin: { x: 0, y: 0.5 },
            colors: cannonColors,
            zIndex: 1002,
          });
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            origin: { x: 1, y: 0.5 },
            colors: cannonColors,
            zIndex: 1002,
          });
          requestAnimationFrame(frame);
        };
        frame();
      };

      shootStars();
      shootSideCannons();

      const interval = window.setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const balloons = [
    { color: "rgba(255, 182, 193, 0.6)", delay: 0 },
    { color: "rgba(173, 216, 230, 0.6)", delay: 2 },
    { color: "rgba(144, 238, 144, 0.6)", delay: 5 },
    { color: "rgba(255, 255, 224, 0.6)", delay: 1 },
    { color: "rgba(221, 160, 221, 0.6)", delay: 7 },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {balloons.map((b, i) => (
            <Balloon key={i} color={b.color} delay={b.delay} />
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(12px)",
              padding: "20px",
            }}
            onClick={onClose}
          >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "520px",
              background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
              borderRadius: "40px",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              overflow: "visible", // for balloons/poppers near edges
              boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.15), 0 0 40px rgba(239, 158, 0, 0.05)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative Poppers */}
            <PartyPopper x="-10px" y="-10px" delay={0.5} />
            <PartyPopper x="90%" y="-20px" delay={1.2} />
            <PartyPopper x="-20px" y="80%" delay={2} />
            <PartyPopper x="95%" y="70%" delay={0.8} />

            <div style={{ padding: "45px", display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Close Button */}
              <button 
                onClick={onClose}
                style={{
                  position: "absolute",
                  top: "24px",
                  right: "24px",
                  background: "rgba(0, 0, 0, 0.05)",
                  border: "none",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#333",
                  fontSize: "24px",
                  transition: "all 0.2s",
                  zIndex: 10,
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0, 0, 0, 0.1)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(0, 0, 0, 0.05)"}
              >
                ×
              </button>

              {/* Image with Decorative Frame */}
              <div style={{
                position: "relative",
                width: "180px",
                height: "180px",
                marginBottom: "30px",
              }}>
                <div style={{
                  position: "absolute",
                  inset: "-10px",
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #EF9E00, #57ede0)",
                  opacity: 0.2,
                  filter: "blur(15px)",
                }} />
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    const starDefaults = {
                      spread: 360,
                      ticks: 50,
                      gravity: 0,
                      decay: 0.94,
                      startVelocity: 30,
                      colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
                    };
                    const shoot = () => {
                      confetti({ ...starDefaults, particleCount: 40, scalar: 1.2, shapes: ["star"] });
                      confetti({ ...starDefaults, particleCount: 10, scalar: 0.75, shapes: ["circle"] });
                    };
                    setTimeout(shoot, 0); setTimeout(shoot, 100); setTimeout(shoot, 200);

                    // Also shoot side cannons on image click
                    const end = Date.now() + 2000;
                    const cannonColors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
                    const frame = () => {
                      if (Date.now() > end) return;
                      confetti({ particleCount: 2, angle: 60, spread: 55, startVelocity: 60, origin: { x: 0, y: 0.5 }, colors: cannonColors, zIndex: 1002 });
                      confetti({ particleCount: 2, angle: 120, spread: 55, startVelocity: 60, origin: { x: 1, y: 0.5 }, colors: cannonColors, zIndex: 1002 });
                      requestAnimationFrame(frame);
                    };
                    frame();
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    border: "3px solid #EF9E00",
                    padding: "5px",
                    background: "#1a1a1a",
                    cursor: "pointer",
                  }}
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>

              {/* Name & Role */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 800,
                  color: "#1a1a1a",
                  margin: "0 0 8px 0",
                  textAlign: "center",
                  letterSpacing: "-0.02em",
                }}
              >
                {member.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontSize: "1rem",
                  color: "#EF9E00",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  margin: "0 0 32px 0",
                }}
              >
                {member.role}
              </motion.p>

              {/* The Note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  width: "100%",
                  padding: "24px",
                  background: "rgba(0, 0, 0, 0.02)",
                  borderRadius: "20px",
                  border: "1px solid rgba(0, 0, 0, 0.03)",
                  position: "relative",
                }}
              >
                <span style={{
                  position: "absolute",
                  top: "-15px",
                  left: "20px",
                  fontSize: "40px",
                  color: "#EF9E00",
                  opacity: 0.4,
                  fontFamily: "serif",
                }}>“</span>
                <p style={{
                  fontSize: "1.15rem",
                  lineHeight: 1.7,
                  color: "#333",
                  textAlign: "center",
                  fontStyle: "italic",
                  margin: 0,
                  position: "relative",
                  zIndex: 1,
                  fontWeight: 500,
                }}>
                  {member.note || "Wishing you all the success in your future endeavors! It's been an incredible journey together."}
                </p>
                <span style={{
                  position: "absolute",
                  bottom: "-35px",
                  right: "20px",
                  fontSize: "40px",
                  color: "#EF9E00",
                  opacity: 0.4,
                  fontFamily: "serif",
                }}>”</span>
              </motion.div>

              {/* Bottom Decoration */}
              <div style={{
                marginTop: "48px",
                fontSize: "0.85rem",
                color: "rgba(0, 0, 0, 0.3)",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <div style={{ width: "30px", height: "1px", background: "rgba(0, 0, 0, 0.1)" }} />
                FAREWELL 2025-2026
                <div style={{ width: "30px", height: "1px", background: "rgba(0, 0, 0, 0.1)" }} />
              </div>
            </div>
          </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
