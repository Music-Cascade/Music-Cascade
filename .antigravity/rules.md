# Antigravity Tasarım & UI Geliştirme Protokolü

1. **Arayüz Tasarımı:**
   Tüm arayüz bileşenleri oluşturulurken `.design/` klasörü altındaki `DESIGN.md`, `vercel-guidelines.md` ve `taste-rules.md` baz alınacaktır.

2. **Self-Verification (Kendi Kendini Doğrulama):**
   Bir UI bileşeni tamamlandıktan sonra Playwright CLI kullanılarak ekran görüntüsü (`current-preview.png`) oluşturulmalı ve taşma/kayma/hizalama kontrolü yapılmalıdır.
   ```bash
   npx playwright-cli open http://localhost:3000
   npx playwright-cli screenshot --filename=.design/current-preview.png
   ```

3. **Anti-Slop Direktifleri:**
   Ruhsuz, jenerik AI tasarımlarından kaçınılmalı, tipografik hiyerarşi ve mikro-animasyonlar ile pürüzsüz deneyim sunulmalıdır.
