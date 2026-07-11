import { useState } from 'react';
import { GradeData, Unit } from '../data/curriculum';

/**
 * Ders Notları — mevcut konu verilerindeki bilgi kartlarından (flashcard,
 * yoksa quiz sorularının doğru şıklarından) sınıfa ve konuya göre
 * gruplanmış, biçimlendirilmiş özet notlar üretir.
 */
export default function NotesPage({ data }: { data: GradeData }) {
  const [openUnit, setOpenUnit] = useState<string | null>(data.units[0]?.id ?? null);

  return (
    <div className="p-2 sm:p-4">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">📝 Ders Notları</h2>
      <p className="text-gray-500 text-xs sm:text-sm mb-5">{data.grade}. sınıf konularının üniteye göre özetlenmiş notları.</p>

      <div className="space-y-3">
        {data.units.map((unit, ui) => (
          <UnitBlock key={unit.id} unit={unit} index={ui}
            open={openUnit === unit.id}
            onToggle={() => setOpenUnit(openUnit === unit.id ? null : unit.id)} />
        ))}
      </div>
    </div>
  );
}

function UnitBlock({ unit, index, open, onToggle }: { unit: Unit; index: number; open: boolean; onToggle: () => void }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fadeUp" style={{ animationDelay: `${index * 40}ms` }}>
      <button onClick={onToggle} className="w-full flex items-center gap-3 p-3 sm:p-4 text-left hover:bg-gray-50 transition-colors">
        <span className="text-xl">{['🔬', '🧪', '⚗️', '🧬', '💎', '🌡️', '🔥'][index % 7]}</span>
        <h3 className="flex-1 font-bold text-gray-800 text-sm sm:text-base">{unit.title}</h3>
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-3 sm:px-4 pb-4 space-y-4">
          {unit.subUnits.map(sub => (
            <div key={sub.id}>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">{sub.title}</p>
              <div className="space-y-3">
                {sub.topics.map(topic => {
                  const notes = topic.flashQuestions.length > 0
                    ? topic.flashQuestions.map(f => ({ term: f.front, desc: f.back }))
                    : topic.quizQuestions.slice(0, 4).map(q => ({ term: q.q, desc: q.options[q.correct] }));

                  if (notes.length === 0) return null;
                  return (
                    <div key={topic.id} className="bg-gray-50/80 border border-gray-100 rounded-xl p-3 sm:p-4">
                      <p className="text-sm font-bold text-gray-800 mb-2">📖 {topic.title}</p>
                      <ul className="space-y-1.5">
                        {notes.map((n, i) => (
                          <li key={i} className="flex gap-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
                            <span className="shrink-0 mt-0.5 text-blue-500">•</span>
                            <span><strong className="font-bold text-gray-900">{n.term}</strong> — {n.desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
