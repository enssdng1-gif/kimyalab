import { useState } from 'react';
import { StudentUser, updateProfile, saveLocalUser } from '../lib/api';
import { BADGE_DEFS } from '../lib/badges';
import AvatarIcon, { AVATAR_IDS, AvatarId } from './AvatarIcon';

interface ProfileScreenProps {
  user: StudentUser;
  onUserChange: (u: StudentUser) => void;
}

export default function ProfileScreen({ user, onUserChange }: ProfileScreenProps) {
  const [username, setUsername] = useState(user.username || '');
  const [bio, setBio] = useState(user.bio || '');
  const [avatar, setAvatar] = useState<AvatarId | null>((user.avatar as AvatarId) || null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const save = async () => {
    setSaving(true);
    setMsg(null);
    try {
      const { user: updated } = await updateProfile(user.id, {
        username: username.trim() || undefined,
        avatar: avatar || undefined,
        bio,
      });
      saveLocalUser(updated);
      onUserChange(updated);
      setMsg({ type: 'ok', text: 'Profil kaydedildi! ✅' });
    } catch (e) {
      setMsg({ type: 'err', text: e instanceof Error ? e.message : 'Kaydedilemedi, tekrar deneyin.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(null), 3000);
    }
  };

  const copyId = () => {
    navigator.clipboard?.writeText(user.id).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const earned = new Set(user.achievements || []);
  const activeMinutes = Math.floor((user.totalActiveSeconds || 0) / 60);

  return (
    <div className="p-2 sm:p-4 max-w-3xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">👤 Profilim</h2>
      <p className="text-gray-500 text-xs sm:text-sm mb-6">Avatarını seç, kullanıcı adı belirle ve kazandığın rozetleri gör.</p>

      {/* Kimlik kartı */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-5 animate-fadeUp">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-blue-50 shrink-0 border border-blue-100">
            {avatar ? <AvatarIcon id={avatar} size={96} /> : (
              <div className="w-full h-full flex items-center justify-center text-3xl text-blue-300">?</div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-lg font-bold text-gray-800 truncate">{user.fullName}</p>
            <p className="text-xs text-gray-400 mb-1.5">İsim soyisim değiştirilemez.</p>
            <button onClick={copyId}
              className="inline-flex items-center gap-1.5 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-mono font-medium hover:bg-blue-100 active:scale-95 transition-all">
              🆔 {user.id} {copied ? '· kopyalandı!' : '· kopyala'}
            </button>
            <p className="text-[10px] text-gray-400 mt-1.5">Bu ID'yi arkadaşların arayarak profiline bakabilir.</p>
          </div>
        </div>
      </div>

      {/* Avatar seçimi */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-5 animate-fadeUp">
        <p className="text-sm font-bold text-gray-800 mb-3">Avatar Seç</p>
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {AVATAR_IDS.map(id => (
            <button key={id} onClick={() => setAvatar(id)}
              className={`aspect-square rounded-xl overflow-hidden border-2 transition-all active:scale-95
                ${avatar === id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-100 hover:border-blue-300'}`}>
              <AvatarIcon id={id} size={64} />
            </button>
          ))}
        </div>
      </div>

      {/* Kullanıcı adı + biyografi */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-5 animate-fadeUp space-y-4">
        <label className="block">
          <span className="text-xs font-medium text-gray-500 mb-1.5 block">Kullanıcı Adı</span>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)}
            placeholder="kullaniciadi" maxLength={24}
            className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all" />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-gray-500 mb-1.5 block">Biyografi</span>
          <textarea value={bio} onChange={e => setBio(e.target.value)} maxLength={280} rows={3}
            placeholder="Kendinden kısaca bahset..."
            className="w-full p-3 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all" />
          <span className="text-[10px] text-gray-400">{bio.length}/280</span>
        </label>

        {msg && <p className={`text-xs font-medium ${msg.type === 'ok' ? 'text-green-600' : 'text-red-500'}`}>{msg.text}</p>}

        <button onClick={save} disabled={saving}
          className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 active:scale-95 transition-all">
          {saving ? 'Kaydediliyor…' : 'Kaydet'}
        </button>
      </div>

      {/* Başarılar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 animate-fadeUp">
        <p className="text-sm font-bold text-gray-800 mb-1">🏅 Başarılar</p>
        <p className="text-xs text-gray-400 mb-4">Toplam aktif süre: {activeMinutes} dakika</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {BADGE_DEFS.map(b => {
            const got = earned.has(b.id);
            return (
              <div key={b.id}
                className={`rounded-xl p-3 text-center border transition-all ${got ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-100 opacity-50 grayscale'}`}>
                <div className="text-2xl mb-1">{b.icon}</div>
                <p className="text-[10px] font-medium text-gray-700 leading-tight">{b.label}</p>
                {!got && <p className="text-[9px] text-gray-400 mt-0.5">Kilitli</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
