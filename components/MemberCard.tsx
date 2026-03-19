import React, { useState } from "react";
import FarewellModal from "./FarewellModal";
import { TeamMember } from "./teamData";

/* ── LinkedIn SVG ─────────────────────────── */


/* ── Photo Card ─────────────────────────────────────────────── */
export default function MemberCard({ member }: { member: TeamMember }) {
  const [hovered, setHovered] = useState(false);
  const [showNote, setShowNote] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setShowNote(!showNote)}
      className="w-full max-w-[170px] xs:max-w-[200px] md:max-w-[220px]"
      style={{
        position: "relative",
        height: "auto",
        aspectRatio: "220 / 290",
        borderRadius: "0",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hovered ? "0 24px 48px rgba(0,0,0,0.7)" : "0 8px 24px rgba(0,0,0,0.4)",
        transition: "box-shadow 0.4s ease",
        flexShrink: 0,
      }}
    >
      {/* Portrait — grayscale by default, color on hover */}
      <img
        src={member.image}
        alt={member.name}
        style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          transition: "filter 0.5s ease",
        }}
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)" }} />

      <FarewellModal 
        isOpen={showNote} 
        onClose={() => setShowNote(false)} 
        member={member} 
      />



      {/* Name + Role */}
      <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "16px" }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem", color: "#fff", lineHeight: 1.2 }}>{member.name}</p>
        <p style={{ margin: "4px 0 0", fontWeight: 400, fontSize: "0.78rem", color: "rgba(255,255,255,0.6)" }}>{member.role}</p>
      </div>
    </div>
  );
}
