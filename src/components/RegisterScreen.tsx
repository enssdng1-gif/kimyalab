import { useState } from 'react';
import { registerUser, queueRegistration, saveLocalUser, StudentUser } from '../lib/api';

interface RegisterScreenProps {
  onDone: (user: StudentUser) => void;
}

export default function RegisterScreen({ onDone }: RegisterScreenProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [queuedNotice, setQueuedNotice] = useState(false);

  const canSubmit = firstName.trim().length >= 2 && lastName.trim().length >= 2 && !loading;

  const handleRegister = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const { user } = await registerUser(firstName.trim(), lastName.trim());
      saveLocalUser(user);
      onDone(user);
    } catch {
      // Sunucuya şu an ulaşılamadı — veri kaybolmasın diye kaydı kuyruğa
      // alıyoruz ve kullanıcının kimya çalışmasına hemen izin veriyoruz.
      // Kuyruk, bağlantı geldiğinde arka planda otomatik gönderilir.
      queueRegistration(firstName.trim(), lastName.trim());
      const tempUser: StudentUser = {
        id: 'BEKLEMEDE',
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        fullName: `${firstName.trim()} ${lastName.trim()}`,
        grade: null,
        username: null,
        avatar: null,
        bio: '',
        registeredAt: new Date().toISOString(),
        totalActiveSeconds: 0,
        achievements: [],
      };
      saveLocalUser(tempUser);
      setQueuedNotice(true);
      setTimeout(() => onDone(tempUser), 1400);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6"
      style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <div className="mb-6 sm:mb-8 text-center animate-fadeUp">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
          <svg viewBox="0 0 64 64" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
            <circle cx="32" cy="20" r="12" stroke="#2563eb" strokeWidth="3" fill="none" />
            <circle cx="32" cy="20" r="4" fill="#2563eb" opacity="0.8" />
            <path d="M20 32 L16 56 L32 48 L48 56 L44 32" stroke="#2563eb" strokeWidth="3" fill="none" strokeLinejoin="round" />
          </svg>
          <h1 className="text-3xl sm:text-4xl font-bold">
            <span className="text-gray-800">Kimya</span><span className="text-blue-600">Lab</span>
          </h1>
        </div>
        <p className="text-gray-500 text-sm sm:text-lg">Başlamadan önce seni tanıyalım</p>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-100 max-w-sm w-full animate-fadeUp">
        {queuedNotice ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">📶</div>
            <p className="text-gray-700 font-medium text-sm mb-1">Bağlantı kurulamadı ama merak etme!</p>
            <p className="text-gray-500 text-xs">Kaydın cihazında güvende, bağlantı gelince otomatik tamamlanacak. Devam ediyoruz…</p>
          </div>
        ) : (
          <>
            <label className="block mb-4">
              <span className="text-xs font-medium text-gray-500 mb-1.5 block">İsim</span>
              <input
                type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                placeholder="Adınız" autoFocus
                className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
              />
            </label>
            <label className="block mb-5">
              <span className="text-xs font-medium text-gray-500 mb-1.5 block">Soyisim</span>
              <input
                type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRegister()}
                placeholder="Soyadınız"
                className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
              />
            </label>

            {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

            <button
              onClick={handleRegister}
              disabled={!canSubmit}
              className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700
                         disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all shadow-sm"
            >
              {loading ? 'Kaydediliyor…' : 'Kayıt Ol'}
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-3">
              İsim ve soyisim daha sonra değiştirilemez, ama profilinde ayrı bir kullanıcı adı oluşturabilirsin.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
