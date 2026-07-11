export interface Topic {
  id: string;
  title: string;
  quizQuestions: QuizQ[];
  tfQuestions: TFQ[];
  matchQuestions: MatchQ[];
  fillQuestions: FillQ[];
  sortQuestions: SortQ[];
  flashQuestions: FlashQ[];
}

export interface QuizQ { q: string; options: string[]; correct: number; }
export interface TFQ { statement: string; answer: boolean; }
export interface MatchQ { left: string; right: string; }
export interface FillQ { sentence: string; answer: string; }
export interface SortQ { items: string[]; correctOrder: number[]; }
export interface FlashQ { front: string; back: string; }

export interface SubUnit {
  id: string;
  title: string;
  topics: Topic[];
}

export interface Unit {
  id: string;
  title: string;
  subUnits: SubUnit[];
}

export interface GradeData {
  grade: number;
  description: string;
  learnItems: string[];
  units: Unit[];
  formulas: Formula[];
  referenceTables?: RefTable[];
}

export interface Formula {
  id: string;
  name: string;
  formula: string;
  description: string;
  category: string;
}

export interface RefTable {
  id: string;
  title: string;
  icon: string;
  headers: string[];
  rows: string[][];
}

export type GameType = 'quiz' | 'matching' | 'fillblank' | 'truefalse' | 'sorting' | 'flashcard';

export const gameTypeLabels: Record<GameType, { label: string; icon: string }> = {
  quiz: { label: 'Çoktan Seçmeli', icon: '🎯' },
  matching: { label: 'Eşleştirme', icon: '🔗' },
  fillblank: { label: 'Boşluk Doldurma', icon: '✏️' },
  truefalse: { label: 'Doğru / Yanlış', icon: '✅' },
  sorting: { label: 'Sıralama', icon: '📊' },
  flashcard: { label: 'Bilgi Kartları', icon: '🃏' },
};

