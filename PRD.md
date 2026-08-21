# PRD: Web Portfolio Pribadi — Rangga

## 1. Ringkasan

Portfolio pribadi untuk **HR / Recruiter, Tech Leads & Lab Mentors**. Halaman statis, single-page, component-based via class CSS custom neo-brutalist. Target: scan < 30 detik, memperlihatkan profil **Junior IT Generalist & Continuous Learner** dengan fondasi luas yang transparan (Perakitan Hardware IoT Fisik, Homelab 2-Node Proxmox & Keamanan Jaringan, Web E-Commerce + Midtrans, serta Alur Kerja AI Vibe Coding).

---

## 2. Target Audiens

| Role | Kebutuhan |
|------|-----------|
| **Recruiter / HR** (primary) | Melihat tech stack riil, kejujuran proses belajar, kemampuan adaptasi cepat, dan kontak cepat |
| **Tech Lead / Engineering Team** (secondary) | Melihat detail lab nyata (Smart Locker fisik, homelab 2-node Proxmox, pfSense, Wazuh SIEM) dan cara analisis masalah |
| **Fellow Tech Explorers** (tertiary) | Kolaborasi project IoT, lab jaringan, dan eksperimen AI / vibe coding |

---

## 3. Stack

| Layer | Pilihan | Alasan |
|-------|---------|--------|
| **Framework** | None (vanilla HTML + CSS) | Paling ringan, zero build step, mudah di-host |
| **CSS** | Vanilla CSS (custom, tactile neo-brutalist) | Kontrol gaya visual penuh, tanpa dependency |
| **Icons** | Lucide via CDN (`unpkg.com/lucide`) | Icon konsisten, SVG scalable |
| **Font** | Inter (Google Fonts) | Modern, clean, highly readable |
| **Form** | Formspree | Endpoint POST tanpa backend |
| **Deploy** | GitHub Pages / Vercel | Gratis & cepat |

---

## 4. Halaman & Sitemap

Single page (`index.html`), scroll sections:

| Section | ID | Konten |
|---------|----|--------|
| **Navbar** | `#navbar` | Logo (zap + nama), nav links (Tentang, Skills, Proyek & Lab, Perjalanan, Kontak), CTA "Hubungi Saya", mobile toggle |
| **Hero** | `#hero` | Badge status (Junior Ready / Continuous Learner), H1, subtitle, 2 CTA, stats (4 Domain, Real Lab Hardware & Multi-Node, 100% Transparan), right card (overview pilar keahlian & floating badges) |
| **About** | `#about` | Foto, bio pemahaman sistem end-to-end (hardware fisik, server, web, AI vibe coding transparan), badges (Hardware, Proxmox, Web/Midtrans, AI Tools, Guitar) |
| **Skills** | `#skills` | Grid 4 pilar lengkap dengan komponen riil: (1) IoT & Hardware Fisik, (2) Jaringan & Homelab Server, (3) Web Development & Transaksi, (4) AI-Assisted Workflow & Vibe Coding |
| **Projects** | `#projects` | 4 Case Studies & Lab Riil: (1) Smart Locker Paket 3-Kompartemen (ESP32 FreeRTOS Dual-Core, ESP32-CAM UART, e-KTP RFID RC522, OTP Telegram Auto-burn, 3x VL53L0X ToF, PCF8574, MC-38, NVS - HKI Kemenkumham RI), (2) Lab Keamanan Jaringan 2-Node Proxmox (pfSense, Wazuh, Kali Linux), (3) Stasiun Monitoring Cuaca Wemos D1 + BMP280 + AHT20, (4) Web E-Commerce Toko Online + Midtrans Gateway |
| **Experience** | `#experience` | Timeline Riwayat Praktikum & Eksplorasi: AI Vibe Coding & Homelab Security (2024–Now), Praktikum Jaringan/Server Debian & Perakitan IoT Fisik Smart Locker (2023–2024), Fondasi Pemrograman & Web Perkuliahan (2022–2023) |
| **Contact** | `#contact` | Form kontak + availability banner + info direct (Email: pratama.ranggaayi@gmail.com, GitHub: rangga-ayi, LinkedIn) |
| **Footer** | `#footer` | Logo, copyright, social links, legal & PRD link |

