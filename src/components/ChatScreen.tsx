import { useState, useRef, useEffect, useCallback } from 'react';
import RobotAvatar, { RobotAvatarSmall } from './RobotAvatar';
import FormattedMessage from './FormattedMessage';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

const GROQ_KEY = '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';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYS = `Sen KimyaLab platformunun yapay zeka kimya asistanısın. Adın "KimyaLab AI".
KURALLAR:
1. SADECE kimya ile ilgili sorulara cevap ver. Kimya dışı sorulara "Üzgünüm, ben sadece kimya konularında yardımcı olabilirim. 🧪" de.
2. Türkçe cevap ver. Lise seviyesinde açık ve öğretici yaz.
3. Formüller, denklemler, örnekler ver. Emoji kullan ama abartma.
4. Kısa ve öz cevaplar ver. Günlük hayattan örnekler ver.

BİÇİMLENDİRME (çok önemli, her cevapta uygula):
- Önemli terimleri, formülleri ve sonuçları **iki yıldız** arasına alarak kalınlaştır.
- Ezberlenmesi gereken kritik bir tanımı __iki alt çizgi__ arasına alarak altını çiz.
- Birden fazla madde/adım/örnek sıralarken her birini yeni satırda "- " ile başlat (madde işareti).
- Farklı fikirler/bölümler arasında BOŞ SATIR bırak (paragrafları ayır), tek bir metin bloğu halinde yazma.
- Kısa kimyasal formülleri \`ters tırnak\` içine al (örn. \`H2O\`).
Kimya kapsamı: atom, periyodik tablo, bağlar, moleküller, tepkimeler, stokiyometri, mol, gazlar, çözeltiler, asit-baz, termokimya, hız, denge, elektrokimya, organik, nükleer, çevre, biyokimya, formüller, deneyler.`;

function loadSessions(): ChatSession[] {
  try { return JSON.parse(localStorage.getItem('kimyalab-chats') || '[]'); } catch { return []; }
}
function saveSessions(s: ChatSession[]) { localStorage.setItem('kimyalab-chats', JSON.stringify(s)); }

async function askGroq(msgs: Message[], grade: number): Promise<string> {
  const apiMsgs = [
    { role: 'system', content: SYS + `\nKullanıcı ${grade}. sınıf.` },
    ...msgs.slice(-20).map(m => ({ role: m.role, content: m.content })),
  ];
  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${GROQ_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: apiMsgs, temperature: 0.7, max_tokens: 1024 }),
  });
  if (!res.ok) throw new Error(`${res.status}`);
  const d = await res.json();
  return d.choices?.[0]?.message?.content || 'Hata oluştu.';
}

/* ═══════════════════════════════════
   Main Chat Screen (home page)
   ═══════════════════════════════════ */
