import { Formula } from '../data/curriculum';
import { useState } from 'react';

interface FormulaTableProps {
  formulas: Formula[];
}

export default function FormulaTable({ formulas }: FormulaTableProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  const allCategories = [...new Set(formulas.map(f => f.category))];
  const filtered = activeCategory ? formulas.filter(f => f.category === activeCategory) : formulas;

  const toggleFlip = (id: string) => {
    setFlipped(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  if (formulas.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p className="text-4xl mb-3">📐</p>
        <p>Bu sınıf için henüz formül eklenmemiştir.</p>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">📐 Formüller ve Ezberlenmesi Gerekenler</h2>
      <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">Kartlara tıklayarak formül ve açıklama arasında geçiş yapın.</p>

      {/* Category Filter - scrollable on mobile */}
      <div className="flex overflow-x-auto gap-2 mb-4 sm:mb-6 pb-2 -mx-2 px-2">
        <button onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap shrink-0 ${!activeCategory ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          Tümü ({formulas.length})
        </button>
        {allCategories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap shrink-0 ${activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {cat} ({formulas.filter(f => f.category === cat).length})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filtered.map(f => (
          <button key={f.id} onClick={() => toggleFlip(f.id)}
            className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 text-left cursor-pointer group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full">{f.category}</span>
              <span className="text-[10px] text-gray-400">{flipped.has(f.id) ? '📖 Açıklama' : '🔢 Formül'}</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-gray-800 mb-3">{f.name}</div>
            <div className={`rounded-xl p-3 sm:p-4 min-h-[60px] flex items-center justify-center transition-all ${flipped.has(f.id) ? 'bg-green-50 border border-green-100' : 'bg-blue-50 border border-blue-100'}`}>
              {flipped.has(f.id) ? (
                <p className="text-xs sm:text-sm text-green-700 leading-relaxed text-center">{f.description}</p>
              ) : (
                <p className="text-lg sm:text-xl font-bold text-blue-700 font-mono text-center">{f.formula}</p>
              )}
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center group-hover:text-blue-500 transition-colors">
              {flipped.has(f.id) ? '← Formülü görmek için tıkla' : 'Açıklamayı görmek için tıkla →'}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