---

## 5. Halaman Detail

### 5.1 Navbar
- Logo: icon `zap` + nama "Rangga"
- Links: Tentang, Skills, Proyek & Lab, Perjalanan, Kontak
- CTA: `btn btn-primary btn-pill` "Hubungi Saya"

### 5.2 Hero
- Badge: `dot-pulse` hijau + "Junior Ready · Continuous Learner · Hands-on Mindset"
- H1: "Rangga" + Role "Junior IT Generalist & Tech Explorer"
- Subtitle: Menjelaskan kemampuan menghubungkan hardware IoT fisik, lab jaringan Proxmox, web transaksi, dan AI tools modern.
- Stats: `4` Domain Eksplorasi / `Real Lab` Hardware & Multi-Node / `100%` Transparan & Adaptif
- Right Card: Progress visual 4 domain + floating badges (`cpu`, `server`, `bot`)

### 5.3 About
- Foto profil & status "Open to Opportunities"
- Narasi tentang pemahaman sistem end-to-end dan transparansi pemanfaatan AI tools / vibe coding sembari terus belajar
- Highlight hobi: Bermain gitar (kreativitas & fokus)

### 5.4 Skills (4 Pilar Spesifik)
1. **IoT & Hardware Prototyping (Fisik & Sim)**: ESP32, ESP32-CAM, ESP8266 (Wemos D1 Mini), Arduino Uno/Nano, ATmega8535, VL53L0X (Laser ToF), BMP280, AHT20, RC522 RFID, DHT22, PIR, Solenoid Lock, Relay, LCD 16x2, Solder, Multitester, Wokwi, Fritzing, Node-RED.
2. **Jaringan, Homelab Server & Keamanan**: Proxmox VE (2-Laptop Node), Debian Linux Server (Web, DNS Bind9, FTP/Samba), pfSense Firewall/Router, Wazuh SIEM, Suricata IDS, Kali Linux, Nmap/Zenmap, hping3, Hydra, Cisco Packet Tracer (VLAN, Routing, Subnetting VLSM), Krimping Kabel LAN UTP.
3. **Web Development & Integrasi Transaksi**: HTML5, CSS3, JavaScript dasar, PHP, MySQL, Midtrans Snap Sandbox API, Python dasar, Android Studio (Java), Visual Studio (Visual Basic).
4. **AI-Assisted Workflow & Vibe Coding**: Antigravity IDE, Claude Code, DeepSeek LLM, Ollama (Lokal LLM), AI Prompt Orchestration, Vibe Coding Methodology, Git & GitHub, VS Code.

### 5.5 Proyek & Lab
- **Proyek 1**: Smart Locker Paket 3-Kompartemen (ESP32 FreeRTOS Dual-Core, ESP32-CAM UART, RFID RC522 e-KTP, Telegram Bot OTP Auto-burn, 3x VL53L0X Laser ToF, 3x MC-38 Magnetic Switch, PCF8574 I2C, Solenoid Lock 12V, NVS Storage - HKI Kemenkumham RI EC002026135705)
- **Proyek 2**: Lab Keamanan Jaringan: 2-Node Proxmox Red vs Blue Team (pfSense, Wazuh SIEM, Debian Server, Kali Linux)
- **Proyek 3**: Stasiun Monitoring Cuaca & Tekanan Atmosfer (ESP8266 Wemos D1, BMP280, AHT20, I2C Protocol)
- **Proyek 4**: Web E-Commerce Toko Online + Midtrans Gateway (PHP, MySQL, Midtrans Snap API)

