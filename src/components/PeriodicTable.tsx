import React, { useState } from 'react';
import { elements, categories, categoryColors, Element as Elem } from '../data/periodicTable';

export default function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState<Elem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const getElementStyle = (el: Elem): React.CSSProperties => {
    if (activeFilter && el.category !== activeFilter) {
      return { backgroundColor: '#f9fafb', borderColor: '#e5e7eb', opacity: 0.12 };
    }
    const c = categoryColors[el.category] || '#ccc';
    return { backgroundColor: c + '22', borderColor: c + '66' };
  };

  const getSymbolColor = (el: Elem) => {
    if (activeFilter && el.category !== activeFilter) return '#d1d5db';
    return categoryColors[el.category] || '#666';
  };

  return (
    <div className="p-2 sm:p-4">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">⚛️ Periyodik Tablo</h2>

      {/* Category Filters - scrollable on mobile */}
      <div className="flex overflow-x-auto gap-1.5 sm:gap-2 mb-4 sm:mb-6 pb-2 -mx-2 px-2 scrollbar-hide">
        <button onClick={() => setActiveFilter(null)}
          className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-all whitespace-nowrap shrink-0 ${!activeFilter ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          Tümü
        </button>
        {Object.entries(categories).map(([key, cat]) => (
          <button key={key} onClick={() => setActiveFilter(activeFilter === key ? null : key)}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-all flex items-center gap-1 whitespace-nowrap shrink-0 ${activeFilter === key ? 'text-white shadow-md' : 'text-gray-700'}`}
            style={{ backgroundColor: activeFilter === key ? cat.color : cat.color + '20' }}>
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Periodic Table Grid - responsive */}
      <div className="overflow-x-auto pb-4 -mx-2 px-2">
        <div style={{ minWidth: '750px' }}>
          {/* Period labels */}
          <div className="grid gap-[2px]" style={{ gridTemplateColumns: 'auto repeat(18, minmax(0, 1fr))' }}>
            {/* Header Row - Group numbers */}
            <div></div>
            {Array.from({ length: 18 }, (_, i) => (
              <div key={i} className="text-center text-[8px] sm:text-[10px] text-gray-400 pb-1">{i + 1}</div>
            ))}

            {/* Rows 1-7 */}
            {[1, 2, 3, 4, 5, 6, 7].map(row => (
              <React.Fragment key={`row-${row}`}>
                <div className="flex items-center justify-center text-[8px] sm:text-[10px] text-gray-400 pr-1">{row}</div>
                {Array.from({ length: 18 }, (_, colIdx) => {
                  const col = colIdx + 1;
                  const el = elements.find(e => e.gridRow === row && e.gridCol === col);

                  // Lanthanide/Actinide placeholder
                  if (row === 6 && col === 3) return <div key={`${row}-${col}`} className="flex items-center justify-center text-[7px] sm:text-[9px] text-pink-400 font-medium rounded border border-pink-100 bg-pink-50/30" style={{ minHeight: '38px' }}>57-71</div>;
                  if (row === 7 && col === 3) return <div key={`${row}-${col}`} className="flex items-center justify-center text-[7px] sm:text-[9px] text-fuchsia-400 font-medium rounded border border-fuchsia-100 bg-fuchsia-50/30" style={{ minHeight: '38px' }}>89-103</div>;

                  if (!el) return <div key={`${row}-${col}`} />;

                  return (
                    <button key={el.number} onClick={() => setSelectedElement(el)}
                      className="relative p-0.5 sm:p-1 rounded border text-center transition-all duration-150 hover:scale-110 hover:z-10 hover:shadow-lg active:scale-95 cursor-pointer"
                      style={{ ...getElementStyle(el), minHeight: '38px' }}>
                      <div className="text-[7px] sm:text-[9px] text-gray-500 leading-none">{el.number}</div>
                      <div className="text-[10px] sm:text-sm font-bold leading-tight" style={{ color: getSymbolColor(el) }}>{el.symbol}</div>
                      <div className="text-[6px] sm:text-[8px] text-gray-400 leading-none truncate">{el.mass}</div>
                    </button>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          {/* Spacer */}
          <div className="h-3 sm:h-4" />

          {/* Lanthanides & Actinides */}
          <div className="grid gap-[2px]" style={{ gridTemplateColumns: 'auto repeat(18, minmax(0, 1fr))' }}>
            {[9, 10].map(row => (
              <React.Fragment key={`laac-${row}`}>
                <div className="flex items-center justify-center text-[7px] sm:text-[9px] text-gray-400 pr-1">
                  {row === 9 ? 'La' : 'Ac'}
                </div>
                {Array.from({ length: 18 }, (_, colIdx) => {
                  const col = colIdx + 1;
                  const el = elements.find(e => e.gridRow === row && e.gridCol === col);
                  if (!el) return <div key={`${row}-${col}`} />;
                  return (
                    <button key={el.number} onClick={() => setSelectedElement(el)}
                      className="relative p-0.5 sm:p-1 rounded border text-center transition-all hover:scale-110 hover:z-10 hover:shadow-lg cursor-pointer"
                      style={{ ...getElementStyle(el), minHeight: '38px' }}>
                      <div className="text-[7px] sm:text-[9px] text-gray-500 leading-none">{el.number}</div>
                      <div className="text-[10px] sm:text-sm font-bold leading-tight" style={{ color: getSymbolColor(el) }}>{el.symbol}</div>
                      <div className="text-[6px] sm:text-[8px] text-gray-400 leading-none truncate">{el.mass}</div>
                    </button>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 p-3 bg-gray-50 rounded-xl">
        <p className="text-xs text-gray-500 mb-2 font-medium">Renk Açıklamaları:</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(categories).map(([key, cat]) => (
            <div key={key} className="flex items-center gap-1">
              <span className="w-3 h-3 rounded" style={{ backgroundColor: cat.color + '44', borderColor: cat.color, borderWidth: 1 }} />
              <span className="text-[10px] text-gray-600">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Element Detail Modal */}
      {selectedElement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4" onClick={() => setSelectedElement(null)}>
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs text-gray-400">#{selectedElement.number}</span>
                <h3 className="text-3xl sm:text-4xl font-bold" style={{ color: categoryColors[selectedElement.category] }}>{selectedElement.symbol}</h3>
                <p className="text-lg font-medium text-gray-800">{selectedElement.nameTR}</p>
                <p className="text-sm text-gray-500">{selectedElement.name}</p>
              </div>
              <button onClick={() => setSelectedElement(null)} className="text-gray-400 hover:text-gray-600 text-2xl p-1">×</button>
            </div>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: categoryColors[selectedElement.category] + '20', color: categoryColors[selectedElement.category] }}>
                {categories[selectedElement.category]?.label}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <InfoRow label="Atom Kütlesi" value={selectedElement.mass + ' u'} />
              <InfoRow label="Periyot" value={String(selectedElement.period)} />
              <InfoRow label="Grup" value={String(selectedElement.group)} />
              <InfoRow label="Elektron Dizilimi" value={selectedElement.electron_config} />
              <InfoRow label="Elektronegatiflik" value={selectedElement.electronegativity} />
              <InfoRow label="Yükseltgenme Durumu" value={selectedElement.oxidation_states} />
              <InfoRow label="Yoğunluk" value={selectedElement.density} />
              <InfoRow label="Erime Noktası" value={selectedElement.melting_point} />
              <InfoRow label="Kaynama Noktası" value={selectedElement.boiling_point} />
              <InfoRow label="Keşif" value={selectedElement.discovery} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-2">
      <div className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wide">{label}</div>
      <div className="text-gray-800 font-medium text-xs">{value}</div>
    </div>
  );
}