export default function ChatScreen({ grade }: { grade: number }) {
  const [sessions, setSessions] = useState<ChatSession[]>(loadSessions);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasMessages = messages.length > 0;

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  useEffect(() => {
    if (!activeId || messages.length === 0) return;
    setSessions(prev => { const u = prev.map(s => s.id === activeId ? { ...s, messages } : s); saveSessions(u); return u; });
  }, [messages, activeId]);

  const createNew = useCallback(() => { setActiveId(null); setMessages([]); setInput(''); setPanelOpen(false); }, []);
  const openSession = (s: ChatSession) => { setActiveId(s.id); setMessages(s.messages); setPanelOpen(false); };
  const deleteSession = (id: string) => {
    setSessions(prev => { const u = prev.filter(s => s.id !== id); saveSessions(u); return u; });
    if (activeId === id) { setActiveId(null); setMessages([]); }
  };

  const doSend = async (text: string) => {
    const t = text.trim();
    if (!t || loading) return;
    const userMsg: Message = { role: 'user', content: t };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);

    let sid = activeId;
    if (!sid) {
      sid = Date.now().toString();
      const title = t.slice(0, 40) + (t.length > 40 ? '...' : '');
      const ses: ChatSession = { id: sid, title, messages: newMsgs, createdAt: Date.now() };
      setSessions(prev => { const u = [ses, ...prev]; saveSessions(u); return u; });
      setActiveId(sid);
    }
    try {
      const reply = await askGroq(newMsgs, grade);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Bağlantı hatası. Tekrar deneyin. 🔌' }]);
    } finally { setLoading(false); setTimeout(() => inputRef.current?.focus(), 100); }
  };

  const quicks = ['Atom nedir?', 'Periyodik tablo nasıl okunur?', 'Kovalent bağ ne demek?', 'Mol kavramını açıkla', 'PV=nRT ne anlama gelir?', 'Asit ve baz farkı nedir?'];

  return (
    <div className="flex h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* ── Main chat ── */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-y-auto">
          {!hasMessages ? (
            /* centered empty */
            <div className="flex flex-col items-center justify-center h-full px-4">
              <div className="mb-3 animate-bounceIn"><RobotAvatar size={80} /></div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 text-center">Merhaba! 👋</h2>
              <p className="text-sm text-gray-500 text-center mb-5 max-w-sm">
                Ben <span className="font-semibold text-blue-600">KimyaLab AI</span>, kimya asistanınım.<br/>
                Kimya ile ilgili aklına takılan her şeyi sorabilirsin!
              </p>
              {/* Input centered */}
              <div className="w-full max-w-lg mb-4">
                <div className="flex gap-2">
                  <input ref={inputRef} type="text" value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); doSend(input); } }}
                    placeholder="Kimya ile ilgili bir şey sor..."
                    className="flex-1 pl-4 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm transition-all" />
                  <button onClick={() => doSend(input)} disabled={!input.trim()}
                    className="px-4 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-30 shrink-0">
                    <SendIcon />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                {quicks.map((q, i) => (
                  <button key={i} onClick={() => doSend(q)}
                    className="text-xs sm:text-sm bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full
                               hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 active:scale-95 transition-all animate-fadeUp"
                    style={{ animationDelay: `${i * 50}ms` }}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* messages */
            <div className="px-3 sm:px-6 py-4 max-w-2xl mx-auto w-full space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeUp`}>
                  {msg.role === 'assistant' && <div className="shrink-0 mr-2 mt-1"><RobotAvatarSmall size={26} /></div>}
                  <div className={`max-w-[82%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
                    ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-md' : 'bg-white border border-gray-100 text-gray-800 rounded-bl-md shadow-sm'}`}>
                    {msg.role === 'assistant' && <p className="text-[10px] font-semibold text-blue-600 mb-0.5">KimyaLab AI</p>}
                    {msg.role === 'assistant' ? <FormattedMessage text={msg.content} /> : <div className="whitespace-pre-wrap">{msg.content}</div>}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start animate-fadeUp">
                  <div className="shrink-0 mr-2 mt-1"><RobotAvatarSmall size={26} /></div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-2.5 shadow-sm">
                    <p className="text-[10px] font-semibold text-blue-600 mb-1">KimyaLab AI</p>
                    <div className="flex gap-1.5"><Dot d={0} /><Dot d={150} /><Dot d={300} /></div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {hasMessages && (
          <div className="border-t border-gray-200 bg-white px-3 sm:px-6 py-2.5 shrink-0">
            <div className="max-w-2xl mx-auto flex gap-2">
              <input ref={inputRef} type="text" value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); doSend(input); } }}
                placeholder="Bir soru daha sor..." disabled={loading}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 transition-all" />
              <button onClick={() => doSend(input)} disabled={loading || !input.trim()}
                className="px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-30 active:scale-95 transition-all shrink-0">
                <SendIcon />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Right panel toggle ── */}
      <button onClick={() => setPanelOpen(!panelOpen)}
        className="absolute top-2 right-2 z-10 w-9 h-9 bg-white border border-gray-200 rounded-xl flex items-center justify-center
                   hover:bg-gray-50 active:scale-90 transition-all shadow-sm"
        title="Sohbet geçmişi">
        <svg className="w-4.5 h-4.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* ── Right panel ── */}
      {panelOpen && (
        <div className="fixed inset-0 z-40 flex sm:absolute sm:inset-auto sm:top-0 sm:right-0 sm:bottom-0 sm:w-64"
          onClick={() => setPanelOpen(false)}>
          <div className="flex-1 bg-black/30 sm:hidden" />
          <div className="w-72 sm:w-full bg-white border-l border-gray-200 h-full flex flex-col shrink-0 shadow-xl sm:shadow-none animate-slideLeft"
            onClick={e => e.stopPropagation()}>
            <div className="p-3 border-b border-gray-100 flex items-center justify-between shrink-0">
              <h3 className="font-bold text-gray-800 text-sm">💬 Sohbetler</h3>
              <button onClick={() => setPanelOpen(false)} className="text-gray-400 hover:text-gray-600 active:scale-90 transition-transform p-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-2 shrink-0">
              <button onClick={createNew}
                className="w-full flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-xl text-xs font-medium hover:bg-blue-700 active:scale-95 transition-all">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Yeni Sohbet
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-0.5">
              {sessions.length === 0 && <p className="text-[10px] text-gray-400 text-center py-6">Henüz sohbet yok</p>}
              {sessions.map(s => (
                <div key={s.id}
                  className={`group flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs cursor-pointer transition-all
                    ${activeId === s.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <button onClick={() => openSession(s)} className="flex-1 text-left truncate min-w-0">
                    <p className="truncate font-medium text-[11px]">{s.title}</p>
                    <p className="text-[9px] text-gray-400">{new Date(s.createdAt).toLocaleDateString('tr-TR')}</p>
                  </button>
                  <button onClick={e => { e.stopPropagation(); deleteSession(s.id); }}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 active:scale-90 transition-all p-0.5 shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════
   Floating Robot (for other pages)
   ═══════════════════════════════════ */
export function FloatingRobot({ grade }: { grade: number }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, loading]);

  const doSend = async () => {
    const t = input.trim();
    if (!t || loading) return;
    const newMsgs = [...msgs, { role: 'user' as const, content: t }];
    setMsgs(newMsgs); setInput(''); setLoading(true);
    try {
      const reply = await askGroq(newMsgs, grade);
      setMsgs(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMsgs(prev => [...prev, { role: 'assistant', content: 'Bağlantı hatası. 🔌' }]);
    } finally { setLoading(false); }
  };

  return (
    <>
      {!open && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-1.5 animate-fadeUp">
          <div className="bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-100 text-[11px] text-gray-600 max-w-[150px] relative">
            Takıldığın yer varsa bana sor! 🧪
            <div className="absolute -bottom-1 right-6 w-2.5 h-2.5 bg-white border-r border-b border-gray-100 rotate-45" />
          </div>
          <button onClick={() => setOpen(true)}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-blue-600 shadow-lg flex items-center justify-center
                       hover:bg-blue-700 active:scale-90 transition-all hover:shadow-xl p-2">
            <RobotAvatar size={38} />
          </button>
        </div>
      )}

      {open && (
        <div className="fixed bottom-0 right-0 sm:bottom-4 sm:right-4 z-50 w-full sm:w-[360px] h-[65vh] sm:h-[460px]
                        bg-white sm:rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-slideUp">
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100 bg-blue-600 text-white shrink-0 sm:rounded-t-2xl">
            <RobotAvatar size={30} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold leading-tight">KimyaLab AI</p>
              <p className="text-[9px] text-blue-200">{grade}. Sınıf Asistanı</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white active:scale-90 transition-all p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2.5 space-y-2.5">
            {msgs.length === 0 && (
              <div className="text-center py-6"><RobotAvatar size={48} /><p className="text-xs text-gray-500 mt-2">Kimya ile ilgili sorunuzu yazın!</p></div>
            )}
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeUp`}>
                {m.role === 'assistant' && <div className="shrink-0 mr-1.5 mt-0.5"><RobotAvatarSmall size={20} /></div>}
                <div className={`max-w-[82%] rounded-2xl px-3 py-2 text-xs leading-relaxed
                  ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-md' : 'bg-gray-100 text-gray-800 rounded-bl-md'}`}>
                  {m.role === 'assistant' ? <FormattedMessage text={m.content} /> : <div className="whitespace-pre-wrap">{m.content}</div>}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start animate-fadeUp">
                <div className="shrink-0 mr-1.5 mt-0.5"><RobotAvatarSmall size={20} /></div>
                <div className="bg-gray-100 rounded-2xl rounded-bl-md px-3 py-2">
                  <div className="flex gap-1"><Dot d={0} /><Dot d={150} /><Dot d={300} /></div>
                </div>
              </div>
            )}
            <div ref={bRef} />
          </div>

          <div className="border-t border-gray-100 p-2 flex gap-1.5 shrink-0">
            <input type="text" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); doSend(); } }}
              placeholder="Sorunuzu yazın..." disabled={loading}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 transition-all" />
            <button onClick={doSend} disabled={loading || !input.trim()}
              className="px-3 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-30 active:scale-95 transition-all shrink-0">
              <SendIcon size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ── tiny helpers ── */
function SendIcon({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
}
function Dot({ d }: { d: number }) {
  return <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />;
}
