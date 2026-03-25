# Protex Solutions Website

> Solusi IT Infrastructure & UPS Terpercaya di Indonesia

## 🚀 Deploy TANPA Install Apapun (Langsung dari Browser)

### Step 1: Buat Repository GitHub
1. Buka https://github.com/new
2. Repository name: `protex-solutions`
3. Pilih **Public**
4. Klik **Create repository**

### Step 2: Upload Semua File
1. Di halaman repo, klik **"uploading an existing file"**
2. **Drag & drop SEMUA file dan folder** dari zip ini
3. Pastikan struktur folder-nya benar (lihat dibawah)
4. Klik **Commit changes**

### Step 3: Aktifkan GitHub Pages
1. Buka repo → **Settings** → **Pages**
2. Source: pilih **GitHub Actions**
3. Klik **Save**

### Step 4: Tunggu Build Selesai
1. Buka tab **Actions** di repo
2. Tunggu workflow "Deploy to GitHub Pages" selesai (± 2 menit)
3. Kalau ada ✅ hijau = SUKSES

### Step 5: Website LIVE! 🎉
Buka: `https://USERNAME.github.io/protex-solutions`

---

## 📁 Struktur File

```
protex-solutions/
├── .github/
│   └── workflows/
│       └── deploy.yml        ← Auto build & deploy
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── ProtexSolutions.jsx   ← Website utama
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## ✏️ Edit Website Langsung di GitHub
1. Buka file `src/ProtexSolutions.jsx` di GitHub
2. Klik icon pensil (Edit)
3. Edit konten yang mau diubah
4. Klik **Commit changes**
5. GitHub otomatis rebuild & deploy ulang!
