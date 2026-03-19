"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import MemberCard from "./MemberCard";
import FlyingBalloons, { DecorBalloon, Sparkles } from "./FlyingBalloons";

import { CORE_MEMBERS, TeamMember } from './teamData';



/* ── Sticky Panel ─────────────────────────────────────────── */
interface PanelProps { title: string; members: TeamMember[]; bg: string; zIndex: number; panelRef: React.RefObject<HTMLDivElement | null>; gradient?: string; }

function StickyPanel({ title, members, bg, zIndex, panelRef, gradient }: PanelProps) {
  const isCore = title.toLowerCase().includes("core");

  return (
    <div
      ref={panelRef}
      style={{
        position: isCore ? "relative" : "sticky",
        top: 0,
        minHeight: "100vh",
        height: "auto",
        width: "100%",
        zIndex,
        background: bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "80px 5vw 40px",
        boxSizing: "border-box",
        overflow: "hidden",
        borderRadius: "0",
        boxShadow: zIndex > 1 ? "0 -12px 60px rgba(0,0,0,0.05)" : "none",
      }}
    >
      <FlyingBalloons count={120} durationBase={110} durationRandom={50} />
      {gradient && <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: gradient, opacity: 0.1 }} />}
      <motion.div 
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', position: 'relative', zIndex: 10 }}
      >
        <DecorBalloon color="rgba(144, 238, 144, 0.6)" size={32} delay={0.5} />
        <div style={{ 
          position: 'relative',
          background: 'rgba(255, 255, 255, 0.85)', 
          backdropFilter: 'blur(10px)',
          padding: '8px 32px', 
          borderRadius: '50px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.03), inset 0 0 0 1px rgba(255,255,255,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Sparkles />
          <h2 style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)", fontWeight: 800, color: "#2d3436", letterSpacing: "0.02em", margin: 0, textAlign: "center" }}>
            {title}
          </h2>
        </div>
        <DecorBalloon color="rgba(221, 160, 221, 0.6)" size={32} delay={2} />
      </motion.div>
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 w-full max-w-[980px] justify-center px-2">
        {members.map((m, i) => <MemberCard key={`${m.name}-${i}`} member={m} />)}
      </div>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────── */
export default function StackedSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If only one panel exists, we might not need the scroll scale/filter transition
    // but we can keep the structure for consistency or remove ScrollTrigger if not needed.
    // For now, I'll remove the specific transition between panel 1 and 2.
    return () => {
      if (panel2Ref.current) {
        panel2Ref.current.style.transform = ''
        panel2Ref.current.style.filter = ''
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <StickyPanel panelRef={panel2Ref} title="Core Committee" members={CORE_MEMBERS} bg="#ffffff" gradient="radial-gradient(ellipse 60% 40% at 50% 0%, rgba(239, 158, 0, 0.05) 0%, transparent 70%)" zIndex={2} />
      
      {/* Final Farewell Message */}
      <footer style={{ 
        width: '100%', 
        padding: '140px 4vw', 
        paddingBottom: '180px',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#fff',
        position: 'relative',
        zIndex: 5
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '12px',
            background: '#fbb2d2ff',
            padding: '15px 45px',
            borderRadius: '100px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
            border: '1px solid rgba(252, 77, 164, 0.4)',
            backdropFilter: 'blur(10px)'
          }}>
            <Sparkles />
            <h1 style={{ 
              fontSize: 'clamp(2rem, 6vw, 4rem)', 
              fontWeight: 900, 
              color: '#fc4da4ff', 
              margin: 0,
              letterSpacing: '-0.02em',
              textShadow: '0 0 15px rgba(252, 77, 164, 0.4)'
            }}>
              We will miss you
            </h1>
          </div>
          <p style={{ marginTop: '28px', color: 'rgba(0,0,0,0.4)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
            IEEE MUJ 2025-26
          </p>
        </motion.div>
      </footer>
    </div>
  );
}
