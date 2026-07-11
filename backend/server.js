// KimyaLab Backend — kayıt, profil, rozet/kupa sistemi
// Render'da "Web Service" olarak deploy edilir. Veriler DATA_DIR altındaki
// JSON dosyalarında tutulur (kullanicilar/kullanicilar.json).
//
// ÖNEMLİ: Render'ın ÜCRETSİZ planında disk KALICI DEĞİLDİR — servis yeniden
// başladığında (deploy, uyku modundan uyanma vb.) dosya sistemi sıfırlanır.
// Verilerin gerçekten kaybolmaması için Render'da bir "Persistent Disk"
// eklemeniz gerekir (Settings → Disks → Add Disk, mount path'i DATA_DIR ile
// aynı yapın, örn. /data). Bu server o diski bulunca otomatik kullanır.

import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

const app = express();
app.use(cors());
app.use(express.json());

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'kullanicilar');
const USERS_FILE = path.join(DATA_DIR, 'kullanicilar.json');

// ── Basit yazma kilidi: aynı anda iki kayıt aynı dosyaya yazıp birbirini
// ezmesin diye tüm dosya işlemleri tek bir kuyruktan sırayla geçer. ──
let writeQueue = Promise.resolve();
function withLock(fn) {
  const result = writeQueue.then(fn, fn);
  writeQueue = result.then(() => {}, () => {});
  return result;
}

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(USERS_FILE);
  } catch {
    await atomicWrite(USERS_FILE, []);
  }
}

// Atomik yazma: önce geçici dosyaya yaz, sonra rename et. Yazma sırasında
// sunucu çökerse bile kullanicilar.json ASLA yarım/bozuk kalmaz.
async function atomicWrite(file, data) {
  const tmp = file + '.tmp-' + crypto.randomBytes(4).toString('hex');
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), 'utf-8');
  await fs.rename(tmp, file);
  // Ayrıca her yazımda bir yedek bırak (son 1 kopya) — dosya bir şekilde
  // bozulursa geri dönülebilsin.
  await fs.writeFile(file + '.backup', JSON.stringify(data, null, 2), 'utf-8').catch(() => {});
}

async function readUsers() {
  await ensureStore();
  try {
    const raw = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    // Ana dosya bozulmuşsa yedekten oku
    try {
      const raw = await fs.readFile(USERS_FILE + '.backup', 'utf-8');
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
}

function genId() {
  // Öğrenciler arasında paylaşılabilecek kısa, benzersiz ID: KL-XXXXXX
  return 'KL-' + crypto.randomBytes(4).toString('hex').toUpperCase().slice(0, 6);
}

const AVATARS = [
  'girl-1', 'girl-2', 'girl-3', 'girl-4', 'girl-5',
  'boy-1', 'boy-2', 'boy-3', 'boy-4', 'boy-5',
];

const BADGE_DEFS = [
  { id: 'badge-10dk', type: 'madalya', label: '10 Dakika Aktif', thresholdSec: 10 * 60, icon: '🥉' },
  { id: 'trophy-1saat', type: 'kupa', label: '1 Saat Aktif', thresholdSec: 60 * 60, icon: '🏆' },
];

// ── Kayıt ──
app.post('/api/register', async (req, res) => {
  try {
    const { firstName, lastName, grade } = req.body || {};
    if (!firstName || !firstName.trim() || !lastName || !lastName.trim()) {
      return res.status(400).json({ error: 'İsim ve soyisim zorunludur.' });
    }

    const result = await withLock(async () => {
      const users = await readUsers();
      const fullName = `${firstName.trim()} ${lastName.trim()}`;

      let id;
      do { id = genId(); } while (users.some(u => u.id === id));

      const newUser = {
        id,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        fullName,
        grade: grade || null,
        username: null,        // sonradan kullanıcı belirler
        avatar: null,          // sonradan kullanıcı seçer (girl-1..5 / boy-1..5)
        bio: '',
        registeredAt: new Date().toISOString(),
        totalActiveSeconds: 0,
        achievements: [],      // kazanılan rozet/kupa id'leri
      };
      users.push(newUser);
      await atomicWrite(USERS_FILE, users);
      return newUser;
    });

    res.json({ ok: true, user: result });
  } catch (err) {
    console.error('register error', err);
    res.status(500).json({ error: 'Kayıt sırasında bir hata oluştu.' });
  }
});

// ── Profil güncelleme (kullanıcı adı / avatar / biyografi) ──
// NOT: firstName/lastName burada asla değiştirilemez.
app.post('/api/profile/:id/update', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, avatar, bio } = req.body || {};
    if (avatar && !AVATARS.includes(avatar)) {
      return res.status(400).json({ error: 'Geçersiz avatar.' });
    }

    const result = await withLock(async () => {
      const users = await readUsers();
      const idx = users.findIndex(u => u.id === id);
      if (idx === -1) return null;

      if (username !== undefined) {
        const taken = users.some(u => u.id !== id && u.username && u.username.toLowerCase() === String(username).toLowerCase());
        if (taken) throw new Error('USERNAME_TAKEN');
        users[idx].username = String(username).trim().slice(0, 24);
      }
      if (avatar !== undefined) users[idx].avatar = avatar;
      if (bio !== undefined) users[idx].bio = String(bio).slice(0, 280);

      await atomicWrite(USERS_FILE, users);
      return users[idx];
    });

    if (!result) return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    res.json({ ok: true, user: result });
  } catch (err) {
    if (err.message === 'USERNAME_TAKEN') {
      return res.status(409).json({ error: 'Bu kullanıcı adı zaten alınmış.' });
    }
    console.error('profile update error', err);
    res.status(500).json({ error: 'Güncelleme sırasında bir hata oluştu.' });
  }
});

// ── Aktif süre ekle + rozet/kupa kontrolü ──
app.post('/api/profile/:id/activity', async (req, res) => {
  try {
    const { id } = req.params;
    const { deltaSeconds } = req.body || {};
    const delta = Math.max(0, Math.min(300, Number(deltaSeconds) || 0)); // tek istekte en fazla 5 dk say

    const result = await withLock(async () => {
      const users = await readUsers();
      const idx = users.findIndex(u => u.id === id);
      if (idx === -1) return null;

      users[idx].totalActiveSeconds = (users[idx].totalActiveSeconds || 0) + delta;
      const newlyEarned = [];
      for (const b of BADGE_DEFS) {
        if (users[idx].totalActiveSeconds >= b.thresholdSec && !users[idx].achievements.includes(b.id)) {
          users[idx].achievements.push(b.id);
          newlyEarned.push(b);
        }
      }
      await atomicWrite(USERS_FILE, users);
      return { user: users[idx], newlyEarned };
    });

    if (!result) return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    res.json({ ok: true, ...result });
  } catch (err) {
    console.error('activity error', err);
    res.status(500).json({ error: 'Süre güncellenirken hata oluştu.' });
  }
});

// ── ID ile öğrenci arama / profil görüntüleme ──
app.get('/api/students/:id', async (req, res) => {
  const users = await readUsers();
  const user = users.find(u => u.id === req.params.id.toUpperCase());
  if (!user) return res.status(404).json({ error: 'Bu ID ile kayıtlı öğrenci bulunamadı.' });
  res.json({ ok: true, user });
});

app.get('/api/badges', (_req, res) => res.json(BADGE_DEFS));
app.get('/api/avatars', (_req, res) => res.json(AVATARS));

app.get('/api/health', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`KimyaLab backend ${PORT} portunda çalışıyor. DATA_DIR=${DATA_DIR}`));
