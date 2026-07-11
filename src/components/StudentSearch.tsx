import { useState } from 'react';
import { findStudent, StudentUser } from '../lib/api';
import { BADGE_DEFS } from '../lib/badges';
import AvatarIcon, { AvatarId } from './AvatarIcon';

export default function StudentSearch() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<StudentUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const { user } = await findStudent(query);
      setResult(user);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Öğrenci bulunamadı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-3 pt-3 pb-2 border-b border-gray-100">
      <div className="relative">
        <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" value={query} onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && search()}
          placeholder="Öğrenci Ara (ID: KL-XXXXXX)"
          className="w-full pl-8 pr-2 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[11px] text-gray-500 placeholder:text-gray-300
                     focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white transition-all" />
      </div>

      {loading && <p className="text-[10px] text-gray-400 mt-1.5 px-1">Aranıyor…</p>}
      {error && <p className="text-[10px] text-red-500 mt-1.5 px-1">{error}</p>}

      {result && (
        <div className="mt-2 bg-white border border-gray-100 rounded-xl p-3 shadow-sm animate-fadeUp relative">
          <button onClick={() => setResult(null)} className="absolute top-1.5 right-1.5 text-gray-300 hover:text-gray-500 text-xs p-1">✕</button>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-11 h-11 rounded-xl overflow-hidden bg-blue-50 shrink-0 border border-blue-100">
              {result.avatar ? <AvatarIcon id={result.avatar as AvatarId} size={44} /> : (
                <div className="w-full h-full flex items-center justify-center text-blue-300 text-sm">?</div>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-gray-800 truncate">{result.username ? `@${result.username}` : result.fullName}</p>
              <p className="text-[9px] text-gray-400 font-mono">{result.id}</p>
            </div>
          </div>
          {result.bio && <p className="text-[10px] text-gray-500 mb-2 leading-relaxed">{result.bio}</p>}
          <div className="flex gap-1.5">
            {BADGE_DEFS.filter(b => result.achievements?.includes(b.id)).map(b => (
              <span key={b.id} title={b.label} className="text-sm">{b.icon}</span>
            ))}
            {(!result.achievements || result.achievements.length === 0) && (
              <span className="text-[9px] text-gray-300">Henüz rozet kazanılmamış</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
