export const AVATAR_IDS = [
  'girl-1', 'girl-2', 'girl-3', 'girl-4', 'girl-5',
  'boy-1', 'boy-2', 'boy-3', 'boy-4', 'boy-5',
] as const;

export type AvatarId = typeof AVATAR_IDS[number];

const SKIN = ['#fcd9b6', '#f1b98a', '#e2a878', '#c68863', '#8d5524'];
const HAIR_GIRL = ['#3b2314', '#6b3f1d', '#1c1c1c', '#a35c2a', '#4a2a12'];
const HAIR_BOY = ['#1c1c1c', '#3b2314', '#6b3f1d', '#2b2b2b', '#4a2a12'];
const TOPS = ['#2563eb', '#059669', '#dc2626', '#7c3aed', '#ea580c'];

export default function AvatarIcon({ id, size = 48 }: { id: AvatarId | string; size?: number }) {
  const isGirl = id.startsWith('girl');
  const idx = Math.max(0, parseInt(id.split('-')[1] || '1', 10) - 1);
  const skin = SKIN[idx % SKIN.length];
  const hair = (isGirl ? HAIR_GIRL : HAIR_BOY)[idx % 5];
  const top = TOPS[idx % TOPS.length];

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#eef2ff" />
      {/* shoulders/top */}
      <path d="M15 100 Q50 68 85 100 Z" fill={top} />
      {/* neck */}
      <rect x="42" y="55" width="16" height="14" fill={skin} />
      {/* face */}
      <circle cx="50" cy="42" r="24" fill={skin} />
      {/* hair */}
      {isGirl ? (
        <path d="M26 42 Q24 14 50 14 Q76 14 74 42 Q74 30 62 26 Q58 34 50 32 Q42 34 38 26 Q26 30 26 44
                  L28 68 Q20 56 22 42 Z M74 44 L72 70 Q80 56 78 42 Z" fill={hair} />
      ) : (
        <path d="M26 40 Q24 15 50 15 Q76 15 74 40 Q74 26 50 24 Q26 26 26 40 Z" fill={hair} />
      )}
      {/* eyes */}
      <circle cx="41" cy="43" r="2.6" fill="#2b2b2b" />
      <circle cx="59" cy="43" r="2.6" fill="#2b2b2b" />
      {/* smile */}
      <path d="M40 52 Q50 59 60 52" stroke="#8a4a2b" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* blush */}
      <circle cx="34" cy="49" r="3" fill="#f4a3a3" opacity="0.5" />
      <circle cx="66" cy="49" r="3" fill="#f4a3a3" opacity="0.5" />
      {isGirl && <>
        <circle cx="24" cy="44" r="3" fill={hair} />
        <circle cx="76" cy="44" r="3" fill={hair} />
      </>}
    </svg>
  );
}
