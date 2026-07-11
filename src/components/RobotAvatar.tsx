export default function RobotAvatar({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <rect x="25" y="40" width="70" height="55" rx="16" fill="#2563eb" />
      <rect x="30" y="45" width="60" height="45" rx="12" fill="#3b82f6" />

      {/* Head */}
      <rect x="30" y="18" width="60" height="32" rx="12" fill="#2563eb" />
      <rect x="35" y="22" width="50" height="24" rx="8" fill="#1e40af" />

      {/* Eyes */}
      <circle cx="48" cy="34" r="7" fill="#bfdbfe" />
      <circle cx="72" cy="34" r="7" fill="#bfdbfe" />
      <circle cx="48" cy="34" r="4" fill="white" />
      <circle cx="72" cy="34" r="4" fill="white" />
      <circle cx="49" cy="33" r="2" fill="#1e3a8a" />
      <circle cx="73" cy="33" r="2" fill="#1e3a8a" />

      {/* Antenna */}
      <line x1="60" y1="18" x2="60" y2="8" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="6" r="4" fill="#60a5fa" />

      {/* Goggles strap */}
      <path d="M30 30 Q25 30 25 35 L25 38 Q25 42 30 42" stroke="#fbbf24" strokeWidth="2.5" fill="none" />
      <path d="M90 30 Q95 30 95 35 L95 38 Q95 42 90 42" stroke="#fbbf24" strokeWidth="2.5" fill="none" />
      <line x1="30" y1="31" x2="38" y2="31" stroke="#fbbf24" strokeWidth="2" />
      <line x1="82" y1="31" x2="90" y2="31" stroke="#fbbf24" strokeWidth="2" />

      {/* Mouth / smile */}
      <path d="M48 42 Q60 50 72 42" stroke="#bfdbfe" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Flask on chest */}
      <path d="M52 58 L52 66 Q52 72 56 74 L60 76 L64 74 Q68 72 68 66 L68 58 Z" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
      <rect x="54" y="55" width="12" height="4" rx="1" fill="#93c5fd" />
      <ellipse cx="60" cy="70" rx="5" ry="3" fill="#4ade80" opacity="0.7" />

      {/* Arms */}
      <rect x="12" y="50" width="14" height="8" rx="4" fill="#2563eb" />
      <rect x="94" y="50" width="14" height="8" rx="4" fill="#2563eb" />
      <circle cx="12" cy="54" r="5" fill="#3b82f6" />
      <circle cx="108" cy="54" r="5" fill="#3b82f6" />

      {/* Legs */}
      <rect x="40" y="92" width="14" height="16" rx="5" fill="#2563eb" />
      <rect x="66" y="92" width="14" height="16" rx="5" fill="#2563eb" />
      <rect x="37" y="104" width="20" height="8" rx="4" fill="#1e40af" />
      <rect x="63" y="104" width="20" height="8" rx="4" fill="#1e40af" />

      {/* Chest buttons */}
      <circle cx="46" cy="64" r="2.5" fill="#fbbf24" />
      <circle cx="74" cy="64" r="2.5" fill="#ef4444" />
    </svg>
  );
}

export function RobotAvatarSmall({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="40" width="70" height="55" rx="16" fill="#2563eb" />
      <rect x="30" y="45" width="60" height="45" rx="12" fill="#3b82f6" />
      <rect x="30" y="18" width="60" height="32" rx="12" fill="#2563eb" />
      <rect x="35" y="22" width="50" height="24" rx="8" fill="#1e40af" />
      <circle cx="48" cy="34" r="7" fill="#bfdbfe" />
      <circle cx="72" cy="34" r="7" fill="#bfdbfe" />
      <circle cx="49" cy="33" r="3" fill="#1e3a8a" />
      <circle cx="73" cy="33" r="3" fill="#1e3a8a" />
      <line x1="60" y1="18" x2="60" y2="8" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="6" r="4" fill="#60a5fa" />
      <path d="M48 42 Q60 50 72 42" stroke="#bfdbfe" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}
