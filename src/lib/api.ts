// Backend adresi. Render'a deploy ettikten sonra kendi servis adresinizi
// buraya (veya .env.production içinde VITE_API_URL olarak) girin.
// Örn: https://kimyalab-backend.onrender.com
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface StudentUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  grade: number | null;
  username: string | null;
  avatar: string | null;
  bio: string;
  registeredAt: string;
  totalActiveSeconds: number;
  achievements: string[];
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Sunucu hatası');
  return data;
}

export function registerUser(firstName: string, lastName: string, grade?: number) {
  return request<{ ok: true; user: StudentUser }>('/api/register', {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, grade }),
  });
}

export function updateProfile(id: string, fields: { username?: string; avatar?: string; bio?: string }) {
  return request<{ ok: true; user: StudentUser }>(`/api/profile/${id}/update`, {
    method: 'POST',
    body: JSON.stringify(fields),
  });
}

export function reportActivity(id: string, deltaSeconds: number) {
  return request<{ ok: true; user: StudentUser; newlyEarned: { id: string; label: string; icon: string }[] }>(
    `/api/profile/${id}/activity`,
    { method: 'POST', body: JSON.stringify({ deltaSeconds }) }
  );
}

export function findStudent(id: string) {
  return request<{ ok: true; user: StudentUser }>(`/api/students/${id.trim().toUpperCase()}`);
}

// ── Kayıt kuyruğu: internet/backend anlık ulaşılamazsa kayıt verisi
// tarayıcıda bekletilir ve bağlantı gelince otomatik gönderilir. Böylece
// "asla veri kaybı olmasın" gereksinimi karşılanır. ──
const PENDING_KEY = 'kimyalab-pending-registrations';

interface PendingReg { firstName: string; lastName: string; grade?: number; queuedAt: string; }

function getPendingQueue(): PendingReg[] {
  try { return JSON.parse(localStorage.getItem(PENDING_KEY) || '[]'); } catch { return []; }
}
function setPendingQueue(q: PendingReg[]) { localStorage.setItem(PENDING_KEY, JSON.stringify(q)); }

export function queueRegistration(firstName: string, lastName: string, grade?: number) {
  const q = getPendingQueue();
  q.push({ firstName, lastName, grade, queuedAt: new Date().toISOString() });
  setPendingQueue(q);
}

/** Bekleyen kayıtları arka planda tekrar göndermeyi dener. Uygulama her açıldığında çağrılır. */
export async function flushPendingRegistrations() {
  const q = getPendingQueue();
  if (q.length === 0) return;
  const remaining: PendingReg[] = [];
  for (const p of q) {
    try {
      const { user } = await registerUser(p.firstName, p.lastName, p.grade);
      saveLocalUser(user);
    } catch {
      remaining.push(p);
    }
  }
  setPendingQueue(remaining);
}

const LS_KEY = 'kimyalab-user';
export function saveLocalUser(u: StudentUser) { localStorage.setItem(LS_KEY, JSON.stringify(u)); }
export function loadLocalUser(): StudentUser | null {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || 'null'); } catch { return null; }
}
export function clearLocalUser() { localStorage.removeItem(LS_KEY); }