### 5.6 Perjalanan Belajar (Timeline)
- 2024 – Sekarang: Eksplorasi AI Vibe Coding & Homelab Security
- 2023 – 2024: Praktikum Lab Jaringan, Server Debian & Perakitan IoT Fisik
- 2022 – 2023: Fondasi Pemrograman & Web E-Commerce Perkuliahan

### 5.7 Contact & Footer
- Form kontak fungsional (Formspree)
- Status ketersediaan junior / lab / internship
- Social links & PRD link

---

## 6. Non-Functional Requirements

### 6.1 Performance
- Lighthouse Performance ≥ 90 (statis, no JS heavy)
- Font via `<link>` di head (bukan `@import`) — ga render-blocking
- Lucide via CDN, `lucide.createIcons()` di DOMContentLoaded

### 6.2 SEO
- Meta tags: `title`, `description`, `og:title`, `og:description`, `og:type`, `og:url`
- Favicon: data-URI SVG `zap` path (bukan emoji)

### 6.3 A11y
- Skip nav link (CSS-only `.skip-link`, `:focus` muncul)
- `:focus-visible` ring hijau
- Form labels eksplisit (`label for`)
- Button submit: disabled + loading state
- Kontras ≥ 4.5:1

### 6.4 Responsive
- Mobile first
- <992px: hero 1 kolom, skills-bento 1 kolom
- <640px: nav-links → hamburger, grid 1 kolom, hero-stats wrap, footer-center
- Icons: semuanya Lucide (SVG) — no emoji

### 6.5 Maintainability
- Update project: edit `#projects` section di HTML, push
- Deploy: `git push` → auto deploy via GitHub Pages

---

## 7. File Structure

```
/
├── index.html          # Main page (single)
├── style.css           # Semua styling (neo-brutalist, custom CSS)
├── assets/
│   └── profile.jpg     # Foto pribadi
├── PRD.md              # Dokumen ini
└── README.md           # Quick start
```

---

## 8. Design Direction

- **Style**: Neo-brutalist — border 2-3px solid `#1E293B`, hard shadow (`4px 4px 0px`), rounded-lg
- **Palette**: Multi-aksen vibrant di atas cream (`#FFFDF7`):
  - Green: `#22C55E` (primary CTA, progress)
  - Blue: `#BAE6FD` (secondary)
  - Pink: `#FECDD3`, Yellow: `#FEF08A`, Purple: `#E9D5FF`, Orange: `#FFEDD5` (badges, chips, banner)
  - Text: `#1E293B`, muted `#64748B`
- **Shadow**: hard offset `2-8px`, bukan diffuse — konsisten light source
- **Card**: `neo-card` — bg white, border, hard shadow, hover translate(-3px,-3px) + shadow-lg
- **Button**: tactile — hover translate(-2px,-2px), active translate(2px,2px)
- **Typografi**: Fredoka (heading), Nunito (body), weights 400-900
- **Icon**: Lucide stroke 2, `currentColor`, konsisten size per konteks
- **Motion**: float animation badges, hover/active states, transisi 0.15-0.2s

---

## 9. Open Questions

Yang perlu diisi setelah implementasi:
- [ ] Nama lengkap
- [ ] Role / title
- [ ] Bio (2-3 kalimat)
- [ ] Skill list (aktual)
- [ ] Project list (nama, desk, link)
- [ ] GitHub username
- [ ] LinkedIn URL
- [ ] Email (Formspree endpoint)

---

## 10. Success Metrics

| Metrik | Target |
|--------|--------|
| Page load | < 2s |
| Recruiter action | Contact form submit / LinkedIn click |
| Mobile score | Lighthouse ≥ 85 |
| Maintainability | 1 file edit, 1 push → deploy |

---

## 11. Timeline

- **PRD**: ✅ selesai
- **Implementasi**: ✅ selesai (index.html + style.css)
- **Data real**: isi nama, foto, skill, project, social
- **Deploy**: `git push origin main` → GitHub Pages