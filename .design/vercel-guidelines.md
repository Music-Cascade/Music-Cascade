# Vercel Web Interface Guidelines

1. **Optical Alignment:**
   Görsel öğeler matematiksel olarak değil, optik olarak hizalanmalıdır. İkonlar ve metinler yan yana geldiğinde ağırlık merkezleri eşitlenmelidir.

2. **Nested Radii:**
   İç içe geçen bileşenlerde (örn: kart içinde buton), içteki elemanın border-radius'u, dıştakinden kendi aralarındaki boşluk (padding) kadar küçük olmalıdır (OuterRadius - Padding = InnerRadius).

3. **Layered Shadows:**
   Tek bir sert gölge yerine, derinlik hissi veren katmanlı gölgeler (Direct + Ambient shadow) kullanılmalıdır. (Tailwind: `shadow-sm`, `shadow-md` dengeli kullanılmalı).

4. **Minimum Contrast & Tabular Numbers:**
   Zayıf kontrasttan kaçınılmalı. Süre (Duration) ve sayaç gibi rakamların değiştiği alanlarda sarsıntıyı önlemek için `font-variant-numeric: tabular-nums` (`tabular-nums`) kullanılmalıdır.
