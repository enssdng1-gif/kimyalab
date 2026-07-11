/**
 * Bir konu + oyun türü için soru havuzundan, öğrencinin daha önce
 * GÖRMEDİĞİ sorulardan oluşan bir oturum (en fazla `size` adet) üretir.
 * Havuzdaki tüm sorular bir kez gösterilene kadar hiçbir soru tekrar
 * sorulmaz. Havuz tükenince otomatik olarak sıfırlanıp yeni bir tur başlar.
 */
export function buildSession<T>(pool: T[], storageKey: string, size = 10): T[] {
  if (pool.length === 0) return [];

  let seen: number[] = [];
  try { seen = JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { seen = []; }

  let available = pool.map((_, i) => i).filter(i => !seen.includes(i));
  const need = Math.min(size, pool.length);

  if (available.length < need) {
    // Havuz tükendi → yeni tur, baştan tüm sorular tekrar uygun hale gelir.
    available = pool.map((_, i) => i);
    seen = [];
  }

  // Fisher–Yates ile karıştır
  const shuffled = [...available];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const chosen = shuffled.slice(0, need);
  const union = Array.from(new Set([...seen, ...chosen]));
  try { localStorage.setItem(storageKey, JSON.stringify(union)); } catch { /* ignore */ }

  return chosen.map(i => pool[i]);
}
