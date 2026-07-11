import { useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { Topic, GameType, gameTypeLabels, QuizQ, TFQ, MatchQ, FillQ, SortQ, FlashQ } from '../data/curriculum';
import { buildSession } from '../lib/questionPool';

export interface Mistake { question: string; yourAnswer: string; correctAnswer: string; }

interface GamePlayerProps {
  topic: Topic;
  gameType: GameType;
  userId: string;
  onBack: () => void;
  onSelectType: () => void;
  onNextGame: () => void;
}

const SESSION_SIZE = 10;

export default function GamePlayer({ topic, gameType, userId, onBack, onSelectType, onNextGame }: GamePlayerProps) {
  const info = gameTypeLabels[gameType];
  const [round, setRound] = useState(0); // "tekrar oyna" için oturumu yeniden kurmaya yarar

  const key = (suffix: string) => `kimyalab-seen-${userId}-${topic.id}-${gameType}-${suffix}`;

  const quizSet = useMemo(() => gameType === 'quiz' ? buildSession(topic.quizQuestions, key('q'), SESSION_SIZE) : [], [round, gameType, topic]);
  const tfSet = useMemo(() => gameType === 'truefalse' ? buildSession(topic.tfQuestions, key('tf'), SESSION_SIZE) : [], [round, gameType, topic]);
  const matchSet = useMemo(() => gameType === 'matching' ? buildSession(topic.matchQuestions, key('m'), Math.min(SESSION_SIZE, 6)) : [], [round, gameType, topic]);
  const fillSet = useMemo(() => gameType === 'fillblank' ? buildSession(topic.fillQuestions, key('f'), SESSION_SIZE) : [], [round, gameType, topic]);
  const sortSet = useMemo(() => gameType === 'sorting' ? buildSession(topic.sortQuestions, key('s'), SESSION_SIZE) : [], [round, gameType, topic]);
  const flashSet = useMemo(() => gameType === 'flashcard' ? buildSession(topic.flashQuestions, key('fc'), SESSION_SIZE) : [], [round, gameType, topic]);

  const replay = () => setRound(r => r + 1);

  return (
    <div className="p-3 sm:p-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium active:scale-95 transition-transform">
          ← Ana Menüye Dön
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 animate-fadeUp">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl">{info.icon}</span>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm sm:text-base font-bold text-gray-800 truncate">{topic.title}</h3>
            <p className="text-[10px] sm:text-xs text-gray-500">{info.label}</p>
          </div>
        </div>

        {gameType === 'quiz' && <QuizGame key={round} questions={quizSet} onBack={onBack} onSelectType={onSelectType} onNext={onNextGame} onRetry={replay} />}
        {gameType === 'truefalse' && <TrueFalseGame key={round} questions={tfSet} onBack={onBack} onSelectType={onSelectType} onNext={onNextGame} onRetry={replay} />}
        {gameType === 'matching' && <MatchingGame key={round} questions={matchSet} onBack={onBack} onSelectType={onSelectType} onNext={onNextGame} onRetry={replay} />}
        {gameType === 'fillblank' && <FillBlankGame key={round} questions={fillSet} onBack={onBack} onSelectType={onSelectType} onNext={onNextGame} onRetry={replay} />}
        {gameType === 'sorting' && <SortingGame key={round} questions={sortSet} onBack={onBack} onSelectType={onSelectType} onNext={onNextGame} onRetry={replay} />}
        {gameType === 'flashcard' && <FlashcardGame key={round} questions={flashSet} onBack={onBack} onSelectType={onSelectType} onNext={onNextGame} onRetry={replay} />}
      </div>
    </div>
  );
}

/* ═══════════ Completion + Mistake Review ═══════════ */
function motivationMsg(pct: number): string {
  if (pct === 100) return 'EFSANE! Tam puan! Sen bir dahisin! 🎉🏆⭐';
  if (pct >= 80) return 'Harika! Mükemmel bir performans! 🏆';
  if (pct >= 50) return 'Çok iyi! Biraz daha pratik ve zirvedesin! 💪';
  return 'İyi bir başlangıç! Tekrar deneyerek hızla gelişebilirsin! 📚';
}

function CompletionScreen({ score, total, mistakes, onRetry, onBack, onSelectType, onNext }: {
  score: number; total: number; mistakes: Mistake[];
  onRetry: () => void; onBack: () => void; onSelectType: () => void; onNext: () => void;
}) {
  const [reviewing, setReviewing] = useState(false);
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : 1;

  if (reviewing) {
    return <MistakeReview mistakes={mistakes} onExit={() => setReviewing(false)} onBackToMenu={onBack} />;
  }

  return (
    <div className="text-center py-4 sm:py-6 animate-fadeUp">
      <div className="text-5xl sm:text-6xl mb-3 animate-bounceIn">
        {pct === 100 ? '🏆' : pct >= 80 ? '🎉' : pct >= 50 ? '👏' : '💪'}
      </div>
      <div className="text-3xl sm:text-4xl font-black text-blue-600 mb-1">%{pct}</div>
      <div className="flex justify-center gap-1 mb-3">
        {[1, 2, 3].map(i => (
          <span key={i} className={`text-xl sm:text-2xl transition-all duration-500 ${i <= stars ? 'scale-100 opacity-100' : 'scale-75 opacity-20'}`}>⭐</span>
        ))}
      </div>
      <p className="text-gray-600 font-medium mb-1 text-sm">{score} / {total} doğru</p>
      <p className="text-xs sm:text-sm text-blue-600 font-semibold mb-5">{motivationMsg(pct)}</p>
      <div className="flex flex-wrap gap-2 justify-center">
        <Btn color="blue" onClick={onRetry}>🔄 Tekrar Oyna</Btn>
        <Btn color="green" onClick={onNext}>➡️ Sonraki Oyun Türü</Btn>
        {mistakes.length > 0 && <Btn color="amber" onClick={() => setReviewing(true)}>❌ Yanlışlarını Gör</Btn>}
        <Btn color="gray" onClick={onSelectType}>🎮 Oyun Türü Seç</Btn>
        <Btn color="gray" onClick={onBack}>🏠 Ana Menü</Btn>
      </div>
    </div>
  );
}

function MistakeReview({ mistakes, onExit, onBackToMenu }: { mistakes: Mistake[]; onExit: () => void; onBackToMenu: () => void }) {
  return (
    <div className="animate-fadeUp">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-gray-800 text-sm sm:text-base">❌ Yanlış Yaptığın Sorular</h4>
        <button onClick={onExit} className="text-xs text-blue-600 hover:text-blue-700 active:scale-95 transition-transform">
          ← Sonuç Ekranına Dön
        </button>
      </div>
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
        {mistakes.map((m, i) => (
          <div key={i} className="bg-red-50/60 border border-red-100 rounded-xl p-3 sm:p-4">
            <p className="text-xs sm:text-sm font-medium text-gray-800 mb-2">{i + 1}. {m.question}</p>
            <p className="text-xs text-red-600 mb-1">✗ Senin cevabın: <span className="font-medium">{m.yourAnswer || '(boş bırakıldı)'}</span></p>
            <p className="text-xs text-green-600">✓ Doğru cevap: <span className="font-medium">{m.correctAnswer}</span></p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-center mt-4">
        <Btn color="gray" onClick={onBackToMenu}>🏠 İstediğin Zaman Çık — Ana Menü</Btn>
      </div>
    </div>
  );
}

function Btn({ children, onClick, color }: { children: ReactNode; onClick: () => void; color: 'blue' | 'green' | 'gray' | 'amber' }) {
  const cls = color === 'blue' ? 'bg-blue-600 text-white hover:bg-blue-700'
    : color === 'green' ? 'bg-green-600 text-white hover:bg-green-700'
    : color === 'amber' ? 'bg-amber-500 text-white hover:bg-amber-600'
    : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  return (
    <button onClick={onClick}
      className={`px-4 py-2.5 rounded-xl text-sm font-medium active:scale-95 transition-all duration-150 ${cls}`}>
      {children}
    </button>
  );
}

function NoQuestions({ onSelectType, onBack }: { onSelectType: () => void; onBack: () => void }) {
  return (
    <div className="text-center py-8">
      <div className="text-4xl mb-3">📝</div>
      <p className="text-gray-500 mb-4 text-sm">Bu türde soru bulunmuyor.</p>
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        <Btn color="blue" onClick={onSelectType}>Başka Tür Seç</Btn>
        <Btn color="gray" onClick={onBack}>Ana Menü</Btn>
      </div>
    </div>
  );
}

/* ═══════════ QUIZ ═══════════ */
function QuizGame({ questions, onBack, onSelectType, onNext, onRetry }: { questions: QuizQ[]; onBack: () => void; onSelectType: () => void; onNext: () => void; onRetry: () => void }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [mistakes, setMistakes] = useState<Mistake[]>([]);

  if (questions.length === 0) return <NoQuestions onSelectType={onSelectType} onBack={onBack} />;
  const q = questions[current];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correct) setScore(s => s + 1);
    else setMistakes(m => [...m, { question: q.q, yourAnswer: q.options[idx], correctAnswer: q.options[q.correct] }]);
    setTimeout(() => {
      if (current + 1 < questions.length) { setCurrent(c => c + 1); setSelected(null); }
      else setFinished(true);
    }, 700);
  };

  if (finished) return <CompletionScreen score={score} total={questions.length} mistakes={mistakes}
    onRetry={onRetry} onBack={onBack} onSelectType={onSelectType} onNext={onNext} />;

  return (
    <div>
      <ProgressBar current={current + 1} total={questions.length} score={score} />
      <p className="text-gray-800 font-medium mb-4 text-sm sm:text-base animate-fadeUp">{q.q}</p>
      <div className="space-y-2">
        {q.options.map((opt, idx) => {
          let cls = 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-300 active:scale-[0.98]';
          if (selected !== null) {
            if (idx === q.correct) cls = 'bg-green-100 border-green-400 text-green-800 scale-[1.01]';
            else if (idx === selected) cls = 'bg-red-100 border-red-400 text-red-800 scale-[0.99]';
            else cls = 'bg-gray-50 border-gray-200 opacity-50';
          }
          return (
            <button key={idx} onClick={() => handleSelect(idx)}
              className={`w-full text-left p-3 rounded-xl border text-sm transition-all duration-200 ${cls}`}>
              <span className="font-semibold mr-2">{String.fromCharCode(65 + idx)})</span>{opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════ TRUE/FALSE ═══════════ */
function TrueFalseGame({ questions, onBack, onSelectType, onNext, onRetry }: { questions: TFQ[]; onBack: () => void; onSelectType: () => void; onNext: () => void; onRetry: () => void }) {
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [mistakes, setMistakes] = useState<Mistake[]>([]);

  if (questions.length === 0) return <NoQuestions onSelectType={onSelectType} onBack={onBack} />;
  const q = questions[current];

  const handle = (val: boolean) => {
    if (answered !== null) return;
    setAnswered(val);
    if (val === q.answer) setScore(s => s + 1);
    else setMistakes(m => [...m, { question: q.statement, yourAnswer: val ? 'Doğru' : 'Yanlış', correctAnswer: q.answer ? 'Doğru' : 'Yanlış' }]);
    setTimeout(() => {
      if (current + 1 < questions.length) { setCurrent(c => c + 1); setAnswered(null); }
      else setFinished(true);
    }, 700);
  };

  if (finished) return <CompletionScreen score={score} total={questions.length} mistakes={mistakes}
    onRetry={onRetry} onBack={onBack} onSelectType={onSelectType} onNext={onNext} />;

  return (
    <div>
      <ProgressBar current={current + 1} total={questions.length} score={score} />
      <p className="text-gray-800 font-medium mb-6 text-center text-sm sm:text-base px-2 animate-fadeUp">{q.statement}</p>
      <div className="flex gap-3 justify-center">
        <button onClick={() => handle(true)}
          className={`flex-1 max-w-[160px] py-3 rounded-xl font-bold text-base transition-all duration-200
            ${answered === true ? (q.answer ? 'bg-green-500 text-white scale-105' : 'bg-red-500 text-white scale-95') : 'bg-green-100 text-green-700 hover:bg-green-200 active:scale-95'}`}>
          ✓ Doğru
        </button>
        <button onClick={() => handle(false)}
          className={`flex-1 max-w-[160px] py-3 rounded-xl font-bold text-base transition-all duration-200
            ${answered === false ? (!q.answer ? 'bg-green-500 text-white scale-105' : 'bg-red-500 text-white scale-95') : 'bg-red-100 text-red-700 hover:bg-red-200 active:scale-95'}`}>
          ✗ Yanlış
        </button>
      </div>
    </div>
  );
}

/* ═══════════ MATCHING ═══════════ */
function MatchingGame({ questions, onBack, onSelectType, onNext, onRetry }: { questions: MatchQ[]; onBack: () => void; onSelectType: () => void; onNext: () => void; onRetry: () => void }) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrongPair, setWrongPair] = useState<number | null>(null);
  const [mistakeCount, setMistakeCount] = useState<Map<number, number>>(new Map());
  const [shuffledRight] = useState(() => {
    const idx = questions.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
    return idx;
  });

  if (questions.length === 0) return <NoQuestions onSelectType={onSelectType} onBack={onBack} />;

  const handleRight = (origIdx: number) => {
    if (selectedLeft === null || matched.has(origIdx)) return;
    if (selectedLeft === origIdx) {
      setMatched(prev => new Set([...prev, origIdx]));
      setSelectedLeft(null);
    } else {
      setMistakeCount(prev => new Map(prev).set(selectedLeft, (prev.get(selectedLeft) || 0) + 1));
      setWrongPair(origIdx);
      setTimeout(() => { setWrongPair(null); setSelectedLeft(null); }, 500);
    }
  };

  if (matched.size === questions.length) {
    const mistakes: Mistake[] = questions
      .map((p, i) => ({ p, i }))
      .filter(({ i }) => (mistakeCount.get(i) || 0) > 0)
      .map(({ p }) => ({ question: p.left, yourAnswer: '(yanlış eşleştirme denendi)', correctAnswer: p.right }));
    const score = questions.length - mistakes.length;
    return <CompletionScreen score={Math.max(score, 0)} total={questions.length} mistakes={mistakes}
      onRetry={onRetry} onBack={onBack} onSelectType={onSelectType} onNext={onNext} />;
  }

  return (
    <div>
      <p className="text-xs text-gray-500 mb-3">Soldan seçin → Sağdan eşleştirin ({matched.size}/{questions.length})</p>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div className="space-y-1.5">
          {questions.map((p, i) => (
            <button key={i} onClick={() => !matched.has(i) && setSelectedLeft(i)}
              className={`w-full p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm text-left transition-all duration-200
                ${matched.has(i) ? 'bg-green-100 border-green-300 line-through opacity-50 scale-95'
                : selectedLeft === i ? 'bg-blue-100 border-blue-400 ring-2 ring-blue-300 scale-[1.02]'
                : 'bg-gray-50 border-gray-200 hover:bg-blue-50 active:scale-[0.97]'}`}>
              {p.left}
            </button>
          ))}
        </div>
        <div className="space-y-1.5">
          {shuffledRight.map((origIdx: number) => (
            <button key={origIdx} onClick={() => handleRight(origIdx)}
              className={`w-full p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm text-left transition-all duration-200
                ${matched.has(origIdx) ? 'bg-green-100 border-green-300 line-through opacity-50 scale-95'
                : wrongPair === origIdx ? 'bg-red-100 border-red-400 animate-shake'
                : 'bg-gray-50 border-gray-200 hover:bg-blue-50 active:scale-[0.97]'}`}>
              {questions[origIdx].right}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════ FILL BLANK ═══════════ */
function FillBlankGame({ questions, onBack, onSelectType, onNext, onRetry }: { questions: FillQ[]; onBack: () => void; onSelectType: () => void; onNext: () => void; onRetry: () => void }) {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [mistakes, setMistakes] = useState<Mistake[]>([]);

  if (questions.length === 0) return <NoQuestions onSelectType={onSelectType} onBack={onBack} />;
  const q = questions[current];
  const isCorrect = input.toLowerCase().trim() === q.answer.toLowerCase().trim();

  const handleCheck = () => {
    if (!input.trim() || showAnswer) return;
    if (isCorrect) setScore(s => s + 1);
    else setMistakes(m => [...m, { question: q.sentence, yourAnswer: input, correctAnswer: q.answer }]);
    setShowAnswer(true);
    setTimeout(() => {
      if (current + 1 < questions.length) { setCurrent(c => c + 1); setInput(''); setShowAnswer(false); }
      else setFinished(true);
    }, 1200);
  };

  if (finished) return <CompletionScreen score={score} total={questions.length} mistakes={mistakes}
    onRetry={onRetry} onBack={onBack} onSelectType={onSelectType} onNext={onNext} />;

  return (
    <div>
      <ProgressBar current={current + 1} total={questions.length} score={score} />
      <p className="text-gray-800 font-medium mb-4 text-sm sm:text-base animate-fadeUp">{q.sentence}</p>
      <div className="flex gap-2">
        <input type="text" value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleCheck()}
          className="flex-1 p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
          placeholder="Cevabınızı yazın..." disabled={showAnswer} />
        <button onClick={handleCheck} disabled={showAnswer || !input.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 disabled:opacity-40 active:scale-95 transition-all whitespace-nowrap">
          Kontrol
        </button>
      </div>
      {showAnswer && (
        <div className={`mt-3 text-sm font-medium animate-fadeUp ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
          {isCorrect ? '✓ Doğru!' : `✗ Doğru cevap: ${q.answer}`}
        </div>
      )}
    </div>
  );
}

/* ═══════════ SORTING (çoklu, 10'a kadar) ═══════════ */
function SortingGame({ questions, onBack, onSelectType, onNext, onRetry }: { questions: SortQ[]; onBack: () => void; onSelectType: () => void; onNext: () => void; onRetry: () => void }) {
  const [current, setCurrent] = useState(0);
  const [items, setItems] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [everWrong, setEverWrong] = useState(false);

  useEffect(() => {
    if (questions.length === 0) return;
    const q = questions[current];
    const shuffled = [...q.items];
    for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; }
    setItems(shuffled);
    setChecked(false);
    setEverWrong(false);
  }, [current, questions]);

  if (questions.length === 0) return <NoQuestions onSelectType={onSelectType} onBack={onBack} />;
  const q = questions[current];
  const correct = items.every((item, i) => item === q.items[q.correctOrder[i]]);

  const moveUp = (i: number) => { if (i === 0 || checked) return; const a = [...items]; [a[i], a[i - 1]] = [a[i - 1], a[i]]; setItems(a); };
  const moveDown = (i: number) => { if (i === items.length - 1 || checked) return; const a = [...items]; [a[i], a[i + 1]] = [a[i + 1], a[i]]; setItems(a); };

  const handleCheckOrder = () => {
    setChecked(true);
    if (correct) {
      if (!everWrong) setScore(s => s + 1);
      else setMistakes(m => [...m, { question: 'Sıralama: ' + q.items[0] + '…', yourAnswer: 'birden fazla denemede', correctAnswer: q.correctOrder.map(i => q.items[i]).join(' → ') }]);
      setTimeout(() => {
        if (current + 1 < questions.length) setCurrent(c => c + 1);
        else setFinished(true);
      }, 900);
    } else {
      setEverWrong(true);
    }
  };

  if (finished) return <CompletionScreen score={score} total={questions.length} mistakes={mistakes}
    onRetry={onRetry} onBack={onBack} onSelectType={onSelectType} onNext={onNext} />;

  return (
    <div>
      <ProgressBar current={current + 1} total={questions.length} score={score} />
      <p className="text-xs text-gray-500 mb-3">Öğeleri doğru sıraya getirin.</p>
      <div className="space-y-1.5 mb-4">
        {items.map((item, i) => (
          <div key={i} className={`flex items-center gap-2 p-2.5 sm:p-3 rounded-xl border text-sm transition-all duration-200
            ${checked ? (item === q.items[q.correctOrder[i]] ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300 animate-shake') : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex flex-col gap-0.5">
              <button onClick={() => moveUp(i)} className="text-gray-400 hover:text-gray-700 active:scale-90 transition-transform text-xs leading-none p-0.5">▲</button>
              <button onClick={() => moveDown(i)} className="text-gray-400 hover:text-gray-700 active:scale-90 transition-transform text-xs leading-none p-0.5">▼</button>
            </div>
            <span className="flex-1 text-xs sm:text-sm">{item}</span>
            <span className="text-[10px] text-gray-400 w-5 text-center">{i + 1}</span>
          </div>
        ))}
      </div>
      {(!checked || !correct) && <Btn color="blue" onClick={handleCheckOrder}>Kontrol Et</Btn>}
      {checked && !correct && <p className="text-red-600 text-sm font-medium mt-2">❌ Yanlış sıra, tekrar dene!</p>}
    </div>
  );
}

/* ═══════════ FLASHCARD ═══════════ */
function FlashcardGame({ questions, onBack, onSelectType, onNext }: { questions: FlashQ[]; onBack: () => void; onSelectType: () => void; onNext: () => void; onRetry: () => void }) {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);

  if (questions.length === 0) return <NoQuestions onSelectType={onSelectType} onBack={onBack} />;

  if (done) {
    return (
      <div className="text-center py-6 animate-fadeUp">
        <div className="text-5xl mb-3">🃏</div>
        <p className="text-gray-700 font-semibold mb-1">Tüm kartları inceledin!</p>
        <p className="text-xs text-gray-500 mb-5">{questions.length} kart tamamlandı.</p>
        <div className="flex flex-wrap gap-2 justify-center">
          <Btn color="green" onClick={onNext}>➡️ Sonraki Oyun Türü</Btn>
          <Btn color="gray" onClick={onSelectType}>🎮 Oyun Türü Seç</Btn>
          <Btn color="gray" onClick={onBack}>🏠 Ana Menü</Btn>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const isLast = current === questions.length - 1;

  return (
    <div className="text-center">
      <ProgressBar current={current + 1} total={questions.length} score={current} />
      <button onClick={() => setFlipped(!flipped)}
        className={`w-full min-h-[140px] sm:min-h-[180px] rounded-2xl p-5 sm:p-8 flex items-center justify-center border-2
          transition-all duration-300 cursor-pointer active:scale-[0.98] mb-4
          ${flipped ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-400'}`}>
        <div className="text-center animate-fadeUp" key={`${current}-${flipped}`}>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-2">{flipped ? 'CEVAP' : 'SORU'}</p>
          <p className={`text-sm sm:text-base font-medium leading-relaxed ${flipped ? 'text-green-700' : 'text-gray-800'}`}>{flipped ? q.back : q.front}</p>
          <p className="text-[10px] text-gray-400 mt-3">Çevirmek için tıkla</p>
        </div>
      </button>
      <div className="flex gap-2 justify-center">
        <button onClick={() => { setCurrent(Math.max(0, current - 1)); setFlipped(false); }} disabled={current === 0}
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm hover:bg-gray-200 disabled:opacity-30 active:scale-95 transition-all">← Önceki</button>
        {isLast ? (
          <Btn color="green" onClick={() => setDone(true)}>Bitir</Btn>
        ) : (
          <button onClick={() => { setCurrent(current + 1); setFlipped(false); }}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 active:scale-95 transition-all">Sonraki →</button>
        )}
      </div>
    </div>
  );
}

/* ═══════════ Progress Bar ═══════════ */
function ProgressBar({ current, total, score }: { current: number; total: number; score: number }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[10px] sm:text-xs text-gray-400">Soru {current}/{total}</span>
        <span className="text-[10px] sm:text-xs text-blue-600 font-medium">Doğru: {score}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${(current / total) * 100}%` }} />
      </div>
    </div>
  );
}
