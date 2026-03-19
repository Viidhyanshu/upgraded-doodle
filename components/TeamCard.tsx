import React from 'react';
import FarewellModal from './FarewellModal';


export interface TeamCardProps {
  image: string;
  name: string;
  role: string;
  note?: string;
  className?: string;
}

const TeamCard: React.FC<TeamCardProps> = ({
  image,
  name,
  role,
  note,
  className = ""
}) => {
  const [hovered, setHovered] = React.useState(false);
  const [showNote, setShowNote] = React.useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl cursor-pointer ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setShowNote(!showNote)}
    >

      {/* Image */}
      <img
        src={image}
        alt={name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'filter 0.5s ease, transform 0.5s ease',
          display: 'block',
        }}
      />

      {/* Dark gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
        transition: 'opacity 0.3s ease',
      }} />

      <FarewellModal 
        isOpen={showNote} 
        onClose={() => setShowNote(false)} 
        member={{ name, role, image, note }} 
      />

      {/* Info box */}
      <div style={{
        position: 'absolute',
        left: '50%',
        bottom: '12px',
        transform: hovered ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(16px)',
        opacity: hovered ? 1 : 0,
        transition: 'all 0.3s ease-out',
        width: '90%',
      }}>
        <div
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center"
          style={{ padding: '8px 12px' }}
        >
          {/* Name + Role */}
          <div className="min-w-0 pr-2">
            <h3 className="text-sm font-semibold text-gray-900 truncate leading-tight">
              {name}
            </h3>
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {role}
            </p>
          </div>


        </div>
      </div>

    </div>
  );
};

export default TeamCard;
