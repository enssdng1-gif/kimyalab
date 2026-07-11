import { useState, useEffect, useRef } from 'react';
import { grade9Data, grade10Data, grade11Data, GradeData, Topic, GameType, gameTypeLabels } from '../data/curriculum';
import PeriodicTable from './PeriodicTable';
import FormulaTable from './FormulaTable';
import NotesPage from './NotesPage';
import ProfileScreen from './ProfileScreen';
import StudentSearch from './StudentSearch';
import GamePlayer from './GamePlayer';
import ChatScreen, { FloatingRobot } from './ChatScreen';
import { StudentUser, reportActivity } from '../lib/api';

interface DashboardProps {
  grade: number;
  user: StudentUser;
  onUserChange: (u: StudentUser) => void;
  onBack: () => void;
}

type Page = 'home' | 'periodic' | 'notes' | 'formulas' | 'curriculum' | 'references' | 'download' | 'profile';

interface GameState {
  topic: Topic;
  gameType: GameType;
}

const DESKTOP_BREAKPOINT = 768; // md: bilgisayar/tablet yatay için otomatik açık menü eşiği
const ACTIVITY_TICK_MS = 60000; // her 60 saniyede bir aktif süreyi sunucuya bildir

export default function Dashboard({ grade, user, onUserChange, onBack }: DashboardProps) {
  const [page, setPage] = useState<Page>('home');
  // Büyük ekran (bilgisayar) → menü baştan açık. Küçük ekran (telefon) → kapalı, hamburger ile açılır.
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= DESKTOP_BREAKPOINT : true
  );
  const [activeGame, setActiveGame] = useState<GameState | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [expandedSubUnits, setExpandedSubUnits] = useState<Set<string>>(new Set());
  const [badgeToast, setBadgeToast] = useState<string | null>(null);
  const userRef = useRef(user);
  userRef.current = user;

  const data: GradeData = grade === 9 ? grade9Data : grade === 10 ? grade10Data : grade11Data;

  useEffect(() => {
    const onResize = () => setSidebarOpen(window.innerWidth >= DESKTOP_BREAKPOINT);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < DESKTOP_BREAKPOINT) setSidebarOpen(false);
  }, [page, activeGame, selectedTopic]);

  // Site üzerinde geçirilen süreyi periyodik olarak backend'e bildir; süre
  // eşiklerine ulaşınca (10dk madalya, 1 saat kupa) rozet kazandırır.
  useEffect(() => {
    if (userRef.current.id === 'BEKLEMEDE') return;
    const interval = setInterval(async () => {
      try {
        const { user: updated, newlyEarned } = await reportActivity(userRef.current.id, ACTIVITY_TICK_MS / 1000);
        onUserChange(updated);
        if (newlyEarned.length > 0) {
          setBadgeToast(`${newlyEarned[0].icon} Yeni başarı kazandın: ${newlyEarned[0].label}!`);
          setTimeout(() => setBadgeToast(null), 4000);
        }
      } catch { /* bağlantı yoksa sessizce dene, veri kaybı olmaz — süre bir sonraki tikte birikir */ }
    }, ACTIVITY_TICK_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (set: Set<string>, id: string, setter: (s: Set<string>) => void) => {
    const n = new Set(set);
    if (n.has(id)) n.delete(id); else n.add(id);
    setter(n);
  };

  const getAvailableTypes = (topic: Topic): GameType[] => {
    const types: GameType[] = [];
    if (topic.quizQuestions.length > 0) types.push('quiz');
    if (topic.tfQuestions.length > 0) types.push('truefalse');
    if (topic.matchQuestions.length > 0) types.push('matching');
    if (topic.fillQuestions.length > 0) types.push('fillblank');
    if (topic.sortQuestions.length > 0) types.push('sorting');
    if (topic.flashQuestions.length > 0) types.push('flashcard');
    return types;
  };

  /* ── Topic clicked → show game type picker (sade kare kutucuklar) ────────── */
  if (selectedTopic && !activeGame) {
    const available = getAvailableTypes(selectedTopic);
    return (
      <div className="min-h-screen bg-gray-50">
        <Header grade={grade} onBack={onBack} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="pt-16 p-3 sm:p-4 max-w-4xl mx-auto">
          <button onClick={() => setSelectedTopic(null)}
            className="flex items-center gap-1.5 text-blue-600 text-sm mb-4 active:scale-95 transition-transform">
            ← Konulara Dön
          </button>

          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-4 animate-fadeUp">
            <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-1">📖 {selectedTopic.title}</h2>
            <p className="text-xs sm:text-sm text-gray-500">Oynamak istediğiniz oyun türünü seçin — her tür 10 soruluk bir oturum başlatır.</p>
          </div>

          {available.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-4xl mb-3">📝</p>
              <p>Bu konu için henüz soru eklenmemiştir.</p>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {available.map((type, i) => {
              const info = gameTypeLabels[type];
              return (
                <button key={type}
                  onClick={() => setActiveGame({ topic: selectedTopic, gameType: type })}
                  className="aspect-square rounded-2xl border border-gray-200 bg-white flex flex-col items-center justify-center gap-2
                             hover:border-blue-400 hover:bg-blue-50 hover:shadow-md
                             active:scale-95 transition-all duration-200 group animate-fadeUp p-3"
                  style={{ animationDelay: `${i * 40}ms` }}>
                  <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-200">{info.icon}</span>
                  <span className="text-xs sm:text-sm font-bold text-gray-600 group-hover:text-blue-600 text-center leading-tight">{info.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ── Active game ────────── */
  if (activeGame) {
    const available = getAvailableTypes(activeGame.topic);
    const typeIdx = available.indexOf(activeGame.gameType);

    const goNext = () => {
      if (typeIdx + 1 < available.length) {
        setActiveGame({ topic: activeGame.topic, gameType: available[typeIdx + 1] });
      } else {
        setActiveGame(null); // tür kalmadı → seçim ekranına dön
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <Header grade={grade} onBack={onBack} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="pt-16">
          <GamePlayer
            topic={activeGame.topic}
            gameType={activeGame.gameType}
            userId={user.id}
            onBack={() => { setActiveGame(null); setSelectedTopic(null); setPage('curriculum'); }}
            onSelectType={() => setActiveGame(null)}
            onNextGame={goNext}
          />
        </div>
        {/* Oyun içinde sağ altta AI asistanı — istediği an sohbet edilebilir */}
        <FloatingRobot grade={grade} />
      </div>
    );
  }

  /* ── Normal pages ────────── */
  return (
    <div className="min-h-screen bg-gray-50">
      <Header grade={grade} onBack={onBack} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {badgeToast && (
        <div className="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-full shadow-lg animate-fadeUp">
          {badgeToast}
        </div>
      )}

      <div className="flex pt-16">
        {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />}
        <aside className={`fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 z-30 overflow-y-auto ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
          {/* Üst arama çubuğu — başkasının ID'siyle profiline bakmak için */}
          <StudentSearch />
          <nav className="p-4 space-y-1">
            <SidebarItem icon="💬" label="AI Asistan" active={page === 'home'} onClick={() => { setPage('home'); setSidebarOpen(false); }} />
            <SidebarItem icon="⚛️" label="Periyodik Tablo" active={page === 'periodic'} onClick={() => { setPage('periodic'); setSidebarOpen(false); }} />
            <SidebarItem icon="📝" label="Ders Notları" active={page === 'notes'} onClick={() => { setPage('notes'); setSidebarOpen(false); }} />
            <SidebarItem icon="📐" label="Formüller" active={page === 'formulas'} onClick={() => { setPage('formulas'); setSidebarOpen(false); }} />
            {data.referenceTables && data.referenceTables.length > 0 && (
              <SidebarItem icon="📋" label="Referans Tabloları" active={page === 'references'} onClick={() => { setPage('references'); setSidebarOpen(false); }} />
            )}
            <SidebarItem icon="📚" label="Ders Konuları" active={page === 'curriculum'} onClick={() => { setPage('curriculum'); setSidebarOpen(false); }} />
            <SidebarItem icon="⬇️" label="İndir" active={page === 'download'} onClick={() => { setPage('download'); setSidebarOpen(false); }} />

            {/* Oyunlar/derslerin altında ayrı bir bölüm: Profil */}
            <div className="pt-3 mt-3 border-t border-gray-100">
              <SidebarItem icon="👤" label="Profilim" active={page === 'profile'} onClick={() => { setPage('profile'); setSidebarOpen(false); }} />
            </div>

            <div className="pt-4 border-t border-gray-100 mt-4">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2 px-3">Üniteler</p>
              {data.units.map(unit => (
                <button key={unit.id} onClick={() => { setPage('curriculum'); toggle(expandedUnits, unit.id, setExpandedUnits); setSidebarOpen(false); }}
                  className="w-full text-left px-3 py-2 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all truncate active:scale-95">
                  {unit.title}
                </button>
              ))}
            </div>
          </nav>
        </aside>
        <main className="flex-1 w-full">
          {page === 'home' && <ChatScreen grade={grade} />}
          {page !== 'home' && (
            <div className="max-w-6xl mx-auto p-3 sm:p-6">
              {page === 'periodic' && <PeriodicTable />}
              {page === 'notes' && <NotesPage data={data} />}
              {page === 'formulas' && <FormulaTable formulas={data.formulas} />}
              {page === 'references' && data.referenceTables && <ReferencePage tables={data.referenceTables} />}
              {page === 'curriculum' && (
                <CurriculumPage data={data}
                  expandedUnits={expandedUnits} expandedSubUnits={expandedSubUnits}
                  toggleUnit={(id) => toggle(expandedUnits, id, setExpandedUnits)}
                  toggleSubUnit={(id) => toggle(expandedSubUnits, id, setExpandedSubUnits)}
                  onTopicClick={(t) => setSelectedTopic(t)} />
              )}
              {page === 'download' && <DownloadPage />}
              {page === 'profile' && <ProfileScreen user={user} onUserChange={onUserChange} />}
            </div>
          )}
         </main>
      </div>
      {/* Floating robot on non-chat pages */}
      {page !== 'home' && <FloatingRobot grade={grade} />}
    </div>
  );
}

/* ═══════════ Header ═══════════ */
function Header({ grade, onBack, sidebarOpen, setSidebarOpen }: {
  grade: number; onBack: () => void; sidebarOpen: boolean; setSidebarOpen: (v: boolean) => void;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 sm:h-16 bg-white border-b border-gray-200 flex items-center px-3 sm:px-4 z-40">
      <button onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg mr-1 sm:mr-2 text-gray-500 active:scale-90 transition-transform">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <svg viewBox="0 0 64 64" className="w-7 h-7 sm:w-8 sm:h-8" fill="none">
          <circle cx="32" cy="20" r="12" stroke="#2563eb" strokeWidth="3" fill="none" />
          <circle cx="32" cy="20" r="4" fill="#2563eb" opacity="0.8" />
          <path d="M20 32 L16 56 L32 48 L48 56 L44 32" stroke="#2563eb" strokeWidth="3" fill="none" strokeLinejoin="round" />
        </svg>
        <span className="text-lg sm:text-xl font-bold"><span className="text-gray-800">Kimya</span><span className="text-blue-600">Lab</span></span>
      </div>
      <div className="ml-2 sm:ml-4 px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-medium">{grade}. Sınıf</div>
      <div className="ml-auto">
        <button onClick={onBack}
          className="text-xs sm:text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1 active:scale-95 transition-transform">
          <span className="hidden sm:inline">← Sınıf Değiştir</span>
          <span className="sm:hidden">↩</span>
        </button>
      </div>
    </header>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all active:scale-95
        ${active ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'}`}>
      <span className="text-lg">{icon}</span>{label}
    </button>
  );
}

/* ═══════════ Home ═══════════ */
/* HomePage removed – replaced by ChatScreen */

/* ═══════════ References ═══════════ */
function ReferencePage({ tables }: { tables: NonNullable<GradeData['referenceTables']> }) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">📋 Referans Tabloları</h2>
      <p className="text-gray-500 text-sm mb-6">Ezberlenmesi gereken tablolar ve bilgiler.</p>
      <div className="space-y-6">
        {tables.map(t => (
          <div key={t.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fadeUp">
            <div className="p-4 border-b border-gray-100 flex items-center gap-2">
              <span className="text-xl">{t.icon}</span>
              <h3 className="font-bold text-gray-800">{t.title}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50">{t.headers.map((h, i) => <th key={i} className="text-left px-4 py-2 text-xs font-medium text-gray-500">{h}</th>)}</tr></thead>
                <tbody>{t.rows.map((row, ri) => <tr key={ri} className="border-t border-gray-50 hover:bg-blue-50/30 transition-colors">{row.map((cell, ci) => <td key={ci} className="px-4 py-2 text-xs text-gray-700">{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════ Curriculum ═══════════ */
function CurriculumPage({ data, expandedUnits, expandedSubUnits, toggleUnit, toggleSubUnit, onTopicClick }: {
  data: GradeData; expandedUnits: Set<string>; expandedSubUnits: Set<string>;
  toggleUnit: (id: string) => void; toggleSubUnit: (id: string) => void;
  onTopicClick: (t: Topic) => void;
}) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">📚 Ders Konuları ve Oyunlar</h2>
      <p className="text-gray-500 text-xs sm:text-sm mb-6">Konuya tıklayarak oyunlara ulaşabilirsiniz.</p>
      <div className="space-y-3">
        {data.units.map((unit, ui) => (
          <div key={unit.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fadeUp"
            style={{ animationDelay: `${ui * 50}ms` }}>
            <button onClick={() => toggleUnit(unit.id)}
              className="w-full flex items-center gap-2 sm:gap-3 p-3 sm:p-5 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <span className="text-xl sm:text-2xl">{['🔬','🧪','⚗️','🧬','💎','🌡️','🔥'][ui % 7]}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 text-sm sm:text-base truncate">{unit.title}</h3>
                <p className="text-[10px] sm:text-xs text-gray-400">{unit.subUnits.reduce((a, s) => a + s.topics.length, 0)} konu</p>
              </div>
              <Chevron open={expandedUnits.has(unit.id)} />
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${expandedUnits.has(unit.id) ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-3 sm:px-5 pb-3 sm:pb-4 space-y-2">
                {unit.subUnits.map(sub => (
                  <div key={sub.id} className="border border-gray-100 rounded-lg overflow-hidden">
                    <button onClick={() => toggleSubUnit(sub.id)}
                      className="w-full flex items-center gap-2 p-2.5 sm:p-3 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors">
                      <span className="text-sm">📁</span>
                      <span className="flex-1 text-xs sm:text-sm font-medium text-gray-700 truncate">{sub.title}</span>
                      <span className="text-[10px] sm:text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{sub.topics.length}</span>
                      <Chevron open={expandedSubUnits.has(sub.id)} small />
                    </button>

                    <div className={`overflow-hidden transition-all duration-300 ${expandedSubUnits.has(sub.id) ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-2 sm:px-3 pb-2 sm:pb-3 space-y-1.5">
                        {sub.topics.map((topic, ti) => (
                          <button key={topic.id}
                            onClick={() => onTopicClick(topic)}
                            className="w-full flex items-center gap-2 p-2.5 sm:p-3 rounded-lg bg-gray-50/80 border border-gray-100
                                       hover:bg-blue-50 hover:border-blue-200 hover:shadow-sm
                                       active:scale-[0.98] transition-all duration-150 text-left group"
                            style={{ animationDelay: `${ti * 30}ms` }}>
                            <span className="text-base group-hover:scale-110 transition-transform duration-200">📖</span>
                            <span className="flex-1 text-xs sm:text-sm text-gray-700 group-hover:text-blue-700 truncate transition-colors">{topic.title}</span>
                            <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════ Download ═══════════ */
function DownloadPage() {
  return (
    <div className="max-w-lg mx-auto py-10 sm:py-16 px-4 text-center animate-fadeUp">
      <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V9l-6-6z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v6h6" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12v6m0 0l-3-3m3 3l3-3" />
        </svg>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">Masaüstü Uygulaması</h2>
      <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
        KimyaLab'ı Windows bilgisayarına indir. İnternet bağlantısı olmadan da çalışır, tüm özellikler tek kurulumda gelir.
      </p>

      <a
        href="https://drive.google.com/uc?export=download&id=1kJGdeAC7-TiYB7klVswg9mc4I9JVC147"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-all duration-200 shadow-md hover:shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" />
        </svg>
        İndir — Windows (.exe)
      </a>

      <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Virüs taranmış
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
          </svg>
          Windows 10 / 11
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M6.343 6.343a9 9 0 000 12.728M9.172 9.172a5 5 0 000 7.071" />
          </svg>
          Çevrimdışı çalışır
        </div>
      </div>
    </div>
  );
}

function Chevron({ open, small }: { open: boolean; small?: boolean }) {
  return (
    <svg className={`${small ? 'w-3 h-3' : 'w-4 h-4 sm:w-5 sm:h-5'} text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
