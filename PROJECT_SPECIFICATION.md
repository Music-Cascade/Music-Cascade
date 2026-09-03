# Müzik Çalma Listesi Aktarım Platformu (Music Playlist Transfer Tool)
## Kapsamlı Mimari, Teknik Yol Haritası ve Antigravity Tasarım Protokolü

Bu doküman; geliştirici ekip, yapay zeka kodlama ajanları (AI coding agents) ve Antigravity ortamı için nihai referans mimari belgesidir. Projenin ürün vizyonu, teknik kısıtları, adaptör mimarisi, teknoloji yığını ve **"Anti-AI Slop / Playwright CLI Doğrulamalı Tasarım Boru Hattı"** standartları eksiksiz olarak tanımlanmıştır.

---

## 1. Proje Özeti ve Vizyonu

* **Amaç:** Farklı müzik akış servisleri (Spotify, YouTube Music, Apple Music, Deezer, Tidal, SoundCloud vb.) arasında sınırsız, ücretsiz, hızlı ve kullanıcı dostu çalma listesi (playlist) aktarımı sağlayan modern bir web platformu inşa etmek.
* **Problem:** Mevcut ticari alternatifler (TuneMyMusic, Soundiiz vb.) 500-1000 şarkılık aktarımlardan sonra ücretli abonelik talep etmekte ve kullanıcıyı engellemektedir.
* **Vizyon:**
  1. Tamamen ücretsiz ve sınırsız hizmet sunmak.
  2. Kullanıcıyı rahatsız etmeyecek 1-2 Google AdSense reklamı ve isteğe bağlı bağış ("Buy Me a Coffee") modeliyle domain/sunucu maliyetlerini finanse etmek.
  3. Kod kalitesi, dağıtık mimari anlayışı ve ölçeklenebilirlik pratikleri ile portfolyo/CV için yüksek kaliteli bir referans oluşturmak.
* **Form Faktörü:** Yalnızca web platformu. Ayrı bir mobil uygulama (iOS/Android) veya tarayıcı eklentisi (extension) kurulmayacaktır. Masaüstü ve mobil tarayıcılarda (Safari, Chrome) tam responsive, dokunmatik uyumlu ve akıcı çalışan bir SPA/PWA yapısı benimsenecektir.

---

## 2. Desteklenecek Platformlar ve Entegrasyon Stratejisi

Platform bağımsızlığını sağlamak için servisler modüler adaptörler (`adapters/`) şeklinde tasarlanacaktır:

