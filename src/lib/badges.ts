// Backend'deki BADGE_DEFS ile birebir aynı tutulmalı.
export const BADGE_DEFS = [
  { id: 'badge-10dk', type: 'madalya', label: '10 Dakika Aktif', thresholdSec: 10 * 60, icon: '🥉' },
  { id: 'trophy-1saat', type: 'kupa', label: '1 Saat Aktif', thresholdSec: 60 * 60, icon: '🏆' },
] as const;
