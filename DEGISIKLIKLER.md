# KimyaLab — Yapılan Tüm Değişiklikler

## ✅ 1. Kayıt Sistemi + Veritabanı
- `backend/` — Express sunucu, `kullanicilar/kullanicilar.json` dosyasına isim+soyisim+ID+tarih ile kayıt.
- Atomik yazma (geçici dosya → rename) + otomatik `.backup` kopyası → yarım/bozuk veri riski yok.
- Aynı anda gelen kayıtlar sıraya alınır (write queue), birbirini ezmez.
- Bağlantı koparsa kayıt tarayıcıda kuyruğa alınır, bağlantı gelince otomatik gönderilir — **hiçbir kullanıcı kaybolmaz**.
- `render.yaml` ile Render'a deploy + kalıcı disk tanımı hazır.

## ✅ 2. Kayıt Akışı
- Splash → **İsim + Soyisim** (Kayıt Ol butonu) → Sınıf Seç → Panel.
- `src/components/RegisterScreen.tsx`

## ✅ 3. Responsive Sol Menü
- Bilgisayarda (≥768px) otomatik açık, telefonda kapalı + hamburger buton.
- Pencere boyutu değişince otomatik uyum sağlar.

## ✅ 4. AI Mesajlarını Güzelleştirme
- `src/components/FormattedMessage.tsx`: `**kalın**`, `__altı çizili__`, "- " ile madde işareti, paragraflar arası boşluk, `` `kod/formül` `` vurgusu.
- AI'nin sistem promptuna bu biçimlendirme kuralları eklendi — yapay zeka artık maddeler halinde, kalın/altı çizili vurgularla, boşluklu yazıyor.
- Hem ana sohbet ekranında hem oyun içi sağ-alt AI balonunda kullanılıyor.

## ✅ 5. Ders Notları / Formüller Ayrımı
- Sol menüde artık **iki ayrı bölüm**: "📝 Ders Notları" ve "📐 Formüller".
- `src/components/NotesPage.tsx`: seçilen sınıfın konularına göre (ünite → alt ünite → konu) gruplanmış, kalın terim + açıklama şeklinde özet notlar. İçerik mevcut bilgi kartlarından (flashcard/soru bankası) otomatik derlenir.
- Formüller sayfası zaten sınıfa özel ve kategoriye göre gruplu.

## ✅ 6. Oyun Seçim Ekranı Sadeleştirme
- Numaralı oyun kutucukları (1-10) kaldırıldı.
- Artık her oyun türü için tek bir kare kutucuk var (ikon + tür adı), sayı yok.
- Grid, ekran boyutuna göre otomatik ayarlanıyor (mobilde 2 sütun, masaüstünde 4 sütun).

## ✅ 7. 10 Sorulu, Tekrarsız Oyun Sistemi
- `src/lib/questionPool.ts`: her oyun türü için 10 soruluk oturum, **öğrencinin daha önce görmediği** sorulardan seçilir (tarayıcıda takip edilir). Havuzdaki tüm sorular bir kez sorulmadan hiçbiri tekrar gelmez; havuz tükenince yeni bir tur başlar.
- Oyun içinde sağ altta AI simgesi (`FloatingRobot`) eklendi — oyun oynarken de sohbet edilebiliyor, istediği an oyundan çıkılabiliyor.

## ✅ 8. Sonuç Ekranı
- Yüzde, doğru/yanlış sayısı, yıldız gösterimi.
- Seviyeye göre değişen motivasyon mesajı (%100 / ≥80 / ≥50 / altı için ayrı mesajlar).
- Butonlar: 🔄 Tekrar Oyna · ➡️ Sonraki Oyun Türü · ❌ Yanlışlarını Gör · 🎮 Oyun Türü Seç · 🏠 Ana Menü.
- **Yanlışları Gör** → yanlış yapılan her soru, verilen cevap ve doğru cevapla birlikte listelenir, istediği an "Ana Menü"ye çıkılabilir.

## ✅ 9. Profil Sistemi
- Sol menüde oyunlar/derslerin altında ayrı **"👤 Profilim"** bölümü.
- `src/components/ProfileScreen.tsx`: 10 avatar (5 kız / 5 erkek, `AvatarIcon.tsx`), benzersiz ID (kopyalanabilir), kullanıcı adı oluşturma (isim-soyisim asla değişmez), biyografi.
- Rozet/kupa sistemi: 10 dakika aktif kullanımda 🥉 madalya, 1 saatte 🏆 kupa — herkes profilde görür. Süre arka planda otomatik takip edilir.

## ✅ 10. ID ile Öğrenci Arama
- Sol menüde AI Asistan'ın üstünde, silik "Öğrenci Ara" yazan arama çubuğu.
- `src/components/StudentSearch.tsx`: girilen ID'ye ait öğrencinin avatarı, kullanıcı adı, biyografisi ve rozetleri gösterilir.

---

## ⚠️ Önemli Notlar

1. **Render kalıcı disk**: Ücretsiz planda disk eklemezseniz `kullanicilar.json` her yeniden başlatmada sıfırlanır. `render.yaml` içinde disk tanımlı — Render panelinde onaylamanız yeterli. Detay: aşağıdaki "Deploy" bölümü.
2. **Ders Notları içeriği**: Gerçek bir kimya öğretmeninin yazdığı ayrı bir müfredat metni değil, mevcut soru bankasındaki (flashcard/quiz) doğru bilgilerden otomatik derlenmiş özetlerdir — yanlış bilgi riski yok, ama daha detaylı anlatım isterseniz `src/data/curriculum.ts` içine konu başına elle not ekleyebiliriz.
3. **Eşleştirme/Sıralama oyunlarında** "yanlış" sayımı, doğru cevaba kaç denemede ulaşıldığına göre hesaplanır (ilk denemede doğruysa hata yok).
4. **Bilgi kartları (flashcard)** doğru/yanlış içermediği için sonuç ekranında yüzde yerine "tamamlandı" gösterimi kullanılır.

## 🚀 Deploy Adımları

**Backend (Render):**
1. Bu projeyi GitHub'a push edin.
2. [render.com](https://render.com) → **New → Blueprint** → reponuzu seçin → `render.yaml` otomatik algılanır.
3. Disk onayını verin (Mount Path `/data`, 1 GB) — veri kalıcılığı için şart.
4. Deploy tamamlanınca adresi kopyalayın (`https://xxxx.onrender.com`).

**Frontend (Netlify):**
1. `.env.example` dosyasını `.env.production` yapıp `VITE_API_URL`'e backend adresinizi yazın.
2. `npm install && npm run build`
3. `dist/` klasörünü Netlify'a yükleyin (ya da Netlify'ı GitHub'a bağlayıp Build command: `npm run build`, Publish directory: `dist`).

**Yerelde test:**
```bash
cd backend && npm install && npm start   # localhost:3001
npm install && npm run dev               # localhost:5173 (başka terminalde)
```