| Platform | Rol | Entegrasyon Yöntemi | Kritik Zorluk / Kısıt | Çözüm Yaklaşımı |
| :--- | :--- | :--- | :--- | :--- |
| **Spotify** | Kaynak & Hedef | Spotify Web API (OAuth 2.0 PKCE) | Rate Limit (429 Too Many Requests) | İstemci tarafı PKCE ile doğrudan tarayıcıdan istek, exponential backoff ile batching (50'şerli bloklar). |
| **YouTube Music** | Kaynak & Hedef | Google Identity Services + `youtubei.js` (InnerTube) | Resmi Data API v3'ün günlük 10.000 quota sınırı (Arama başına 100 quota harcaması) | Arama ve eşleştirmelerde resmi API kotasını harcamamak için `youtubei.js` iç endpoint'leri; yazma işlemlerinde kullanıcı OAuth token'ı. |
| **Apple Music** | Kaynak & Hedef | Apple MusicKit JS | $99/yıl Apple Developer hesabı ve MusicKit sertifikası zorunluluğu | Aşama 2'ye bırakılacaktır. Başlangıçta salt CSV/Text dışa aktarım desteği sunulacaktır. |
| **Deezer** | Kaynak & Hedef | Deezer REST API | CORS kısıtları ve açık API sınırları | Next.js API Route Handlers üzerinden proxy/relay edilerek istemciye sunulması. |
| **Tidal** | Kaynak & Hedef | Tidal Developer API (OAuth 2.0) | API erişim onay süreleri | Modüler adaptör mimarisinde API onayı gelene kadar taslak adaptör olarak tutulması. |
| **SoundCloud** | Kaynak (Öncelikli) | SoundCloud API v2 / scraping | Resmi API anahtarı alımının kapalı olması | İstemci tarafından halka açık parça metaverilerinin çözümlenmesi. |
| **Evrensel Format (CSV/JSON)** | İçe/Dışa Aktarım | File Web API (Local parse) | Farklı sütun isimlendirmeleri | Müzik listesini yedekleme, dışa aktarma veya dosyadan platforma aktarma imkanı. |

---

## 3. Karşılaşılan Kısıtlar ve Mimari Çözüm Yolları

### Kısıt 1: API Kota Sınırları ve Merkezi Sunucu IP Ban Riski
* **Sorun:** Tüm isteklerin tek bir sunucu IP'sinden yapılması durumunda YouTube ve Spotify çok kısa sürede IP bloklaması veya 429 Too Many Requests hatası döndürür.
* **Çözüm (Client-Side Execution):**
  * Kimlik doğrulama, token saklama ve API aktarım çağrıları kullanıcının kendi tarayıcısında çalıştırılır.
  * İstekler kullanıcının ev internetinden ve IP adresinden çıkar; sunucu sıfır API trafiği taşır.

### Kısıt 2: Şarkı Eşleme Doğruluğu (Fuzzy Matching & ISRC)
* **Sorun:** Şarkı başlıklarındaki ekler ("Remastered 2021", "Live at Wembley", "feat.", telifli/sansürlü versiyonlar) doğrudan başlık aramasında yanlış şarkıların seçilmesine yol açar.
* **Çözüm:**
  1. **ISRC Önceliği:** Kaynak parçada ISRC (International Standard Recording Code) varsa, hedef serviste önce ISRC üzerinden tam eşleşme aranır.
  2. **Metin Temizleme (Sanitization):** Parça başlığındaki parantez içi ekler, "ft.", "feat.", "Official Video" gibi etiketler regex ile ayıklanır.
  3. **Fuzzy Scoring (Levenshtein Mesafesi):** `Fuse.js` ile sanatçı ve parça adı benzerliği %80 üzerinde olan adaylar seçilir; süre doğrulaması (Duration check: ±10 saniye fark) uygulanır.

### Kısıt 3: Kırık Linkler ve Silinen Şarkılar (Cache Invalidation)
* **Sorun:** Veritabanındaki eşleşmeler zamanla telif veya silinme sebebiyle 404'e düşebilir.
* **Çözüm:**
  * **Lazy Fallback:** Önbellekteki ID'ye istek atıldığında 404 dönerse, sistem anlık olarak canlı aramaya düşer, yeni ID'yi bulur ve veritabanındaki kaydı günceller.
  * **Fail-Count Mekanizması:** Arka arkaya 2 kez başarısız olan ID'ler veritabanında geçersiz (`is_active = false`) olarak işaretlenir.
  * **TTL (Time-To-Live):** 30 günden eski eşleşmeler otomatik olarak canlı aramayla tazelenir.

### Kısıt 4: Mobil Tarayıcı Kısıtları (Background Throttling & Popups)
* **Sorun:** Mobil Safari ve Chrome, ekran kilitlendiğinde veya sekme alta alındığında JS döngülerini dondurur. Ayrıca popup pencereleri varsayılan olarak engellenir.
* **Çözüm:**
  * Popup yerine tam yönlendirmeli (**Redirect URI**) OAuth akışı kullanılır.
  * Aktarım sırasında tarayıcının uykuya geçmesini önlemek için `Screen Wake Lock API` kullanılır ve arayüzde *"Aktarım sırasında lütfen sekmeyi kapatmayın"* bildirimi verilir.

---

## 4. Antigravity & Frontend Tasarım Protokolü (Anti-AI Slop Hattı)

Yapay zekanın jenerik, ruhsuz ve kalıplaşmış ("AI slop") arayüzler üretmesini engellemek ve piksel düzeyinde profesyonel standart yakalamak için Antigravity ortamında aşağıdaki tasarım boru hattı işletilecektir:

### A. Tasarım Kaynakları (Source of Truth)
Ajan, frontend kodu üretmeden önce `.design/` altındaki şu kuralları zorunlu referans kabul eder:
1. **`.design/DESIGN.md`:** Renk paleti, tipografi hiyerarşisi, spacing skalası ve border-radius değerleri.
2. **`.design/vercel-guidelines.md`:** Vercel Web Interface kuralları (Optical alignment, Nested radii, Layered shadows: direct + ambient, Minimum contrast, Tabular numbers).
3. **`.design/taste-rules.md`:** Taste-skill yönergeleri (Jenerik mor gradient yasakları, dengeli mikromimikler, akıcı CSS hareketleri, anlamsız boşlukların engellenmesi).

### B. Image-to-Code Protokolü
Ajan referans bir mockup (`assets/mockup.png`) aldığında:
1. Görselin layout omurgasını, tipografik ritmini ve renk tonlarını analiz eder.
2. Bileşeni doğrudan `shadcn/ui` ve `Tailwind CSS` kullanarak üretir.

### C. Playwright CLI ile Kendi Kendine Doğrulama Döngüsü (Self-Verification Loop)
Ajan bir bileşeni veya sayfayı kodladıktan sonra yanıt vermeden önce şu döngüyü terminalden koşturur:
```bash
# 1. Dev sunucusundaki sayfayı aç
playwright-cli open http://localhost:3000/transfer

# 2. Ekran görüntüsünü yakala
playwright-cli screenshot --filename=.design/current-preview.png

# 3. Görseli referans tasarımla ve DESIGN.md standartlarıyla karşılaştır, taşma/kayma varsa kodu düzelt.
```

---

## 5. Teknoloji Yığını (Tech Stack)

* **Full-Stack Çatı:** **Next.js (App Router, TypeScript)**
* **Stil & Arayüz:** **Tailwind CSS + shadcn/ui + Lucide Icons**
* **Tasarım & Doğrulama:** **Playwright CLI + taste-skill + Vercel Interface Guidelines**
* **Veritabanı & ORM:** **PostgreSQL + Prisma ORM**
* **Müzik Çözümleme Motoru:** **youtubei.js (InnerTube)** + **Fuse.js**
* **Geliştirme Ortamı & DevOps:** **Docker & Docker Compose**
* **Canlı Dağıtım (Production):** Vercel (Frontend) + Neon/Supabase (PostgreSQL) veya Tekil VPS (Docker Compose).

---

## 6. Örnek Veritabanı Şeması (Prisma)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model SongMapping {
  id              String    @id @default(uuid())
  isrc            String?   @index
  spotifyId       String?   @unique
  ytVideoId       String?   @unique
  appleMusicId    String?   @unique
  deezerId        String?   @unique
  tidalId         String?   @unique
  title           String
  artist          String
  durationSec     Int?
  failCount       Int       @default(0)
  isActive        Boolean   @default(true)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  lastVerifiedAt  DateTime  @default(now())

  @@index([title, artist])
}
```

---

## 7. Güncellenmiş Proje Klasör Yapısı (Project Structure)

```text
music-playlist-transfer/
├── .antigravity/                # Antigravity orkestrasyon ve sistem direktifleri
│   └── rules.md                 # UI geliştirme protokolü ve ajan yönergeleri
├── .design/                     # Tasarım tokenları, kurallar ve görsel doğrulama
│   ├── DESIGN.md                # awesome-design-md (Vercel/Linear stili tokenlar)
│   ├── vercel-guidelines.md     # Vercel Web Interface Guidelines
│   ├── taste-rules.md           # taste-skill / anti-slop direktifleri
│   └── current-preview.png      # Playwright CLI ekran görüntüsü
├── .playwright-cli/             # Playwright CLI oturum ve çalışma verileri
├── prisma/
│   └── schema.prisma            # Veritabanı şeması ve migration'lar
├── public/                      # Statik ikonlar, görseller
├── src/
│   ├── app/                     # Next.js App Router (Sayfalar ve API rotaları)
│   │   ├── api/
│   │   │   ├── cache/           # Eşleme sorgulama ve kaydetme endpoint'leri
│   │   │   └── search/          # youtubei.js ve proxy arama endpoint'leri
│   │   ├── transfer/            # Aktarım arayüzü ve canlı ilerleme ekranı
│   │   ├── layout.tsx           # Global layout ve AdSense script entegrasyonu
│   │   └── page.tsx             # Karşılama ve kaynak/hedef seçim ekranı
│   ├── components/              # UI bileşenleri (shadcn/ui, transfer progress, ad banners)
│   ├── lib/
│   │   ├── adapters/            # Modüler müzik servisi entegrasyon katmanı
│   │   │   ├── spotify.ts
│   │   │   ├── youtube.ts
│   │   │   ├── deezer.ts
│   │   │   └── base.ts
│   │   ├── engine/              # ISRC, Regex sanitization ve Fuzzy Matching motoru
│   │   ├── prisma.ts            # Prisma istemci singleton instance
│   │   └── wake-lock.ts         # Mobil uyku engelleme yardımcısı
│   └── types/                   # Ortak TypeScript tipleri (Track, Playlist, Platform)
├── docker-compose.yml           # Lokal veritabanı servisleri
├── package.json
└── PROJECT_SPECIFICATION.md
```

---

## 8. Geliştirme Aşamaları ve Yol Haritası

1. **Aşama 1 (Altyapı & Tasarım Hattı):** Docker Compose (PostgreSQL), Prisma kurulumu, Antigravity tasarım klasörlerinin (`.design/`, `.antigravity/rules.md`) ve Playwright CLI'ın projeye eklenmesi.
2. **Aşama 2 (Spotify Modülü):** Spotify PKCE Client-Side OAuth entegrasyonu ve çalma listesi/parça verilerini çekme.
3. **Aşama 3 (YouTube Music Modülü):** Google Identity ile oturum açma, `youtubei.js` arama motorunun ve fallback yapısının kurulması.
4. **Aşama 4 (Eşleme Motoru):** ISRC ve Fuzzy Matching algoritmasının kodlanması, veritabanı eşleme önbelleğinin devreye alınması.
5. **Aşama 5 (Arayüz & Görsel Doğrulama UX):** Responsive aktarım akışı, canlı progress bar, Playwright CLI ile ekran görüntüsü doğrulaması ve reklam alanlarının entegrasyonu.
6. **Aşama 6 (Diğer Servisler):** Deezer, Apple Music, CSV içe/dışa aktarım adaptörlerinin eklenmesi.
