interface GradeSelectProps {
  onSelect: (grade: number) => void;
}

export default function GradeSelect({ onSelect }: GradeSelectProps) {
  const grades = [
    { num: 9, desc: 'Atom yapısı, periyodik tablo, kimyasal bağlar, moleküller arası etkileşimler, sürdürülebilirlik', icon: '⚛️', color: 'from-blue-500 to-blue-600' },
    { num: 10, desc: 'Tepkimeler, stokiyometri, mol kavramı, gaz yasaları, çözeltiler, derişim', icon: '🧪', color: 'from-emerald-500 to-emerald-600' },
    { num: 11, desc: 'Modern atom teorisi, gazlar, termokimya, tepkime hızı, kimyasal denge', icon: '🔬', color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6"
      style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <div className="mb-8 sm:mb-12 text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <svg viewBox="0 0 64 64" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
            <circle cx="32" cy="20" r="12" stroke="#2563eb" strokeWidth="3" fill="none" />
            <circle cx="32" cy="20" r="4" fill="#2563eb" opacity="0.8" />
            <path d="M20 32 L16 56 L32 48 L48 56 L44 32" stroke="#2563eb" strokeWidth="3" fill="none" strokeLinejoin="round" />
          </svg>
          <h1 className="text-3xl sm:text-4xl font-bold">
            <span className="text-gray-800">Kimya</span>
            <span className="text-blue-600">Lab</span>
          </h1>
        </div>
        <p className="text-gray-500 text-sm sm:text-lg">Sınıfınızı seçerek başlayın</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl w-full">
        {grades.map((g) => (
          <button
            key={g.num}
            onClick={() => onSelect(g.num)}
            className="group bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-300 hover:-translate-y-1 active:scale-[0.97] text-left animate-fadeUp"
            style={{ animationDelay: `${(g.num - 9) * 100}ms` }}
          >
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{g.icon}</div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
              {g.num}. Sınıf
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{g.desc}</p>
            <div className="mt-4 sm:mt-6 inline-flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Başla →
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