// ============ 9. SINIF ============
export const grade9Data: GradeData = {
  grade: 9,
  description: '9. sınıf kimya dersi, kimyanın temellerini atan ve ilerleyen sınıflar için altyapı oluşturan bir derstir. Bu yıl maddenin en küçük yapı taşı olan atomdan başlayarak periyodik tabloya, oradan kimyasal bağlara ve moleküller arası kuvvetlere uzanan bir yolculuğa çıkacaksınız.',
  learnItems: [
    'Kimyanın günlük hayattaki yerini ve önemini kavrayacaksınız. Sabun, ilaç, gıda katkı maddeleri gibi etrafınızdaki her şeyin kimyayla ilişkisini göreceksiniz.',
    'Atom teorilerinin tarihsel gelişimini (Dalton, Thomson, Rutherford, Bohr) öğrenecek ve modern atom modeline geçişi anlayacaksınız.',
    'Elektron dizilimlerini yazabilecek, orbitalleri tanıyacak ve bir elementin periyodik tablodaki yerini proton sayısından bulabileceksiniz.',
    'Periyodik özellikleri (atom yarıçapı, iyonlaşma enerjisi, elektronegatiflik) karşılaştırabilecek ve eğilimleri yorumlayabileceksiniz.',
    'Metalik, iyonik ve kovalent bağların nasıl oluştuğunu, Lewis nokta yapılarını çizebilecek ve moleküllerin polar/apolar olduğunu belirleyebileceksiniz.',
    'Moleküller arası etkileşimleri (Van der Waals, dipol-dipol, hidrojen bağı) tanıyacak ve bunların maddenin kaynama/erime noktasına etkisini anlayacaksınız.',
    'Nanoparçacıklar ve yeşil kimya gibi modern kavramlarla tanışarak sürdürülebilir bir gelecek için kimyanın rolünü keşfedeceksiniz.',
  ],
  formulas: [
    { id: 'f9-1', name: 'Atom Numarası', formula: 'Z = proton sayısı', description: 'Bir atomdaki proton sayısı, o elementin atom numarasını verir ve periyodik tablodaki yerini belirler.', category: 'Atom' },
    { id: 'f9-2', name: 'Kütle Numarası', formula: 'A = Z + N', description: 'Kütle numarası, proton sayısı (Z) ile nötron sayısının (N) toplamıdır. Çekirdekteki toplam nükleonu gösterir.', category: 'Atom' },
    { id: 'f9-3', name: 'Nötron Sayısı', formula: 'N = A − Z', description: 'Nötron sayısı, kütle numarasından proton sayısı çıkarılarak bulunur.', category: 'Atom' },
    { id: 'f9-4', name: 'İyon Yükü', formula: 'Yük = proton − elektron', description: 'Bir atomun kaybettiği veya kazandığı elektron sayısına göre yük kazanır. Pozitif yük: elektron kaybı, negatif yük: elektron kazanımı.', category: 'Atom' },
    { id: 'f9-5', name: 'Değerlik Elektron Sayısı', formula: 'Son enerji düzeyindeki e⁻', description: 'Bir atomun en dış katmanındaki elektron sayısıdır. Kimyasal bağ kurma kapasitesini belirler.', category: 'Periyodik Tablo' },
    { id: 'f9-6', name: 'Oktet Kuralı', formula: 'Son katmanda 8 e⁻', description: 'Atomlar, en dış katmanlarında 8 elektron bulundurarak (soy gaz kararlılığı) kararlı hale gelmeye çalışır.', category: 'Bağlar' },
    { id: 'f9-7', name: 'Elektronegatiflik Farkı', formula: 'ΔEN = |EN₁ − EN₂|', description: 'İki atom arasındaki elektronegatiflik farkı bağ türünü belirler. ΔEN > 1.7 ise iyonik, < 1.7 ise kovalent bağ oluşur.', category: 'Bağlar' },
    { id: 'f9-8', name: 'Periyot Numarası', formula: 'Periyot = katman sayısı', description: 'Bir elementin periyot numarası, atomdaki enerji düzeyi (katman) sayısına eşittir.', category: 'Periyodik Tablo' },
  ],
  units: [
    {
      id: '9-u1', title: '1. Ünite: Etkileşim',
      subUnits: [
        {
          id: '9-u1-s1', title: '1.1 Kimya Hayattır',
          topics: [
            {
              id: '9-t1', title: 'Günlük Hayatta Kimya',
              quizQuestions: [
                { q: 'Aşağıdakilerden hangisi kimyanın günlük hayattaki uygulamalarından biri değildir?', options: ['İlaç üretimi', 'Gıda muhafazası', 'Gezegen yörüngesi hesaplama', 'Temizlik maddeleri üretimi'], correct: 2 },
                { q: 'Sabun üretiminde kullanılan kimyasal süreç hangisidir?', options: ['Sabunlaşma (saponifikasyon)', 'Elektroliz', 'Nükleer fisyon', 'Fotosentez'], correct: 0 },
                { q: 'Gıdaların bozulmasını yavaşlatmak için kullanılan yöntem hangisidir?', options: ['Antioksidan ekleme', 'Asit ekleme', 'Radyoaktif ışınlama', 'Hepsi'], correct: 3 },
                { q: 'Hangisi bir kimyasal değişimdir?', options: ['Buz erimesi', 'Kâğıdın yanması', 'Şekerin suda çözünmesi', 'Cam kırılması'], correct: 1 },
                { q: 'Deterjanlar kirleri nasıl temizler?', options: ['Yüzey gerilimini azaltarak', 'Sıcaklığı artırarak', 'Kirli yüzeyi aşındırarak', 'Suyu buharlaştırarak'], correct: 0 },
              ],
              tfQuestions: [
                { statement: 'Kimya sadece laboratuvarda çalışılan bir bilim dalıdır.', answer: false },
                { statement: 'Yemek pişirme sırasında kimyasal tepkimeler gerçekleşir.', answer: true },
                { statement: 'İlaçların vücuttaki etkisi kimyasal reaksiyonlara dayanır.', answer: true },
                { statement: 'Paslanma fiziksel bir değişimdir.', answer: false },
                { statement: 'Fotosentez bir kimyasal tepkimedir.', answer: true },
              ],
              matchQuestions: [
                { left: 'Sabunlaşma', right: 'Yağ + Baz → Sabun' },
                { left: 'Paslanma', right: 'Demir + Oksijen → Demir oksit' },
                { left: 'Fotosentez', right: 'CO₂ + H₂O → Glikoz + O₂' },
                { left: 'Yanma', right: 'Yakıt + O₂ → CO₂ + H₂O' },
              ],
              fillQuestions: [
                { sentence: 'Kâğıdın yanması bir ____ değişime örnektir.', answer: 'kimyasal' },
                { sentence: 'Buzun erimesi bir ____ değişime örnektir.', answer: 'fiziksel' },
                { sentence: 'Maddelerin en küçük yapı taşına ____ denir.', answer: 'atom' },
                { sentence: 'Yemek pişirirken gerçekleşen ____ tepkimesi, besinlerin rengini ve tadını değiştirir.', answer: 'Maillard' },
              ],
              sortQuestions: [
                { items: ['Hipotez kur', 'Gözlem yap', 'Deney tasarla', 'Sonuç çıkar'], correctOrder: [1, 0, 2, 3] },
              ],
              flashQuestions: [
                { front: 'Kimyasal değişim nedir?', back: 'Maddenin iç yapısının değiştiği, yeni maddeler oluştuğu değişimdir. Örn: yanma, paslanma.' },
                { front: 'Fiziksel değişim nedir?', back: 'Maddenin dış görünüşü veya hali değişir ama iç yapısı aynı kalır. Örn: erime, buharlaşma.' },
                { front: 'Simya (Alşimi) nedir?', back: 'Kimyanın öncüsü olan, değersiz metalleri altına çevirmeye çalışan eski bir uygulama alanıdır.' },
              ],
            },
            {
              id: '9-t2', title: 'Kimyasal Maddelerin Kullanımı ve Güvenlik',
              quizQuestions: [
                { q: 'Laboratuvarda kimyasal madde kullanırken hangisi yapılmamalıdır?', options: ['Eldiven giymek', 'Kimyasalları koklamak', 'Koruyucu gözlük takmak', 'Önlük giymek'], correct: 1 },
                { q: 'GHS sembollerinden "alev" işareti neyi ifade eder?', options: ['Yanıcı madde', 'Zehirli madde', 'Çevre için tehlikeli', 'Aşındırıcı madde'], correct: 0 },
                { q: 'Asit döküldüğünde ne yapılmalıdır?', options: ['Üzerine su dökmek', 'Bezle silmek', 'Nötralize edici madde ile temizlemek', 'Olduğu gibi bırakmak'], correct: 2 },
                { q: 'MSDS (Malzeme Güvenlik Bilgi Formu) ne işe yarar?', options: ['Kimyasalın tehlike bilgilerini verir', 'Fiyat bilgisi verir', 'Üretim tarihini gösterir', 'Satış noktalarını listeler'], correct: 0 },
                { q: 'Hangisi tehlike sembollerinden biri değildir?', options: ['Yanıcı', 'Oksitleyici', 'Radyoaktif', 'Lezzetli'], correct: 3 },
              ],
              tfQuestions: [
                { statement: 'Kimyasal maddeler asla çıplak elle tutulmamalıdır.', answer: true },
                { statement: 'Laboratuvarda yiyecek ve içecek bulundurulabilir.', answer: false },
                { statement: 'Tüm kimyasallar tehlikelidir.', answer: false },
                { statement: 'GHS, küresel uyumlaştırılmış sistem anlamına gelir.', answer: true },
                { statement: 'Kuru kimyasallar su ile karıştırılarak atılmalıdır.', answer: false },
              ],
              matchQuestions: [
                { left: 'Alev sembolü', right: 'Yanıcı madde' },
                { left: 'Kuru kafa sembolü', right: 'Zehirli madde' },
                { left: 'Aşındırıcı sembol', right: 'Cilt ve göze zarar veren' },
                { left: 'Ünlem sembolü', right: 'Dikkat gerektiren hafif tehlike' },
              ],
              fillQuestions: [
                { sentence: 'Laboratuvarda göz koruyucu olarak ____ takılmalıdır.', answer: 'gözlük' },
                { sentence: 'Kimyasal maddelerin güvenli kullanım bilgileri ____ formunda bulunur.', answer: 'MSDS' },
                { sentence: 'Yanıcı maddelerin üzerinde ____ sembolü bulunur.', answer: 'alev' },
              ],
              sortQuestions: [
                { items: ['Koruyucu ekipman giy', 'Deneyi planla', 'Deneyi gerçekleştir', 'Malzemeleri temizle'], correctOrder: [1, 0, 2, 3] },
              ],
              flashQuestions: [
                { front: 'GHS nedir?', back: 'Globally Harmonized System - Küresel Uyumlaştırılmış Kimyasal Sınıflandırma ve Etiketleme Sistemi.' },
                { front: 'MSDS nedir?', back: 'Material Safety Data Sheet - Kimyasal maddenin tüm güvenlik bilgilerini içeren belgedir.' },
              ],
            },
            {
              id: '9-t3', title: 'Kimyanın Alt Disiplinleri',
              quizQuestions: [
                { q: 'Karbon bileşiklerini inceleyen kimya dalı hangisidir?', options: ['Anorganik kimya', 'Organik kimya', 'Fizikokimya', 'Analitik kimya'], correct: 1 },
                { q: 'Madde analizlerini yapan kimya dalı hangisidir?', options: ['Organik kimya', 'Biyokimya', 'Analitik kimya', 'Polimer kimyası'], correct: 2 },
                { q: 'Canlılardaki kimyasal süreçleri inceleyen dal hangisidir?', options: ['Biyokimya', 'Organik kimya', 'Endüstriyel kimya', 'Fizikokimya'], correct: 0 },
                { q: 'Enerji ve madde arasındaki ilişkiyi inceleyen kimya dalı hangisidir?', options: ['Analitik kimya', 'Fizikokimya', 'Organik kimya', 'Anorganik kimya'], correct: 1 },
              ],
              tfQuestions: [
                { statement: 'Organik kimya sadece canlı organizmalardan elde edilen maddeleri inceler.', answer: false },
                { statement: 'Analitik kimya, maddelerin bileşimini ve miktarını belirlemeye çalışır.', answer: true },
                { statement: 'Fizikokimya, fizik ve kimyanın kesiştiği alandır.', answer: true },
                { statement: 'Biyokimya sadece bitkilerdeki kimyasal olayları inceler.', answer: false },
              ],
              matchQuestions: [
                { left: 'Organik kimya', right: 'Karbon bileşikleri' },
                { left: 'Anorganik kimya', right: 'Metal bileşikleri' },
                { left: 'Biyokimya', right: 'Canlılardaki tepkimeler' },
                { left: 'Analitik kimya', right: 'Madde analizi' },
              ],
              fillQuestions: [
                { sentence: 'Karbon içeren bileşikleri inceleyen kimya dalına ____ kimya denir.', answer: 'organik' },
                { sentence: 'Maddenin bileşimini belirleyen kimya dalı ____ kimyadır.', answer: 'analitik' },
                { sentence: 'Canlılardaki kimyasal olayları inceleyen bilim dalı ____dır.', answer: 'biyokimya' },
              ],
              sortQuestions: [],
              flashQuestions: [
                { front: 'Organik Kimya', back: 'Karbon bileşiklerini (C-H, C-O, C-N vb.) inceleyen kimya dalıdır.' },
                { front: 'Anorganik Kimya', back: 'Karbon dışındaki elementlerin bileşiklerini ve metal komplekslerini inceler.' },
                { front: 'Fizikokimya', back: 'Kimyasal olayların fiziksel temellerini, enerji ilişkilerini ve hız mekanizmalarını inceler.' },
              ],
            },
            {
              id: '9-t4', title: 'Kimya Alanında Kariyer Olanakları',
              quizQuestions: [
                { q: 'Hangisi kimya mezununun çalışabileceği bir alan değildir?', options: ['İlaç sektörü', 'Gıda sektörü', 'Hukuk bürosu', 'Kozmetik sektörü'], correct: 2 },
                { q: 'Adli kimyager ne iş yapar?', options: ['İlaç geliştirir', 'Suç mahallindeki kimyasal delilleri inceler', 'Kozmetik üretir', 'Gıda analizi yapar'], correct: 1 },
                { q: 'Hangisi kimya ile ilgili bir meslek değildir?', options: ['Eczacı', 'Kimyager', 'Mimar', 'Biyokimyager'], correct: 2 },
              ],
              tfQuestions: [
                { statement: 'Kimya mezunları sadece laboratuvarda çalışabilir.', answer: false },
                { statement: 'İlaç sektörü, kimyagerlerin en çok istihdam edildiği alanlardan biridir.', answer: true },
                { statement: 'Çevre mühendisliğinde kimya bilgisi gerekmez.', answer: false },
              ],
              matchQuestions: [
                { left: 'Eczacı', right: 'İlaç hazırlama ve sunma' },
                { left: 'Adli kimyager', right: 'Delil analizi' },
                { left: 'Gıda kimyageri', right: 'Besin analizi ve kalite kontrol' },
                { left: 'Petrokimyager', right: 'Petrol ürünleri geliştirme' },
              ],
              fillQuestions: [
                { sentence: 'Suç mahallindeki kimyasal delilleri inceleyen uzmana ____ kimyager denir.', answer: 'adli' },
                { sentence: 'İlaç geliştirme sürecine ____ denir.', answer: 'farmasötik' },
              ],
              sortQuestions: [],
              flashQuestions: [
                { front: 'Kimyager ne yapar?', back: 'Maddelerin yapısını, özelliklerini ve tepkimelerini araştırır. Laboratuvar ve endüstride çalışır.' },
                { front: 'Biyokimyager', back: 'Canlılardaki kimyasal süreçleri inceler. Tıp, tarım ve ilaç sektöründe çalışabilir.' },
              ],
            },
          ],
        },
        {
          id: '9-u1-s2', title: '1.2 Atomdan Periyodik Tabloya',
          topics: [
            {
              id: '9-t5', title: 'Atom Teorileri ve Atomun Yapısı',
              quizQuestions: [
                { q: 'Atomun çekirdeğini keşfeden bilim insanı kimdir?', options: ['Dalton', 'Thomson', 'Rutherford', 'Bohr'], correct: 2 },
                { q: 'Thomson atom modelinin adı nedir?', options: ['Güneş sistemi modeli', 'Üzümlü kek modeli', 'Dalga modeli', 'Bulut modeli'], correct: 1 },
                { q: 'Dalton atom modeline göre atom nasıldır?', options: ['Bölünebilir', 'İçi boş', 'Bölünemez ve içi dolu küre', 'Elektron bulutu'], correct: 2 },
                { q: 'Bohr atom modelinde elektronlar nerededir?', options: ['Çekirdekte', 'Rastgele yerlerde', 'Belirli enerji düzeylerinde', 'Nötronlarla birlikte'], correct: 2 },
                { q: 'Protonun yükü nedir?', options: ['+1', '-1', '0', '+2'], correct: 0 },
                { q: 'Nötronun özelliği hangisidir?', options: ['Pozitif yüklü', 'Negatif yüklü', 'Yüksüz', 'Çekirdek dışında'], correct: 2 },
                { q: 'Bir atomdaki proton sayısı neyi belirler?', options: ['Kütle numarasını', 'Atom numarasını', 'İzotop olmasını', 'Nötron sayısını'], correct: 1 },
              ],
              tfQuestions: [
                { statement: 'Dalton modeline göre atom bölünebilir.', answer: false },
                { statement: 'Thomson, elektronu keşfeden bilim insanıdır.', answer: true },
                { statement: 'Rutherford deneyi alfa parçacıkları ile yapılmıştır.', answer: true },
                { statement: 'Proton ve nötron atomun çekirdeğinde bulunur.', answer: true },
                { statement: 'Elektronlar çekirdekte bulunur.', answer: false },
                { statement: 'Bohr modeline göre elektronlar rastgele hareket eder.', answer: false },
              ],
              matchQuestions: [
                { left: 'Dalton', right: 'Atom bölünemez bir küredir' },
                { left: 'Thomson', right: 'Üzümlü kek modeli' },
                { left: 'Rutherford', right: 'Çekirdekli atom modeli' },
                { left: 'Bohr', right: 'Enerji düzeyli model' },
              ],
              fillQuestions: [
                { sentence: 'Atomun çekirdeğinde ____ ve nötron bulunur.', answer: 'proton' },
                { sentence: 'Elektronlar çekirdeğin ____ hareket eder.', answer: 'etrafında' },
                { sentence: 'Nötr bir atomda proton sayısı ____ sayısına eşittir.', answer: 'elektron' },
                { sentence: 'Thomson atom modeline ____ kek modeli de denir.', answer: 'üzümlü' },
              ],
              sortQuestions: [
                { items: ['Dalton Modeli', 'Thomson Modeli', 'Rutherford Modeli', 'Bohr Modeli'], correctOrder: [0, 1, 2, 3] },
              ],
              flashQuestions: [
                { front: 'Proton nedir?', back: 'Çekirdekte bulunan, +1 yüke sahip taneciktir. Kütlesi ≈ 1 akb\'dir.' },
                { front: 'Nötron nedir?', back: 'Çekirdekte bulunan, yüksüz taneciktir. Kütlesi ≈ protonla aynıdır.' },
                { front: 'Elektron nedir?', back: 'Çekirdeğin etrafında hareket eden, -1 yüklü ve çok küçük kütleli taneciktir.' },
                { front: 'İzotop nedir?', back: 'Aynı proton sayısına ama farklı nötron sayısına sahip atomlardır. Örn: C-12, C-14.' },
              ],
            },
            {
              id: '9-t6', title: 'Atom Orbitalleri ve Elektron Dizilimi',
              quizQuestions: [
                { q: 's orbitalinin şekli nasıldır?', options: ['Küresel', 'Dambıl', 'Yonca yaprağı', 'Kare'], correct: 0 },
                { q: 'p orbitalinin şekli nasıldır?', options: ['Küresel', 'Dambıl (halter)', 'Düz', 'Üçgen'], correct: 1 },
                { q: '2. enerji düzeyinde en fazla kaç elektron bulunur?', options: ['2', '6', '8', '18'], correct: 2 },
                { q: 'Aufbau ilkesine göre elektronlar nasıl doldurulur?', options: ['En yüksek enerjiden başlanır', 'Rastgele doldurulur', 'En düşük enerjili orbitalden başlanır', 'Sadece s orbitaline'], correct: 2 },
                { q: 'Karbon (Z=6) atomunun elektron dizilimi hangisidir?', options: ['1s² 2s² 2p²', '1s² 2s⁴', '1s⁶', '2s² 2p⁴'], correct: 0 },
              ],
              tfQuestions: [
                { statement: 'Bir orbitalde en fazla 2 elektron bulunabilir.', answer: true },
                { statement: 'd orbitalleri 2. enerji düzeyinden itibaren başlar.', answer: false },
                { statement: 'Hund kuralına göre elektronlar önce orbitallere teker teker yerleşir.', answer: true },
                { statement: 'Pauli ilkesine göre bir orbitaldeki iki elektron aynı spine sahip olmalıdır.', answer: false },
                { statement: '3. enerji düzeyinde s, p ve d alt katmanları bulunur.', answer: true },
              ],
              matchQuestions: [
                { left: 's orbitali', right: 'Küresel şekil, 2 e⁻' },
                { left: 'p orbitali', right: 'Dambıl şekil, 6 e⁻' },
                { left: 'd orbitali', right: '5 orbital, 10 e⁻' },
                { left: 'f orbitali', right: '7 orbital, 14 e⁻' },
              ],
              fillQuestions: [
                { sentence: 'Bir orbitalde en fazla ____ elektron bulunur.', answer: '2' },
                { sentence: 'p alt katmanında ____ orbital bulunur.', answer: '3' },
                { sentence: 'Elektronlar en düşük enerjili orbitalden başlayarak doldurulur, buna ____ ilkesi denir.', answer: 'Aufbau' },
              ],
              sortQuestions: [
                { items: ['1s', '2s', '2p', '3s', '3p'], correctOrder: [0, 1, 2, 3, 4] },
              ],
              flashQuestions: [
                { front: 'Aufbau ilkesi', back: 'Elektronlar en düşük enerjili orbitalden başlayarak sırasıyla doldurulur.' },
                { front: 'Pauli dışarlama ilkesi', back: 'Bir orbitalda en fazla 2 elektron bulunabilir ve bunların spinleri zıt olmalıdır.' },
                { front: 'Hund kuralı', back: 'Eş enerjili orbitaller önce birer elektronla, aynı spinle doldurulur.' },
              ],
            },
            {
              id: '9-t7', title: 'Periyodik Tabloda Yer Bulma',
              quizQuestions: [
                { q: 'Bir elementin periyot numarası neyi gösterir?', options: ['Elektron sayısını', 'Katman sayısını', 'Proton sayısını', 'Nötron sayısını'], correct: 1 },
                { q: 'Grup numarası neyi belirler?', options: ['Toplam elektron sayısını', 'Değerlik elektron sayısını', 'Nötron sayısını', 'Kütle numarasını'], correct: 1 },
                { q: 'Sodyum (Na, Z=11) hangi periyot ve gruptadır?', options: ['2. periyot, 1A', '3. periyot, 1A', '3. periyot, 2A', '2. periyot, 7A'], correct: 1 },
                { q: 'Periyodik tabloda soldan sağa gidildikçe ne artar?', options: ['Atom yarıçapı', 'Metalik karakter', 'Atom numarası', 'Elektron kaybetme eğilimi'], correct: 2 },
                { q: '17. grup elementlerine ne ad verilir?', options: ['Alkali metaller', 'Soy gazlar', 'Halojenler', 'Toprak alkali metaller'], correct: 2 },
              ],
              tfQuestions: [
                { statement: '1A grubu elementlerine alkali metaller denir.', answer: true },
                { statement: 'Soy gazlar 17. grupta yer alır.', answer: false },
                { statement: 'Periyodik tabloda toplam 7 periyot vardır.', answer: true },
                { statement: 'Aynı gruptaki elementler benzer kimyasal özelliklere sahiptir.', answer: true },
              ],
              matchQuestions: [
                { left: '1A grubu', right: 'Alkali metaller' },
                { left: '2A grubu', right: 'Toprak alkali metaller' },
                { left: '7A grubu', right: 'Halojenler' },
                { left: '8A grubu', right: 'Soy gazlar' },
              ],
              fillQuestions: [
                { sentence: 'Periyodik tabloda aynı sırada bulunan elementler aynı ____ sahiptir.', answer: 'periyoda' },
                { sentence: 'Aynı grupta bulunan elementlerin ____ elektron sayıları aynıdır.', answer: 'değerlik' },
                { sentence: '18. grup elementlerine ____ gazlar denir.', answer: 'soy' },
              ],
              sortQuestions: [
                { items: ['Hidrojen (Z=1)', 'Lityum (Z=3)', 'Sodyum (Z=11)', 'Potasyum (Z=19)'], correctOrder: [0, 1, 2, 3] },
              ],
              flashQuestions: [
                { front: 'Alkali metaller (1A)', back: 'Li, Na, K, Rb, Cs, Fr. Çok reaktif, +1 yük yapar, su ile şiddetli tepkime verir.' },
                { front: 'Halojenler (7A)', back: 'F, Cl, Br, I, At. Ametal, -1 yük yapar, çok reaktiftir.' },
                { front: 'Soy gazlar (8A)', back: 'He, Ne, Ar, Kr, Xe, Rn. Kararlı, tepkimeye girmez, son katmanı doludur.' },
              ],
            },
            {
              id: '9-t8', title: 'Periyodik Özellikler',
              quizQuestions: [
                { q: 'Periyodik tabloda soldan sağa gidildikçe atom yarıçapı nasıl değişir?', options: ['Artar', 'Azalır', 'Değişmez', 'Önce artar sonra azalır'], correct: 1 },
                { q: 'Aynı grupta yukarıdan aşağıya iyonlaşma enerjisi nasıl değişir?', options: ['Artar', 'Azalır', 'Değişmez', 'Düzensiz değişir'], correct: 1 },
                { q: 'Elektronegatifliği en yüksek element hangisidir?', options: ['Oksijen', 'Flor', 'Klor', 'Azot'], correct: 1 },
                { q: 'Atom yarıçapı en büyük olan element hangisidir?', options: ['Li', 'Na', 'K', 'F'], correct: 2 },
                { q: 'Metalik karakter periyodik tabloda nasıl değişir?', options: ['Soldan sağa artar', 'Yukarıdan aşağıya azalır', 'Sol alt köşeye doğru artar', 'Sağ üst köşeye doğru artar'], correct: 2 },
              ],
              tfQuestions: [
                { statement: 'Atom yarıçapı aynı periyotta soldan sağa doğru artar.', answer: false },
                { statement: 'İyonlaşma enerjisi yüksek olan atomlar elektronlarını kolay kaybeder.', answer: false },
                { statement: 'Elektronegatiflik, atomun bağ elektronlarını çekme gücüdür.', answer: true },
                { statement: 'Flor, periyodik tabloda en elektronegatif elementtir.', answer: true },
                { statement: 'Metalik karakter sağa doğru artar.', answer: false },
              ],
              matchQuestions: [
                { left: 'Atom yarıçapı', right: 'Aynı grupta aşağı doğru artar' },
                { left: 'İyonlaşma enerjisi', right: 'Aynı periyotta sağa doğru artar' },
                { left: 'Elektronegatiflik', right: 'En yüksek F elementinde' },
                { left: 'Metalik karakter', right: 'Sol alt köşeye doğru artar' },
              ],
              fillQuestions: [
                { sentence: 'Bir atomdan elektron koparmak için gereken minimum enerjiye ____ enerjisi denir.', answer: 'iyonlaşma' },
                { sentence: 'Periyodik tabloda en elektronegatif element ____dur.', answer: 'flor' },
                { sentence: 'Atom yarıçapı aynı grupta yukarıdan aşağıya ____.', answer: 'artar' },
              ],
              sortQuestions: [
                { items: ['F (en yüksek EN)', 'O', 'N', 'C (en düşük EN)'], correctOrder: [0, 1, 2, 3] },
              ],
              flashQuestions: [
                { front: 'İyonlaşma enerjisi', back: 'Gaz halindeki bir atomdan 1 elektron koparmak için gereken minimum enerji. IE arttıkça elektron koparmak zorlaşır.' },
                { front: 'Elektronegatiflik', back: 'Bir atomun bağ elektronlarını kendine çekme gücü. En yüksek F\'de (3.98), soy gazlarda tanımsızdır.' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '9-u2', title: '2. Ünite: Çeşitlilik',
      subUnits: [
        {
          id: '9-u2-s1', title: '2.1 Etkileşimler (Kimyasal Bağlar)',
          topics: [
            {
              id: '9-t9', title: 'Metalik Bağ',
              quizQuestions: [
                { q: 'Metalik bağ nasıl oluşur?', options: ['Elektron transferi ile', 'Elektron ortaklaşması ile', 'Değerlik elektronlarının ortaklaşa paylaşılması ile', 'Proton paylaşımı ile'], correct: 2 },
                { q: 'Metallerin elektrik iletkenliğinin nedeni nedir?', options: ['Sert olmaları', 'Serbest elektronları', 'Yüksek erime noktası', 'Kristal yapıları'], correct: 1 },
                { q: 'Hangisi metalik bağın bir özelliği değildir?', options: ['Elektrik iletkenliği', 'Tel ve levha haline gelme', 'Kırılganlık', 'Isı iletkenliği'], correct: 2 },
              ],
              tfQuestions: [
                { statement: 'Metalik bağda elektronlar belirli atomlara ait değildir, serbestçe hareket eder.', answer: true },
                { statement: 'Metalik bağ sadece iki atom arasında oluşur.', answer: false },
                { statement: 'Metallerin dövülebilir olmasının sebebi metalik bağdır.', answer: true },
              ],
              matchQuestions: [
                { left: 'Elektron denizi', right: 'Serbest elektronlar metali sarar' },
                { left: 'İletkenlik', right: 'Serbest elektronların hareketi' },
                { left: 'Dövülebilirlik', right: 'Katmanların kayabilmesi' },
                { left: 'Parlaklık', right: 'Elektronların ışığı yansıtması' },
              ],
              fillQuestions: [
                { sentence: 'Metalik bağda değerlik elektronları ____ hareket eder.', answer: 'serbestçe' },
                { sentence: 'Metallerin parlak olmasının sebebi serbest elektronların ____ yansıtmasıdır.', answer: 'ışığı' },
              ],
              sortQuestions: [],
              flashQuestions: [
                { front: 'Metalik bağ', back: 'Metal atomlarının değerlik elektronlarını ortaklaşa paylaşarak oluşturduğu bağdır. Elektron denizi modeliyle açıklanır.' },
                { front: 'Alaşım nedir?', back: 'İki veya daha fazla metalin karıştırılmasıyla elde edilen malzemedir. Örn: Çelik (Fe+C), Pirinç (Cu+Zn).' },
              ],
            },
            {
              id: '9-t10', title: 'İyonik Bağ',
              quizQuestions: [
                { q: 'İyonik bağ hangi tür atomlar arasında oluşur?', options: ['İki ametal', 'İki metal', 'Metal ve ametal', 'İki soy gaz'], correct: 2 },
                { q: 'NaCl bileşiğinde hangi tür bağ vardır?', options: ['Kovalent', 'Metalik', 'İyonik', 'Hidrojen'], correct: 2 },
                { q: 'İyonik bileşiklerin genel özelliği hangisidir?', options: ['Düşük erime noktası', 'Suda çözününce iletken', 'Gaz halde bulunma', 'Yumuşak yapı'], correct: 1 },
                { q: 'Na atomu Na⁺ iyonuna dönüşürken ne olur?', options: ['Elektron kazanır', '1 elektron kaybeder', 'Proton kazanır', 'Nötron kaybeder'], correct: 1 },
              ],
              tfQuestions: [
                { statement: 'İyonik bileşikler katı halde elektrik iletir.', answer: false },
                { statement: 'İyonik bağda elektron transferi gerçekleşir.', answer: true },
                { statement: 'İyonik bileşiklerin erime noktası genellikle yüksektir.', answer: true },
                { statement: 'MgO bileşiğinde iyonik bağ vardır.', answer: true },
              ],
              matchQuestions: [
                { left: 'NaCl', right: 'Sodyum klorür (yemek tuzu)' },
                { left: 'MgO', right: 'Magnezyum oksit' },
                { left: 'CaCl₂', right: 'Kalsiyum klorür' },
                { left: 'KBr', right: 'Potasyum bromür' },
              ],
              fillQuestions: [
                { sentence: 'İyonik bağda metal atomu elektron ____ ve katyon oluşur.', answer: 'kaybeder' },
                { sentence: 'İyonik bağda ametal atomu elektron ____ ve anyon oluşur.', answer: 'kazanır' },
                { sentence: 'NaCl\'nin sulu çözeltisi elektrik akımını ____.', answer: 'iletir' },
              ],
              sortQuestions: [],
              flashQuestions: [
                { front: 'Katyon nedir?', back: 'Elektron kaybeden atomun oluşturduğu pozitif (+) yüklü iyondur. Örn: Na⁺, Ca²⁺' },
                { front: 'Anyon nedir?', back: 'Elektron kazanan atomun oluşturduğu negatif (-) yüklü iyondur. Örn: Cl⁻, O²⁻' },
              ],
            },
            {
              id: '9-t11', title: 'Kovalent Bağ',
              quizQuestions: [
                { q: 'Kovalent bağ nasıl oluşur?', options: ['Elektron transferi ile', 'Elektron ortaklaşa paylaşılması ile', 'Proton paylaşımı ile', 'İyon çekim kuvveti ile'], correct: 1 },
                { q: 'H₂O molekülünde kaç kovalent bağ vardır?', options: ['1', '2', '3', '4'], correct: 1 },
                { q: 'N₂ molekülünde hangi tür kovalent bağ bulunur?', options: ['Tekli', 'İkili', 'Üçlü', 'Metalik'], correct: 2 },
                { q: 'Apolar kovalent bağ ne zaman oluşur?', options: ['Farklı ametaller arasında', 'Aynı ametaller arasında', 'Metal ve ametal arasında', 'İyon ve atom arasında'], correct: 1 },
              ],
              tfQuestions: [
                { statement: 'Kovalent bağ iki ametal arasında oluşur.', answer: true },
                { statement: 'O₂ molekülünde tekli kovalent bağ vardır.', answer: false },
                { statement: 'H-Cl bağı polar kovalent bağdır.', answer: true },
                { statement: 'Kovalent bileşikler genellikle düşük erime noktasına sahiptir.', answer: true },
              ],
              matchQuestions: [
                { left: 'H₂', right: 'Apolar kovalent, tekli bağ' },
                { left: 'O₂', right: 'Apolar kovalent, ikili bağ' },
                { left: 'N₂', right: 'Apolar kovalent, üçlü bağ' },
                { left: 'HCl', right: 'Polar kovalent bağ' },
              ],
              fillQuestions: [
                { sentence: 'Aynı iki ametal arasındaki bağa ____ kovalent bağ denir.', answer: 'apolar' },
                { sentence: 'N₂ molekülünde ____ kovalent bağ vardır.', answer: 'üçlü' },
                { sentence: 'Kovalent bağda atomlar ____ paylaşır.', answer: 'elektron' },
              ],
              sortQuestions: [
                { items: ['Tekli bağ (en zayıf)', 'İkili bağ', 'Üçlü bağ (en güçlü)'], correctOrder: [0, 1, 2] },
              ],
              flashQuestions: [
                { front: 'Polar kovalent bağ', back: 'Farklı ametaller arasında elektronların eşit paylaşılmadığı bağdır. Elektronegatiflik farkı vardır.' },
                { front: 'Apolar kovalent bağ', back: 'Aynı ametaller arasında elektronların eşit paylaşıldığı bağdır. Elektronegatiflik farkı yoktur.' },
              ],
            },
            {
              id: '9-t12', title: 'Lewis Nokta Yapısı',
              quizQuestions: [
                { q: 'Lewis yapısında noktalar neyi temsil eder?', options: ['Protonları', 'Nötronları', 'Değerlik elektronlarını', 'Tüm elektronları'], correct: 2 },
                { q: 'Oksijen atomunun Lewis yapısında kaç nokta bulunur?', options: ['2', '4', '6', '8'], correct: 2 },
                { q: 'Bağ yapan elektron çiftine ne ad verilir?', options: ['Ortaklanmamış çift', 'Bağ çifti', 'Serbest çift', 'Yalnız çift'], correct: 1 },
              ],
              tfQuestions: [
                { statement: 'Lewis yapısında sadece değerlik elektronları gösterilir.', answer: true },
                { statement: 'Hidrojenin Lewis yapısında 2 nokta bulunur.', answer: false },
                { statement: 'Ortaklanmamış elektron çiftleri bağ yapmaz.', answer: true },
              ],
              matchQuestions: [
                { left: 'H', right: '1 değerlik elektronu' },
                { left: 'O', right: '6 değerlik elektronu' },
                { left: 'N', right: '5 değerlik elektronu' },
                { left: 'C', right: '4 değerlik elektronu' },
              ],
              fillQuestions: [
                { sentence: 'Lewis yapısında ____ elektronlar noktalarla gösterilir.', answer: 'değerlik' },
                { sentence: 'Bağ yapmayan elektron çiftlerine ____ elektron çifti denir.', answer: 'ortaklanmamış' },
              ],
              sortQuestions: [],
              flashQuestions: [
                { front: 'Lewis yapısı nasıl çizilir?', back: '1) Değerlik elektron sayısını bul. 2) Merkez atomu belirle. 3) Bağları çiz. 4) Kalan elektronları yalnız çift olarak yerleştir. 5) Oktet kuralını kontrol et.' },
              ],
            },
            {
              id: '9-t13', title: 'Molekül Polarlığı',
              quizQuestions: [
                { q: 'Polar molekül ne demektir?', options: ['Simetrik yapılı', 'Yük dağılımı eşit olmayan', 'Yüksüz', 'Metal içeren'], correct: 1 },
                { q: 'Hangisi polar bir moleküldür?', options: ['CO₂', 'H₂O', 'CH₄', 'O₂'], correct: 1 },
                { q: 'CO₂ neden apolar bir moleküldür?', options: ['Karbon ametaldir', 'Doğrusal ve simetriktir', 'Üçlü bağ içerir', 'Gaz halindedir'], correct: 1 },
              ],
              tfQuestions: [
                { statement: 'Simetrik moleküller genellikle apolardır.', answer: true },
                { statement: 'H₂O polar bir moleküldür.', answer: true },
                { statement: 'Tüm kovalent bileşikler polardır.', answer: false },
              ],
              matchQuestions: [
                { left: 'H₂O', right: 'Polar molekül' },
                { left: 'CO₂', right: 'Apolar molekül' },
                { left: 'NH₃', right: 'Polar molekül' },
                { left: 'CH₄', right: 'Apolar molekül' },
              ],
              fillQuestions: [
                { sentence: 'H₂O molekülü ____ bir moleküldür çünkü geometrisi V şeklindedir.', answer: 'polar' },
                { sentence: 'CO₂ doğrusal ve simetrik olduğu için ____ bir moleküldür.', answer: 'apolar' },
              ],
              sortQuestions: [],
              flashQuestions: [
                { front: 'Polar molekül', back: 'Yük dağılımı asimetrik olan, bir ucu kısmi pozitif diğer ucu kısmi negatif yüklü moleküldür.' },
                { front: 'Apolar molekül', back: 'Yük dağılımı simetrik olan, net dipol momenti sıfır olan moleküldür.' },
              ],
            },
            {
              id: '9-t14', title: 'Bileşiklerin Adlandırılması',
              quizQuestions: [
                { q: 'NaCl bileşiğinin adı nedir?', options: ['Sodyum klorit', 'Sodyum klorür', 'Sodyum klorat', 'Klor sodyum'], correct: 1 },
                { q: 'Fe₂O₃ bileşiğinin adı nedir?', options: ['Demir oksit', 'Demir(III) oksit', 'Demir(II) oksit', 'Difemir oksit'], correct: 1 },
                { q: 'CO₂ bileşiğinin IUPAC adı nedir?', options: ['Karbon oksit', 'Karbon dioksit', 'Dikarbon oksit', 'Karbon monoksit'], correct: 1 },
              ],
              tfQuestions: [
                { statement: 'İyonik bileşiklerde önce metalin adı yazılır.', answer: true },
                { statement: 'H₂SO₄\'ün yaygın adı sülfürik asittir.', answer: true },
                { statement: 'CO bileşiğinin adı karbon dioksittir.', answer: false },
              ],
              matchQuestions: [
                { left: 'NaCl', right: 'Sodyum klorür' },
                { left: 'H₂O', right: 'Su (Dihidrojen monoksit)' },
                { left: 'CO₂', right: 'Karbon dioksit' },
                { left: 'CaCO₃', right: 'Kalsiyum karbonat' },
              ],
              fillQuestions: [
                { sentence: 'NaCl bileşiğinin günlük hayattaki adı ____ tuzudur.', answer: 'yemek' },
                { sentence: 'H₂SO₄ bileşiğinin adı ____ asittir.', answer: 'sülfürik' },
              ],
              sortQuestions: [],
              flashQuestions: [
                { front: 'İyonik bileşik adlandırma', back: 'Önce metal (katyon) adı, sonra ametal (anyon) adı yazılır. Ametal sonuna -ür eki eklenir. Örn: NaCl → Sodyum klorür.' },
              ],
            },
          ],
        },
        {
          id: '9-u2-s2', title: '2.2 Etkileşimden Maddeye',
          topics: [
            {
              id: '9-t15', title: 'Moleküller Arası Etkileşimler',
              quizQuestions: [
                { q: 'En güçlü moleküller arası etkileşim hangisidir?', options: ['London kuvvetleri', 'Dipol-dipol', 'Hidrojen bağı', 'İyon-dipol'], correct: 2 },
                { q: 'Suyun kaynama noktasının beklenenden yüksek olmasının sebebi nedir?', options: ['London kuvvetleri', 'Kovalent bağ', 'Hidrojen bağı', 'İyonik bağ'], correct: 2 },
                { q: 'London kuvvetleri hangi tür moleküllerde görülür?', options: ['Sadece polar', 'Sadece apolar', 'Tüm moleküllerde', 'Sadece iyonik'], correct: 2 },
                { q: 'Hangisinde hidrojen bağı oluşmaz?', options: ['H₂O', 'HF', 'NH₃', 'CH₄'], correct: 3 },
              ],
              tfQuestions: [
                { statement: 'Hidrojen bağı, H ile F, O veya N arasında oluşur.', answer: true },
                { statement: 'London kuvvetleri sadece apolar moleküllerde görülür.', answer: false },
                { statement: 'Moleküller arası etkileşimler arttıkça kaynama noktası artar.', answer: true },
                { statement: 'Dipol-dipol etkileşimi apolar moleküllerde görülür.', answer: false },
              ],
              matchQuestions: [
                { left: 'London kuvvetleri', right: 'En zayıf, tüm moleküllerde' },
                { left: 'Dipol-dipol', right: 'Polar moleküller arası' },
                { left: 'Hidrojen bağı', right: 'H ile F, O, N arası' },
                { left: 'İyon-dipol', right: 'İyon ve polar molekül arası' },
              ],
              fillQuestions: [
                { sentence: 'Suyun yüksek kaynama noktasının sebebi ____ bağıdır.', answer: 'hidrojen' },
                { sentence: 'Apolar moleküller arasındaki çekim kuvvetine ____ kuvvetleri denir.', answer: 'London' },
                { sentence: 'Polar moleküller arasındaki etkileşime ____-dipol etkileşimi denir.', answer: 'dipol' },
              ],
              sortQuestions: [
                { items: ['London kuvvetleri (en zayıf)', 'Dipol-dipol etkileşimi', 'Hidrojen bağı (en güçlü)'], correctOrder: [0, 1, 2] },
              ],
              flashQuestions: [
                { front: 'Hidrojen bağı', back: 'Hidrojenin F, O veya N\'ye bağlı olduğu durumlarda oluşan güçlü bir moleküller arası etkileşimdir. Suyun yüksek kaynama noktasının sebebidir.' },
                { front: 'Van der Waals kuvvetleri', back: 'London kuvvetleri ve dipol-dipol etkileşimlerinin genel adıdır. Tüm moleküllerde bulunur.' },
              ],
            },
            {
              id: '9-t16', title: 'Katılar ve Özellikleri',
              quizQuestions: [
                { q: 'Kristal katıların özelliği hangisidir?', options: ['Düzensiz iç yapı', 'Düzenli iç yapı', 'Belirli erime noktası yok', 'Amorf yapı'], correct: 1 },
                { q: 'Hangisi amorf katılara örnektir?', options: ['NaCl', 'Buz', 'Cam', 'Elmas'], correct: 2 },
                { q: 'Elmas hangi tür kristal yapıya sahiptir?', options: ['İyonik', 'Moleküler', 'Kovalent ağ', 'Metalik'], correct: 2 },
              ],
              tfQuestions: [
                { statement: 'Kristal katıların belirli erime noktası vardır.', answer: true },
                { statement: 'Cam kristal bir katıdır.', answer: false },
                { statement: 'NaCl kristal yapıda bir iyonik katıdır.', answer: true },
              ],
              matchQuestions: [
                { left: 'İyonik kristal', right: 'NaCl, sert ve kırılgan' },
                { left: 'Kovalent ağ kristal', right: 'Elmas, çok sert' },
                { left: 'Metalik kristal', right: 'Bakır, iletken' },
                { left: 'Amorf katı', right: 'Cam, düzensiz yapı' },
              ],
              fillQuestions: [
                { sentence: 'Düzenli iç yapıya sahip katılara ____ katı denir.', answer: 'kristal' },
                { sentence: 'Cam, ____ katılara bir örnektir.', answer: 'amorf' },
              ],
              sortQuestions: [],
              flashQuestions: [
                { front: 'Kristal katı', back: 'Tanecikleri düzenli bir geometrik yapıda dizilmiş katıdır. Belirli erime noktası vardır.' },
                { front: 'Amorf katı', back: 'Tanecikleri düzensiz dizilmiş, belirli erime noktası olmayan katıdır. Örn: cam, plastik.' },
              ],
            },
            {
              id: '9-t17', title: 'Sıvılar ve Özellikleri',
              quizQuestions: [
                { q: 'Yüzey gerilimi ne demektir?', options: ['Sıvının akma hızı', 'Sıvı yüzeyinin gerilmiş zar gibi davranması', 'Sıvının buharlaşması', 'Sıvının yoğunluğu'], correct: 1 },
                { q: 'Viskozite yüksek olan sıvılar nasıl akar?', options: ['Hızlı', 'Yavaş', 'Normal', 'Akmaz'], correct: 1 },
                { q: 'Hangisi yüzey gerilimini artırır?', options: ['Deterjan eklemek', 'Sıcaklığı artırmak', 'Hidrojen bağlarının güçlü olması', 'Tuz eklemek'], correct: 2 },
              ],
              tfQuestions: [
                { statement: 'Sıcaklık arttıkça viskozite azalır.', answer: true },
                { statement: 'Su damlasının küresel olmasının sebebi yüzey gerilimidir.', answer: true },
                { statement: 'Deterjan yüzey gerilimini artırır.', answer: false },
              ],
              matchQuestions: [
                { left: 'Yüzey gerilimi', right: 'Yüzeyin gerilmiş zar gibi davranması' },
                { left: 'Viskozite', right: 'Akışa karşı direnç' },
                { left: 'Buhar basıncı', right: 'Buharın uyguladığı basınç' },
                { left: 'Kapilarite', right: 'Sıvının dar boruda yükselmesi' },
              ],
              fillQuestions: [
                { sentence: 'Sıvıların akışa karşı gösterdiği dirence ____ denir.', answer: 'viskozite' },
                { sentence: 'Suyun dar borularda yükselmesine ____ denir.', answer: 'kapilarite' },
              ],
              sortQuestions: [],
              flashQuestions: [
                { front: 'Yüzey gerilimi', back: 'Sıvı yüzeyindeki moleküllerin içe doğru çekilmesiyle yüzeyin gerilmiş bir zar gibi davranmasıdır.' },
                { front: 'Viskozite', back: 'Sıvının akışa karşı gösterdiği dirençtir. Bal > su > alkol sıralamasında viskozite azalır.' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '9-u3', title: '3. Ünite: Sürdürülebilirlik',
      subUnits: [
        {
          id: '9-u3-s1', title: '3.1 Nanoparçacıklar ve Sürdürülebilirlik',
          topics: [
            {
              id: '9-t18', title: 'Nanoparçacıklar ve Yeşil Kimya',
              quizQuestions: [
                { q: '1 nanometre kaç metredir?', options: ['10⁻⁶ m', '10⁻⁹ m', '10⁻¹² m', '10⁻³ m'], correct: 1 },
                { q: 'Yeşil kimyanın temel amacı nedir?', options: ['Daha çok üretim', 'Çevreye zararsız kimya', 'Daha ucuz malzeme', 'Daha hızlı tepkime'], correct: 1 },
                { q: 'Nanoparçacıkların boyutu hangi aralıktadır?', options: ['1-10 mm', '1-100 nm', '1-10 cm', '1-100 μm'], correct: 1 },
                { q: 'Hangisi yeşil kimya ilkelerinden biridir?', options: ['Atık önleme', 'Maksimum üretim', 'Ucuz hammadde', 'Hızlı tüketim'], correct: 0 },
              ],
              tfQuestions: [
                { statement: 'Nanoparçacıklar çıplak gözle görülebilir.', answer: false },
                { statement: 'Yeşil kimya, kimyasal süreçlerde atığı en aza indirmeyi hedefler.', answer: true },
                { statement: 'Nanoparçacıklar yüzey alanı/hacim oranı düşük maddelerdir.', answer: false },
                { statement: 'Gümüş nanoparçacıklar antibakteriyel özellik gösterir.', answer: true },
              ],
              matchQuestions: [
                { left: 'Nanometre', right: '10⁻⁹ metre' },
                { left: 'Yeşil kimya', right: 'Çevreci kimyasal süreçler' },
                { left: 'Atom ekonomisi', right: 'Minimum atık, maksimum ürün' },
                { left: 'Nanoparçacık', right: '1-100 nm boyutlu tanecik' },
              ],
              fillQuestions: [
                { sentence: 'Nanoparçacıkların boyutu 1-100 ____ arasındadır.', answer: 'nanometre' },
                { sentence: 'Yeşil kimyanın 12 temel ____ vardır.', answer: 'ilkesi' },
                { sentence: 'Nanoparçacıkların yüzey alanı/hacim oranı ____.', answer: 'yüksektir' },
              ],
              sortQuestions: [
                { items: ['Atom (0.1 nm)', 'Nanoparçacık (1-100 nm)', 'Hücre (10 μm)', 'Karınca (1 mm)'], correctOrder: [0, 1, 2, 3] },
              ],
              flashQuestions: [
                { front: 'Nanoparçacık nedir?', back: '1-100 nanometre boyutundaki malzemedir. Yüzey alanı/hacim oranı çok yüksek olduğundan farklı özellikler gösterir.' },
                { front: 'Yeşil kimya nedir?', back: 'Kimyasal ürün ve süreçlerin çevreye zararsız olacak şekilde tasarlanmasıdır. 12 temel ilkesi vardır.' },
                { front: 'Atom ekonomisi', back: 'Tepkimeye giren atomların ne kadarının ürüne dönüştüğünü gösteren kavramdır. Yüksek atom ekonomisi = az atık.' },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// ============ 10. SINIF ============
export const grade10Data: GradeData = {
  grade: 10,
  description: '10. sınıf kimya dersi, kimyanın nicel yönünü öğreneceğiniz, hesaplama ve problem çözme becerilerinizi geliştireceğiniz bir derstir. Tepkimeler, mol kavramı, gazlar ve çözeltiler bu yılın temel konularıdır.',
  learnItems: [
    'Kimyasal tepkimelerin çeşitlerini (sentez, ayrışma, yanma, yer değiştirme, çökelme, redoks, asit-baz) tanıyacak ve tepkimeleri denkleştirebileceksiniz.',
    'Mol kavramını öğrenecek, Avogadro sayısı ile madde miktarı hesaplamaları yapabileceksiniz. Mol-kütle-hacim-taneciksayısı dönüşümlerinde ustalaşacaksınız.',
    'Gaz yasalarını (Boyle, Charles, Gay-Lussac, Avogadro) öğrenecek ve ideal gaz denklemi (PV=nRT) ile problemler çözebileceksiniz.',
    'Gazların kinetik moleküler teorisini, efüzyon ve difüzyon kavramlarını, Graham yasasını anlayacaksınız.',
    'Çözeltilerin oluşumunu, çözünürlüğe etki eden faktörleri, derişim birimlerini (molarite, ppm) ve koligatif özellikleri (kaynama noktası yükselmesi, donma noktası düşmesi) öğreneceksiniz.',
    'Yeşil kimya, atom ekonomisi ve mikro ölçekli deneylerle sürdürülebilir kimyayı keşfedeceksiniz.',
  ],
  formulas: [
    { id: 'f10-1', name: 'Mol Sayısı', formula: 'n = m / M', description: 'n: mol sayısı, m: kütle (g), M: mol kütlesi (g/mol). Bir maddenin gram cinsinden kütlesini mol kütlesine bölerek mol sayısını buluruz.', category: 'Stokiyometri' },
    { id: 'f10-2', name: 'Avogadro Sayısı', formula: 'N = n × 6.022×10²³', description: 'N: tanecik sayısı, n: mol sayısı. 1 mol maddede 6.022×10²³ tanecik (atom, molekül, iyon) bulunur.', category: 'Stokiyometri' },
    { id: 'f10-3', name: 'İdeal Gaz Denklemi', formula: 'PV = nRT', description: 'P: basınç (atm), V: hacim (L), n: mol, R: 0.082 L·atm/mol·K, T: sıcaklık (K). İdeal gazların davranışını tanımlar.', category: 'Gazlar' },
    { id: 'f10-4', name: 'Boyle Yasası', formula: 'P₁V₁ = P₂V₂', description: 'Sabit sıcaklıkta bir gazın basıncı artarsa hacmi azalır. Basınç × Hacim = Sabit.', category: 'Gazlar' },
    { id: 'f10-5', name: 'Charles Yasası', formula: 'V₁/T₁ = V₂/T₂', description: 'Sabit basınçta bir gazın sıcaklığı artarsa hacmi de artar. Hacim/Sıcaklık = Sabit.', category: 'Gazlar' },
    { id: 'f10-6', name: 'Gay-Lussac Yasası', formula: 'P₁/T₁ = P₂/T₂', description: 'Sabit hacimde bir gazın sıcaklığı artarsa basıncı da artar. Basınç/Sıcaklık = Sabit.', category: 'Gazlar' },
    { id: 'f10-7', name: 'Molarite', formula: 'CM = n / V', description: 'CM: molar derişim (mol/L), n: çözünen mol sayısı, V: çözelti hacmi (L). Birim hacimde çözünen mol sayısıdır.', category: 'Çözeltiler' },
    { id: 'f10-8', name: 'Kütlece Yüzde', formula: '% = (mçözünen/mçözelti)×100', description: '100 gram çözeltideki çözünen madde gram miktarıdır.', category: 'Çözeltiler' },
    { id: 'f10-9', name: 'Graham Yasası', formula: 'r₁/r₂ = √(M₂/M₁)', description: 'Gazların yayılma hızı mol kütlesinin kareköküyle ters orantılıdır. Hafif gaz daha hızlı yayılır.', category: 'Gazlar' },
    { id: 'f10-10', name: 'Kaynama N. Yükselmesi', formula: 'ΔTb = Kb × m × i', description: 'Çözeltinin kaynama noktası saf çözücüye göre yükselir. Kb: ebülyoskopik sabit, m: molalite, i: van\'t Hoff faktörü.', category: 'Çözeltiler' },
    { id: 'f10-11', name: 'Donma N. Düşmesi', formula: 'ΔTf = Kf × m × i', description: 'Çözeltinin donma noktası saf çözücüye göre düşer. Kf: kriyoskopik sabit.', category: 'Çözeltiler' },
    { id: 'f10-12', name: 'NKS\'de Hacim', formula: 'V = n × 22.4 L', description: 'Normal koşullarda (0°C, 1 atm) 1 mol ideal gazın hacmi 22.4 litredir.', category: 'Gazlar' },
  ],
  units: [
    {
      id: '10-u1', title: '1. Ünite: Kimyasal Tepkimeler',
      subUnits: [{
        id: '10-u1-s1', title: '1.1 Tepkime Çeşitleri',
        topics: [{
          id: '10-t1', title: 'Tepkime Çeşitleri ve Denkleştirme',
          quizQuestions: [
            { q: 'Sentez (birleşme) tepkimesi hangisidir?', options: ['2H₂ + O₂ → 2H₂O', 'CaCO₃ → CaO + CO₂', 'Zn + CuSO₄ → ZnSO₄ + Cu', 'CH₄ + 2O₂ → CO₂ + 2H₂O'], correct: 0 },
            { q: 'CaCO₃ → CaO + CO₂ tepkimesi hangi türdedir?', options: ['Sentez', 'Ayrışma', 'Yanma', 'Yer değiştirme'], correct: 1 },
            { q: 'Yanma tepkimesinin ürünleri genellikle nedir?', options: ['Metal + gaz', 'CO₂ + H₂O', 'Asit + tuz', 'O₂ + N₂'], correct: 1 },
            { q: 'Fe₂O₃ + 3CO → 2Fe + 3CO₂ tepkimesinde CO ne yapmıştır?', options: ['Yükseltgenmiş', 'İndirgenmiş', 'Değişmemiş', 'Çökelmiş'], correct: 0 },
            { q: 'Kimyasal denklemde ok (→) ne anlama gelir?', options: ['Eşittir', 'Tepkime yönü (verir)', 'Toplama', 'Çıkarma'], correct: 1 },
          ],
          tfQuestions: [
            { statement: 'Yanma tepkimesinde her zaman oksijen gerekir.', answer: true },
            { statement: 'Ayrışma tepkimesinde bir bileşik bileşenlerine ayrılır.', answer: true },
            { statement: 'Denkleştirmede atom sayıları eşit olmalıdır.', answer: true },
            { statement: 'Sentez tepkimesinde her zaman iki ürün oluşur.', answer: false },
          ],
          matchQuestions: [
            { left: 'Sentez', right: 'A + B → AB' },
            { left: 'Ayrışma', right: 'AB → A + B' },
            { left: 'Yer değiştirme', right: 'A + BC → AC + B' },
            { left: 'Yanma', right: 'Yakıt + O₂ → CO₂ + H₂O' },
          ],
          fillQuestions: [
            { sentence: 'İki veya daha fazla maddenin birleşerek tek bir ürün oluşturmasına ____ tepkimesi denir.', answer: 'sentez' },
            { sentence: 'Bir bileşiğin bileşenlerine ayrılmasına ____ tepkimesi denir.', answer: 'ayrışma' },
            { sentence: 'Kimyasal denklemlerde her iki taraftaki ____ sayıları eşit olmalıdır.', answer: 'atom' },
          ],
          sortQuestions: [
            { items: ['Tepkenleri belirle', 'Ürünleri belirle', 'Denklemi yaz', 'Katsayılarla denkleştir'], correctOrder: [0, 1, 2, 3] },
          ],
          flashQuestions: [
            { front: 'Redoks tepkimesi', back: 'Elektron alışverişi olan tepkimedir. Yükseltgenen: e⁻ kaybeder. İndirgenen: e⁻ kazanır.' },
            { front: 'Kütle korunumu yasası', back: 'Kimyasal tepkimelerde toplam kütle korunur. Giren maddelerin kütlesi = çıkan maddelerin kütlesi.' },
          ],
        }],
      }],
    },
    {
      id: '10-u2', title: '2. Ünite: Stokiyometri',
      subUnits: [{
        id: '10-u2-s1', title: '2.1 Mol ve Hesaplamalar',
        topics: [{
          id: '10-t5', title: 'Mol Kavramı',
          quizQuestions: [
            { q: '1 mol suda kaç tane H₂O molekülü vardır?', options: ['6.022×10²²', '6.022×10²³', '3.011×10²³', '12.044×10²³'], correct: 1 },
            { q: '32 g O₂ gazı kaç moldür? (O=16)', options: ['0.5 mol', '1 mol', '2 mol', '16 mol'], correct: 1 },
            { q: '2 mol H₂O\'nun kütlesi kaç gramdır? (H=1, O=16)', options: ['18 g', '36 g', '54 g', '9 g'], correct: 1 },
            { q: 'NKS\'de 1 mol gazın hacmi kaç litredir?', options: ['11.2 L', '22.4 L', '44.8 L', '5.6 L'], correct: 1 },
            { q: 'Avogadro sayısı nedir?', options: ['6.022×10²³', '3.14×10⁸', '1.602×10⁻¹⁹', '9.109×10⁻³¹'], correct: 0 },
          ],
          tfQuestions: [
            { statement: '1 mol C atomu 12 gramdır.', answer: true },
            { statement: '1 mol gazın NKS\'de hacmi her zaman 22.4 litredir.', answer: true },
            { statement: 'Mol sayısı birimisiz bir büyüklüktür.', answer: false },
            { statement: 'Avogadro sayısı 6.022×10²⁴ dür.', answer: false },
          ],
          matchQuestions: [
            { left: '1 mol H₂O', right: '18 gram' },
            { left: '1 mol CO₂', right: '44 gram' },
            { left: '1 mol NaCl', right: '58.5 gram' },
            { left: '1 mol O₂', right: '32 gram' },
          ],
          fillQuestions: [
            { sentence: '1 mol maddede ____ tane tanecik bulunur.', answer: '6.022×10²³' },
            { sentence: 'Mol kütlesi birimi ____ dır.', answer: 'g/mol' },
            { sentence: 'NKS\'de 1 mol ideal gazın hacmi ____ litredir.', answer: '22.4' },
          ],
          sortQuestions: [],
          flashQuestions: [
            { front: 'Mol nedir?', back: '6.022×10²³ adet tanecik (atom, molekül, iyon) içeren madde miktarı birimidir.' },
            { front: 'Mol kütlesi', back: '1 mol maddenin gram cinsinden kütlesidir. Periyodik tablodaki atom kütlesi sayısal olarak mol kütlesine eşittir.' },
          ],
        }],
      }],
    },
    {
      id: '10-u3', title: '3. Ünite: Gazlar',
      subUnits: [{
        id: '10-u3-s1', title: '3.1 Gaz Yasaları',
        topics: [{
          id: '10-t9', title: 'Gaz Yasaları ve İdeal Gaz',
          quizQuestions: [
            { q: 'Boyle yasasına göre sabit sıcaklıkta basınç 2 katına çıkarsa hacim ne olur?', options: ['2 katına çıkar', 'Yarıya düşer', 'Değişmez', '4 katına çıkar'], correct: 1 },
            { q: 'Charles yasası hangi değişkenler arasındadır?', options: ['P ve V', 'V ve T', 'P ve T', 'V ve n'], correct: 1 },
            { q: 'PV=nRT denkleminde R neyi temsil eder?', options: ['Basınç', 'Gaz sabiti', 'Sıcaklık', 'Mol sayısı'], correct: 1 },
            { q: 'Mutlak sıfır kaç Kelvin\'dir?', options: ['0 K', '-273 K', '273 K', '-100 K'], correct: 0 },
            { q: '0°C kaç Kelvin\'dir?', options: ['0 K', '100 K', '273 K', '373 K'], correct: 2 },
          ],
          tfQuestions: [
            { statement: 'İdeal gaz yasası yüksek basınç ve düşük sıcaklıkta daha iyi çalışır.', answer: false },
            { statement: 'Boyle yasasında sıcaklık sabit tutulur.', answer: true },
            { statement: 'Charles yasasına göre sıcaklık artarsa hacim azalır.', answer: false },
            { statement: 'Gay-Lussac yasası sabit hacimde geçerlidir.', answer: true },
          ],
          matchQuestions: [
            { left: 'Boyle', right: 'P₁V₁ = P₂V₂ (sabit T)' },
            { left: 'Charles', right: 'V₁/T₁ = V₂/T₂ (sabit P)' },
            { left: 'Gay-Lussac', right: 'P₁/T₁ = P₂/T₂ (sabit V)' },
            { left: 'Avogadro', right: 'V₁/n₁ = V₂/n₂ (sabit T,P)' },
          ],
          fillQuestions: [
            { sentence: 'Sabit sıcaklıkta basınç ve hacim ____ orantılıdır.', answer: 'ters' },
            { sentence: 'Kelvin = Celsius + ____', answer: '273' },
            { sentence: 'İdeal gaz denkleminde R = 0.082 ____ dir.', answer: 'L·atm/mol·K' },
          ],
          sortQuestions: [
            { items: ['0 K (-273°C)', '273 K (0°C)', '373 K (100°C)', '473 K (200°C)'], correctOrder: [0, 1, 2, 3] },
          ],
          flashQuestions: [
            { front: 'Boyle Yasası', back: 'Sabit sıcaklıkta bir gazın basıncı artarsa hacmi orantılı olarak azalır. P×V = sabit.' },
            { front: 'Charles Yasası', back: 'Sabit basınçta sıcaklık artarsa hacim artar. V/T = sabit. Sıcaklık mutlaka Kelvin cinsinden olmalı.' },
          ],
        }],
      }],
    },
    {
      id: '10-u4', title: '4. Ünite: Çözeltiler ve Derişim',
      subUnits: [{
        id: '10-u4-s1', title: '4.1 Çözünürlük ve Derişim',
        topics: [{
          id: '10-t17', title: 'Çözeltiler ve Çözünürlük',
          quizQuestions: [
            { q: 'Çözelti nedir?', options: ['İki katının karışımı', 'Homojen karışım', 'Heterojen karışım', 'Saf madde'], correct: 1 },
            { q: 'Tuzlu su çözeltisinde çözücü nedir?', options: ['Tuz', 'Su', 'NaCl', 'Hava'], correct: 1 },
            { q: 'Sıcaklık artınca katıların çözünürlüğü genellikle nasıl değişir?', options: ['Azalır', 'Artar', 'Değişmez', 'Sıfır olur'], correct: 1 },
            { q: 'Gazların çözünürlüğü sıcaklık artınca ne olur?', options: ['Artar', 'Azalır', 'Değişmez', 'İkiye katlanır'], correct: 1 },
          ],
          tfQuestions: [
            { statement: 'Çözelti homojen bir karışımdır.', answer: true },
            { statement: 'Gazların çözünürlüğü sıcaklık artınca artar.', answer: false },
            { statement: 'Basınç artışı gazların çözünürlüğünü artırır.', answer: true },
            { statement: 'Doymuş çözeltiye daha fazla çözünen madde eklenebilir.', answer: false },
          ],
          matchQuestions: [
            { left: 'Doymuş çözelti', right: 'Daha fazla çözünen çözünemez' },
            { left: 'Doymamış çözelti', right: 'Daha fazla çözünen çözünebilir' },
            { left: 'Aşırı doymuş', right: 'Normalden fazla çözünen içerir' },
            { left: 'Derişik çözelti', right: 'Çözünen miktarı yüksek' },
          ],
          fillQuestions: [
            { sentence: 'Çözeltide az miktarda bulunan maddeye ____ denir.', answer: 'çözünen' },
            { sentence: 'Çözeltide çok miktarda bulunan maddeye ____ denir.', answer: 'çözücü' },
            { sentence: 'Molarite birimi ____ dir.', answer: 'mol/L' },
          ],
          sortQuestions: [],
          flashQuestions: [
            { front: 'Molarite (CM)', back: '1 litre çözeltideki çözünen maddenin mol sayısıdır. CM = n/V. Birimi mol/L\'dir.' },
            { front: 'Koligatif özellikler', back: 'Çözünen maddenin cinsine değil, miktarına bağlı olan özelliklerdir: kaynama noktası yükselmesi, donma noktası düşmesi, buhar basıncı düşmesi, ozmotik basınç.' },
          ],
        }],
      }],
    },
  ],
  referenceTables: [
    {
      id: 'rt10-1', title: 'Yaygın İyonlar Tablosu', icon: '⚡',
      headers: ['İyon', 'Sembol', 'Yük'],
      rows: [
        ['Sodyum', 'Na⁺', '+1'], ['Potasyum', 'K⁺', '+1'], ['Kalsiyum', 'Ca²⁺', '+2'],
        ['Magnezyum', 'Mg²⁺', '+2'], ['Alüminyum', 'Al³⁺', '+3'], ['Demir(II)', 'Fe²⁺', '+2'],
        ['Demir(III)', 'Fe³⁺', '+3'], ['Bakır(II)', 'Cu²⁺', '+2'],
        ['Klorür', 'Cl⁻', '-1'], ['Bromür', 'Br⁻', '-1'], ['Oksit', 'O²⁻', '-2'],
        ['Sülfat', 'SO₄²⁻', '-2'], ['Nitrat', 'NO₃⁻', '-1'], ['Karbonat', 'CO₃²⁻', '-2'],
        ['Hidroksit', 'OH⁻', '-1'], ['Fosfat', 'PO₄³⁻', '-3'],
      ],
    },
    {
      id: 'rt10-2', title: 'Çözünürlük Tablosu', icon: '💧',
      headers: ['Bileşik Türü', 'Çözünür mü?', 'İstisna'],
      rows: [
        ['Alkali metal tuzları', 'Evet', 'Yok'],
        ['Nitrat (NO₃⁻) tuzları', 'Evet', 'Yok'],
        ['Klorür (Cl⁻) tuzları', 'Evet', 'AgCl, PbCl₂ çözünmez'],
        ['Sülfat (SO₄²⁻) tuzları', 'Evet', 'BaSO₄, PbSO₄ çözünmez'],
        ['Karbonat (CO₃²⁻) tuzları', 'Hayır', 'Alkali metal karbonatları çözünür'],
        ['Hidroksit (OH⁻)', 'Hayır', 'NaOH, KOH, Ca(OH)₂ çözünür'],
      ],
    },
  ],
};

// ============ 11. SINIF ============
export const grade11Data: GradeData = {
  grade: 11,
  description: '11. sınıf kimya dersi, kimyanın en derin ve zorlu konularını içerir. Modern atom teorisi, gazlar, çözeltiler, termokimya, tepkime hızı ve kimyasal denge bu yılın ana konularıdır.',
  learnItems: [
    'Kuantum mekaniğinin temellerini, kuantum sayılarını (n, l, mₗ, mₛ) ve orbital kavramını detaylıca öğreneceksiniz.',
    'Gaz yasalarını ileri düzeyde çalışacak, Dalton kısmi basınçlar yasası, gerçek gazlar ve Van der Waals denklemini öğreneceksiniz.',
    'Çözeltilerin derişimini hesaplayacak (molarite, molalite, mol kesri), koligatif özellikleri (ozmotik basınç, kaynama noktası yükselmesi) anlayacaksınız.',
    'Termokimya konusunda tepkime entalpisini, Hess yasasını, bağ enerjilerini ve enerji diyagramlarını öğreneceksiniz.',
    'Tepkime hızı kavramını, hız denklemlerini, hızı etkileyen faktörleri (derişim, sıcaklık, katalizör) ve Arrhenius yaklaşımını kavrayacaksınız.',
    'Kimyasal denge, denge sabiti (Kc, Kp) hesaplamaları ve Le Chatelier ilkesini uygulayarak denge problemleri çözebileceksiniz.',
  ],
  formulas: [
    { id: 'f11-1', name: 'Kuantum Sayıları', formula: 'n, l, mₗ, mₛ', description: 'n: baş kuantum sayısı (1,2,3...), l: açısal (0→n-1), mₗ: manyetik (-l→+l), mₛ: spin (+½, -½). Elektronun konumunu ve davranışını tanımlar.', category: 'Atom Teorisi' },
    { id: 'f11-2', name: 'İdeal Gaz Denklemi', formula: 'PV = nRT', description: 'Tüm gaz yasalarının birleşimidir. R = 8.314 J/mol·K veya 0.082 L·atm/mol·K.', category: 'Gazlar' },
    { id: 'f11-3', name: 'Dalton Yasası', formula: 'Pₜ = P₁ + P₂ + P₃...', description: 'Gaz karışımında toplam basınç, her gazın kısmi basınçlarının toplamıdır.', category: 'Gazlar' },
    { id: 'f11-4', name: 'Molarite', formula: 'CM = n / V', description: '1 litre çözeltideki çözünen mol sayısı. Birimi mol/L\'dir.', category: 'Çözeltiler' },
    { id: 'f11-5', name: 'Molalite', formula: 'm = n / kg çözücü', description: '1 kg çözücüdeki çözünen mol sayısı. Sıcaklıktan bağımsızdır.', category: 'Çözeltiler' },
    { id: 'f11-6', name: 'Ozmotik Basınç', formula: 'π = CM × R × T', description: 'Yarı geçirgen zardan çözücü geçişini engellemek için uygulanması gereken basınçtır.', category: 'Çözeltiler' },
    { id: 'f11-7', name: 'Tepkime Entalpisi', formula: 'ΔH = ΣΔHf(ürün) - ΣΔHf(giren)', description: 'Tepkimenin enerji değişimi. ΔH < 0: ekzotermik, ΔH > 0: endotermik.', category: 'Termokimya' },
    { id: 'f11-8', name: 'Hess Yasası', formula: 'ΔH = ΔH₁ + ΔH₂ + ΔH₃...', description: 'Bir tepkimenin toplam entalpi değişimi, ara basamakların entalpi değişimlerinin toplamına eşittir.', category: 'Termokimya' },
    { id: 'f11-9', name: 'Denge Sabiti (Kc)', formula: 'Kc = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ', description: 'Dengede ürünlerin derişimlerinin çarpımının, girenlerin derişimlerinin çarpımına oranıdır.', category: 'Denge' },
    { id: 'f11-10', name: 'Tepkime Hızı', formula: 'v = k[A]ᵐ[B]ⁿ', description: 'Hız denklemi. k: hız sabiti, [A],[B]: derişimler, m,n: tepkime mertebesi.', category: 'Hız' },
    { id: 'f11-11', name: 'Bağ Enerjisi', formula: 'ΔH = ΣEkırılan − ΣEoluşan', description: 'Kırılan bağ enerjileri toplamından oluşan bağ enerjileri toplamı çıkarılır.', category: 'Termokimya' },
    { id: 'f11-12', name: 'Van der Waals', formula: '(P + an²/V²)(V − nb) = nRT', description: 'Gerçek gazlar için düzeltilmiş ideal gaz denklemi. a: çekim düzeltmesi, b: hacim düzeltmesi.', category: 'Gazlar' },
  ],
  units: [
    {
      id: '11-u1', title: '1. Ünite: Modern Atom Teorisi',
      subUnits: [{
        id: '11-u1-s1', title: '1.1 Kuantum Modeli ve Periyodik Özellikler',
        topics: [{
          id: '11-t1', title: 'Atomun Kuantum Modeli',
          quizQuestions: [
            { q: 'Baş kuantum sayısı (n) neyi belirler?', options: ['Orbitalin şeklini', 'Enerji düzeyini (katman)', 'Spin yönünü', 'Manyetik özelliği'], correct: 1 },
            { q: 'l = 1 hangi alt katmanı temsil eder?', options: ['s', 'p', 'd', 'f'], correct: 1 },
            { q: 'n = 3 enerji düzeyinde kaç alt katman vardır?', options: ['1', '2', '3', '4'], correct: 2 },
            { q: 'Bir orbitalde en fazla kaç elektron bulunur?', options: ['1', '2', '6', '10'], correct: 1 },
            { q: 'Spin kuantum sayısı (mₛ) hangi değerleri alır?', options: ['0, 1', '+½, -½', '-1, 0, +1', '1, 2, 3'], correct: 1 },
          ],
          tfQuestions: [
            { statement: 'n = 2 düzeyinde d alt katmanı bulunur.', answer: false },
            { statement: 'p alt katmanında 3 orbital bulunur.', answer: true },
            { statement: 'Kuantum mekaniği elektronun kesin yerini belirler.', answer: false },
            { statement: 'Heisenberg belirsizlik ilkesine göre konum ve hız aynı anda kesin ölçülemez.', answer: true },
          ],
          matchQuestions: [
            { left: 'n (baş)', right: 'Enerji düzeyi/katman' },
            { left: 'l (açısal)', right: 'Alt katman şekli (s,p,d,f)' },
            { left: 'mₗ (manyetik)', right: 'Orbitalin uzaydaki yönü' },
            { left: 'mₛ (spin)', right: 'Elektronun dönüş yönü' },
          ],
          fillQuestions: [
            { sentence: 'l = 0 alt katmanı ____ alt katmanıdır.', answer: 's' },
            { sentence: 'n = 4 düzeyinde ____ alt katman vardır.', answer: '4' },
            { sentence: 'd alt katmanında ____ orbital bulunur.', answer: '5' },
          ],
          sortQuestions: [
            { items: ['1s (en düşük enerji)', '2s', '2p', '3s', '3p'], correctOrder: [0, 1, 2, 3, 4] },
          ],
          flashQuestions: [
            { front: 'Heisenberg Belirsizlik İlkesi', back: 'Bir elektronun konumu ve momentumu (hızı) aynı anda kesin olarak ölçülemez. Ne kadar kesin konum bilinirse, momentum o kadar belirsiz olur.' },
            { front: 'Schrödinger Dalga Denklemi', back: 'Elektronun dalga fonksiyonunu (ψ) tanımlayan matematiksel denklemdir. |ψ|² elektronu bulma olasılığını verir.' },
          ],
        }],
      }],
    },
    {
      id: '11-u2', title: '2. Ünite: Gazlar',
      subUnits: [{
        id: '11-u2-s1', title: '2.1 İleri Gaz Konuları',
        topics: [{
          id: '11-t6', title: 'Gaz Karışımları ve Gerçek Gazlar',
          quizQuestions: [
            { q: 'Dalton kısmi basınçlar yasasına göre toplam basınç nasıl hesaplanır?', options: ['En büyük basınç alınır', 'Kısmi basınçlar toplanır', 'Kısmi basınçlar çarpılır', 'Ortalama alınır'], correct: 1 },
            { q: 'Gerçek gazlar ideal gazdan ne zaman en çok sapma gösterir?', options: ['Yüksek T, düşük P', 'Düşük T, yüksek P', 'Yüksek T, yüksek P', 'Hiçbir zaman'], correct: 1 },
            { q: 'Van der Waals denklemindeki "a" sabiti neyi düzeltir?', options: ['Hacim', 'Moleküller arası çekim', 'Sıcaklık', 'Basınç birimi'], correct: 1 },
            { q: 'Mol kesri nedir?', options: ['Toplam mol / bir gazın molü', 'Bir gazın molü / toplam mol', 'Kütle / hacim', 'Basınç / sıcaklık'], correct: 1 },
          ],
          tfQuestions: [
            { statement: 'İdeal gaz molekülleri arasında çekim kuvveti yoktur.', answer: true },
            { statement: 'Gerçek gazlar düşük basınçta ideale yaklaşır.', answer: true },
            { statement: 'Van der Waals denkleminde b sabiti çekim kuvvetini temsil eder.', answer: false },
          ],
          matchQuestions: [
            { left: 'Dalton yasası', right: 'Pₜ = P₁ + P₂ + ...' },
            { left: 'Mol kesri', right: 'xₐ = nₐ / nₜ' },
            { left: 'Van der Waals "a"', right: 'Çekim kuvveti düzeltmesi' },
            { left: 'Van der Waals "b"', right: 'Hacim düzeltmesi' },
          ],
          fillQuestions: [
            { sentence: 'Bir gazın kısmi basıncı = mol kesri × ____ basınç.', answer: 'toplam' },
            { sentence: 'Gerçek gazlar ____ basınç ve yüksek sıcaklıkta ideale yaklaşır.', answer: 'düşük' },
          ],
          sortQuestions: [],
          flashQuestions: [
            { front: 'İdeal gaz varsayımları', back: '1) Gaz molekülleri arası çekim/itme kuvveti yok. 2) Moleküllerin kendi hacimleri yok (nokta tanecik). 3) Çarpışmalar tamamen esnek.' },
            { front: 'Dalton Yasası', back: 'Gaz karışımında toplam basınç, her bir gazın kısmi basınçlarının toplamına eşittir. Pₜ = P₁ + P₂ + P₃.' },
          ],
        }],
      }],
    },
    {
      id: '11-u3', title: '3. Ünite: Çözeltiler ve Çözünürlük',
      subUnits: [{
        id: '11-u3-s1', title: '3.1 Derişim ve Koligatif Özellikler',
        topics: [{
          id: '11-t11', title: 'Derişim Birimleri ve Koligatif Özellikler',
          quizQuestions: [
            { q: 'Molalite birimi nedir?', options: ['mol/L', 'mol/kg çözücü', 'g/L', '%'], correct: 1 },
            { q: 'Kaynama noktası yükselmesi neye bağlıdır?', options: ['Çözünen cinsine', 'Çözünen miktarına', 'Çözücü rengine', 'Kabın şekline'], correct: 1 },
            { q: 'Ozmotik basınç formülü hangisidir?', options: ['π = MRT', 'π = PV', 'π = nR', 'π = m/V'], correct: 0 },
            { q: 'Antifriz kaynama noktasını nasıl etkiler?', options: ['Düşürür', 'Yükseltir', 'Değiştirmez', 'Sıfırlar'], correct: 1 },
          ],
          tfQuestions: [
            { statement: 'Molalite sıcaklıktan bağımsızdır.', answer: true },
            { statement: 'Koligatif özellikler çözünen maddenin cinsine bağlıdır.', answer: false },
            { statement: 'Çözeltinin buhar basıncı saf çözücüden düşüktür.', answer: true },
            { statement: 'Deniz suyu saf sudan daha düşük sıcaklıkta donar.', answer: true },
          ],
          matchQuestions: [
            { left: 'Kaynama noktası yükselmesi', right: 'ΔTb = Kb × m' },
            { left: 'Donma noktası düşmesi', right: 'ΔTf = Kf × m' },
            { left: 'Ozmotik basınç', right: 'π = MRT' },
            { left: 'Buhar basıncı düşmesi', right: 'Raoult yasası' },
          ],
          fillQuestions: [
            { sentence: 'Koligatif özellikler çözünen maddenin ____ bağlıdır, cinsine değil.', answer: 'miktarına' },
            { sentence: 'Kışın yollara tuz atılmasının sebebi donma noktasını ____ dir.', answer: 'düşürmek' },
          ],
          sortQuestions: [],
          flashQuestions: [
            { front: 'Koligatif özellikler nelerdir?', back: '1) Buhar basıncı düşmesi 2) Kaynama noktası yükselmesi 3) Donma noktası düşmesi 4) Ozmotik basınç. Hepsi çözünen miktarına bağlıdır.' },
          ],
        }],
      }],
    },
    {
      id: '11-u4', title: '4. Ünite: Kimyasal Tepkimelerde Enerji',
      subUnits: [{
        id: '11-u4-s1', title: '4.1 Termokimya',
        topics: [{
          id: '11-t16', title: 'Entalpi ve Hess Yasası',
          quizQuestions: [
            { q: 'Ekzotermik tepkimede ΔH nasıldır?', options: ['Pozitif', 'Negatif', 'Sıfır', 'Belirsiz'], correct: 1 },
            { q: 'Hess yasasının temeli nedir?', options: ['Kütle korunumu', 'Enerji korunumu', 'Yük korunumu', 'Momentum korunumu'], correct: 1 },
            { q: 'Bağ kırma enerji gerektirir mi?', options: ['Evet, her zaman', 'Hayır, enerji verir', 'Bazen', 'Sadece iyonik bağda'], correct: 0 },
            { q: 'Endotermik tepkimede ne olur?', options: ['Isı açığa çıkar', 'Isı absorbe edilir', 'Sıcaklık değişmez', 'Kütle azalır'], correct: 1 },
          ],
          tfQuestions: [
            { statement: 'Yanma tepkimeleri ekzotermiktir.', answer: true },
            { statement: 'Fotosentez ekzotermik bir tepkimedir.', answer: false },
            { statement: 'Bağ oluşumu enerji açığa çıkarır.', answer: true },
            { statement: 'Hess yasasına göre entalpi yoldan bağımsızdır.', answer: true },
          ],
          matchQuestions: [
            { left: 'Ekzotermik', right: 'ΔH < 0, ısı verir' },
            { left: 'Endotermik', right: 'ΔH > 0, ısı alır' },
            { left: 'Bağ kırma', right: 'Enerji gerektirir' },
            { left: 'Bağ oluşumu', right: 'Enerji açığa çıkarır' },
          ],
          fillQuestions: [
            { sentence: 'Ekzotermik tepkimelerde ΔH değeri ____ dir.', answer: 'negatif' },
            { sentence: 'Fotosentez ____ bir tepkimedir.', answer: 'endotermik' },
            { sentence: 'Hess yasasına göre toplam entalpi değişimi ____ bağımsızdır.', answer: 'yoldan' },
          ],
          sortQuestions: [],
          flashQuestions: [
            { front: 'Ekzotermik tepkime', back: 'Isı açığa çıkaran tepkimedir. ΔH < 0. Ürünlerin enerjisi girenlerden düşüktür. Örn: yanma, nötrleşme.' },
            { front: 'Hess Yasası', back: 'Bir tepkimenin toplam entalpi değişimi, başlangıç ve son duruma bağlıdır, izlenen yola bağlı değildir.' },
          ],
        }],
      }],
    },
    {
      id: '11-u5', title: '5. Ünite: Tepkime Hızları',
      subUnits: [{
        id: '11-u5-s1', title: '5.1 Hız ve Faktörler',
        topics: [{
          id: '11-t19', title: 'Tepkime Hızı ve Hız Denklemi',
          quizQuestions: [
            { q: 'Tepkime hızını artıran faktör hangisidir?', options: ['Sıcaklık artışı', 'Hacim artışı', 'Katalizör azaltma', 'Basınç düşürme'], correct: 0 },
            { q: 'Katalizör ne yapar?', options: ['Dengeyi kaydırır', 'Aktivasyon enerjisini düşürür', 'Ürün miktarını artırır', 'Tepkime entalpisi değiştirir'], correct: 1 },
            { q: 'Hız denklemi v = k[A]²[B] ise tepkime kaçıncı mertebedir?', options: ['2', '3', '1', '4'], correct: 1 },
            { q: 'Temas yüzeyi artırıldığında ne olur?', options: ['Hız azalır', 'Hız artar', 'Değişmez', 'Tepkime durur'], correct: 1 },
          ],
          tfQuestions: [
            { statement: 'Katalizör tepkimede tüketilmez.', answer: true },
            { statement: 'Sıcaklık artışı tepkime hızını artırır.', answer: true },
            { statement: 'Katalizör denge sabitini değiştirir.', answer: false },
            { statement: 'Derişim artışı tepkime hızını artırır.', answer: true },
          ],
          matchQuestions: [
            { left: 'Katalizör', right: 'Aktivasyon enerjisini düşürür' },
            { left: 'Sıcaklık artışı', right: 'Kinetik enerji artar' },
            { left: 'Derişim artışı', right: 'Çarpışma sayısı artar' },
            { left: 'Temas yüzeyi artışı', right: 'Etkileşim alanı artar' },
          ],
          fillQuestions: [
            { sentence: 'Katalizör ____ enerjisini düşürerek tepkimeyi hızlandırır.', answer: 'aktivasyon' },
            { sentence: 'Hız sabiti ____ ile gösterilir.', answer: 'k' },
            { sentence: 'Tepkime hızını etkileyen dört faktör: derişim, sıcaklık, katalizör ve ____ yüzeyidir.', answer: 'temas' },
          ],
          sortQuestions: [],
          flashQuestions: [
            { front: 'Aktivasyon enerjisi', back: 'Tepkimenin başlaması için gerekli minimum enerjidir. Katalizör bu enerjiyi düşürür, tepkimeyi kolaylaştırır.' },
            { front: 'Tepkime mertebesi', back: 'Hız denklemindeki derişim üslerinin toplamıdır. v = k[A]²[B] ise toplam mertebe = 2+1 = 3.' },
          ],
        }],
      }],
    },
    {
      id: '11-u6', title: '6. Ünite: Kimyasal Denge',
      subUnits: [{
        id: '11-u6-s1', title: '6.1 Denge ve Le Chatelier',
        topics: [{
          id: '11-t23', title: 'Kimyasal Denge ve Denge Sabiti',
          quizQuestions: [
            { q: 'Kimyasal dengede ne olur?', options: ['Tepkime durur', 'İleri ve geri hız eşitlenir', 'Sadece ürün oluşur', 'Sadece giren madde kalır'], correct: 1 },
            { q: 'Le Chatelier ilkesine göre dengedeki sisteme ürün eklenirse ne olur?', options: ['İleri tepkime hızlanır', 'Geri tepkime hızlanır', 'Değişmez', 'Denge bozulur'], correct: 1 },
            { q: 'Kc > 1 ise ne anlama gelir?', options: ['Girenler baskın', 'Ürünler baskın', 'Denge yok', 'Tepkime olmaz'], correct: 1 },
            { q: 'Sıcaklık artışı ekzotermik dengede ne yapar?', options: ['Ürün artırır', 'Giren artırır (geri yön)', 'Değişiklik olmaz', 'Denge yok olur'], correct: 1 },
            { q: 'Katalizör dengeyi nasıl etkiler?', options: ['İleri yöne kaydırır', 'Geri yöne kaydırır', 'Dengeye daha çabuk ulaştırır', 'Kc değiştirir'], correct: 2 },
          ],
          tfQuestions: [
            { statement: 'Dengede ileri ve geri tepkime hızları eşittir.', answer: true },
            { statement: 'Katalizör denge konumunu değiştirir.', answer: false },
            { statement: 'Basınç artışı mol sayısı az olan tarafa kaydırır.', answer: true },
            { statement: 'Sıcaklık denge sabitini değiştirir.', answer: true },
          ],
          matchQuestions: [
            { left: 'Kc > 1', right: 'Ürünler baskın' },
            { left: 'Kc < 1', right: 'Girenler baskın' },
            { left: 'Kc = 1', right: 'Girenler ve ürünler eşit' },
            { left: 'Le Chatelier', right: 'Dengeye etki azaltılır' },
          ],
          fillQuestions: [
            { sentence: 'Kimyasal dengede ileri ve geri tepkime ____ eşittir.', answer: 'hızları' },
            { sentence: 'Dengeye madde eklendiğinde sistem eklenen maddeyi ____ yönde hareket eder.', answer: 'azaltacak' },
            { sentence: 'Sıcaklık artışı endotermik tepkimeyi ____ yöne kaydırır.', answer: 'ileri' },
          ],
          sortQuestions: [],
          flashQuestions: [
            { front: 'Le Chatelier İlkesi', back: 'Dengede olan bir sisteme dışarıdan bir etki uygulandığında, sistem bu etkiyi azaltacak yönde tepki verir. Etki: derişim, basınç, sıcaklık değişimi.' },
            { front: 'Denge sabiti (Kc)', back: 'Dengede ürün derişimlerinin çarpımının giren derişimlerinin çarpımına oranıdır. Sadece sıcaklıkla değişir. Kc = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ' },
          ],
        }],
      }],
    },
  ],
  referenceTables: [
    {
      id: 'rt11-1', title: 'Yaygın Asit ve Bazlar', icon: '🧪',
      headers: ['Ad', 'Formül', 'Tür'],
      rows: [
        ['Hidroklorik asit', 'HCl', 'Güçlü asit'], ['Sülfürik asit', 'H₂SO₄', 'Güçlü asit'],
        ['Nitrik asit', 'HNO₃', 'Güçlü asit'], ['Asetik asit', 'CH₃COOH', 'Zayıf asit'],
        ['Karbonik asit', 'H₂CO₃', 'Zayıf asit'], ['Fosforik asit', 'H₃PO₄', 'Zayıf asit'],
        ['Sodyum hidroksit', 'NaOH', 'Güçlü baz'], ['Potasyum hidroksit', 'KOH', 'Güçlü baz'],
        ['Kalsiyum hidroksit', 'Ca(OH)₂', 'Güçlü baz'], ['Amonyak', 'NH₃', 'Zayıf baz'],
      ],
    },
    {
      id: 'rt11-2', title: 'Termodinamik Sabitler', icon: '🔥',
      headers: ['Sabit', 'Sembol', 'Değer'],
      rows: [
        ['Gaz sabiti', 'R', '8.314 J/mol·K'], ['Gaz sabiti', 'R', '0.082 L·atm/mol·K'],
        ['Avogadro sayısı', 'Nₐ', '6.022 × 10²³'],
        ['Faraday sabiti', 'F', '96485 C/mol'], ['Planck sabiti', 'h', '6.626 × 10⁻³⁴ J·s'],
        ['Mutlak sıfır', 'T', '0 K = -273.15 °C'],
      ],
    },
    {
      id: 'rt11-3', title: 'Yükseltgenme Basamakları', icon: '⚡',
      headers: ['Element', 'Yaygın Y.B.', 'Not'],
      rows: [
        ['H', '+1, -1', 'Metal hidrürlerde -1'], ['O', '-2', 'Peroksitlerde -1'],
        ['1A grubu (Li,Na,K)', '+1', 'Her zaman'], ['2A grubu (Mg,Ca)', '+2', 'Her zaman'],
        ['F', '-1', 'Her zaman'], ['Al', '+3', 'Her zaman'],
        ['Fe', '+2, +3', 'Değişken'], ['Cu', '+1, +2', 'Değişken'],
        ['N', '-3, +3, +5', 'Değişken'], ['S', '-2, +4, +6', 'Değişken'],
      ],
    },
  ],
};
