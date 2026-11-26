# PilemQu — Website Penjelajahan Film

PilemQu merupakan website katalog dan penjelajahan film yang memungkinkan pengguna untuk mencari, melihat informasi, serta menemukan berbagai film berdasarkan kategori dan rekomendasi.

Project ini dikembangkan sebagai bagian dari tugas mata kuliah Pengujian Perangkat Lunak menggunakan React, Vite, JavaScript, dan TMDB API.

## Fitur Website

- Home & Popular Movies
- Now Playing Movies
- Upcoming Movies
- Top Rated Movies
- Pencarian Film
- Detail Film
- Genre Film
- Rekomendasi Film
- Responsive Website

## Teknologi yang Digunakan

- React
- Vite
- JavaScript
- CSS
- Fetch API
- TMDB API
- Git & GitHub

## Anggota Tim dan Pembagian Tugas

| Anggota | Tanggung Jawab |
|---|---|
| Maintainer | Setup project, Home & Popular Movies, integrasi fitur, code review, dan merge |
| Developer 2 | Now Playing & Upcoming Movies |
| Developer 3 | Search & Movie Detail |
| Developer 4 | Genre & Recommendations |

---

# Panduan Instalasi dan Setup Project

Panduan ini digunakan oleh seluruh anggota tim untuk menjalankan project PilemQu di komputer masing-masing.

## 1. Persiapan Software

Pastikan software berikut sudah terinstal sebelum menjalankan project:

- Node.js
- npm
- Git
- Visual Studio Code (disarankan)
- TMDB API Key

### Mengecek Node.js dan npm

Buka terminal atau Git Bash, kemudian jalankan:

```bash
node -v
npm -v
```

Jika keduanya menampilkan versi, berarti Node.js dan npm sudah terinstal.

### Mengecek Git

```bash
git --version
```

Jika muncul versi Git, maka Git sudah siap digunakan.

---

## 2. Clone Repository

Clone repository PilemQu dari GitHub.

```bash
git clone https://github.com/yudhaa27/ppl-kelompok3-projectPilemQu.git
```

Setelah proses clone selesai, masuk ke folder project:

```bash
cd ppl-kelompok3-projectPilemQu
```

---

## 3. Instalasi Dependency

Setelah berada di dalam folder project, jalankan:

```bash
npm install
```

Perintah tersebut digunakan untuk menginstal seluruh dependency yang dibutuhkan project berdasarkan file `package.json`.

Tunggu sampai proses instalasi selesai.

---

## 4. Konfigurasi TMDB API Key

PilemQu menggunakan TMDB API untuk mengambil data film.

Setiap anggota tim perlu menyiapkan API Key sendiri untuk menjalankan project secara lokal.

### Cara mendapatkan TMDB API Key

1. Buka website TMDB: https://www.themoviedb.org/
2. Buat akun atau login.
3. Buka pengaturan akun.
4. Masuk ke bagian API.
5. Daftarkan API Key sesuai kebutuhan.
6. Salin API Key yang telah diperoleh.

### Membuat file `.env`

Buat file baru bernama `.env` pada folder root project.

Folder root merupakan folder yang berisi `package.json`, `vite.config.js`, dan `README.md`.

Isi file `.env` dengan format berikut:

```env
VITE_TMDB_API_KEY=API_KEY_MILIK_KAMU
```

Ganti `API_KEY_MILIK_KAMU` dengan API Key TMDB masing-masing.

### Hal yang perlu diperhatikan

- Nama variabel harus tepat: `VITE_TMDB_API_KEY`.
- Jangan menambahkan spasi di sekitar tanda `=`.
- Jangan mengunggah file `.env` ke GitHub.
- File `.env` telah diatur agar diabaikan oleh Git.
- Jika mengubah API Key ketika server sedang berjalan, restart server terlebih dahulu.

---

## 5. Menjalankan Project

Setelah dependency terinstal dan file `.env` selesai dibuat, jalankan:

```bash
npm run dev
```

Setelah server berjalan, terminal akan menampilkan alamat localhost.

Biasanya alamatnya adalah:

http://localhost:5173

Buka alamat tersebut di browser untuk melihat website PilemQu.

Untuk menghentikan server, tekan:

```bash
Ctrl + C
```

---

## 6. Struktur Folder Project

Berikut merupakan struktur folder project PilemQu:

```text
ppl-kelompok3-projectPilemQu/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │
│   ├── pages/
│   │
│   ├── services/
│   │   └── tmdb.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

### Penjelasan folder

| Folder/File | Fungsi |
|---|---|
| `public/` | Menyimpan aset publik yang dapat diakses langsung |
| `src/assets/` | Menyimpan aset seperti gambar dan file pendukung |
| `src/components/` | Menyimpan komponen UI yang dapat digunakan kembali |
| `src/pages/` | Menyimpan halaman website |
| `src/services/` | Menyimpan fungsi untuk komunikasi dengan API |
| `App.jsx` | Komponen utama aplikasi |
| `App.css` | Styling komponen utama |
| `index.css` | Styling global |
| `main.jsx` | Entry point React |
| `.env` | Konfigurasi API Key lokal |
| `.env.example` | Template konfigurasi API |
| `package.json` | Informasi project dan dependency |

---

# Panduan Git Workflow dan Kolaborasi

PilemQu menggunakan sistem Feature Branch Workflow.

Setiap anggota tim mengerjakan fitur masing-masing melalui branch terpisah. Perubahan fitur kemudian diajukan melalui Pull Request untuk ditinjau oleh Maintainer sebelum digabungkan ke branch `main`.

## 7. Memastikan Berada di Branch Main

Setelah project berhasil di-clone, pastikan berada di branch `main`.

```bash
git switch main
```

## 8. Mengambil Update Terbaru

Sebelum mulai mengerjakan fitur, ambil perubahan terbaru dari repository GitHub.

```bash
git pull origin main
```

Langkah ini bertujuan agar project lokal memiliki versi terbaru dari branch `main`.

## 9. Membuat Branch Fitur

Setiap developer wajib membuat branch sesuai fitur yang dikerjakan.

### Developer 2 — Now Playing & Upcoming

```bash
git switch -c feature/now-playing-upcoming
```

### Developer 3 — Search & Movie Detail

```bash
git switch -c feature/search-detail
```

### Developer 4 — Genre & Recommendations

```bash
git switch -c feature/genre-recommendation
```

Jika ingin mengerjakan fitur Top Rated:

```bash
git switch -c feature/top-rated
```

Pastikan nama branch sesuai dengan fitur dan Issue yang telah ditugaskan.

---

## 10. Mengerjakan Fitur

Setelah branch berhasil dibuat, developer dapat mulai mengerjakan fitur masing-masing.

Hal yang perlu diperhatikan:

- Kerjakan fitur sesuai Issue yang telah diberikan.
- Jangan mengubah fitur milik anggota lain tanpa koordinasi.
- Hindari mengubah file yang sama secara bersamaan tanpa komunikasi.
- Gunakan komponen yang dapat digunakan kembali.
- Pastikan fitur berjalan sebelum melakukan commit.
- Periksa perubahan menggunakan `git status`.

---

## 11. Menyimpan Perubahan dengan Commit

Setelah fitur selesai atau terdapat perubahan yang siap disimpan, periksa terlebih dahulu:

```bash
git status
```

Tambahkan perubahan ke staging:

```bash
git add .
```

Kemudian simpan perubahan dengan commit:

```bash
git commit -m "feat: add now playing and upcoming movies"
```

Sesuaikan pesan commit dengan fitur yang dikerjakan.

---

## 12. Push Branch ke GitHub

Setelah commit berhasil, kirim branch ke GitHub.

Contoh Developer 2:

```bash
git push -u origin feature/now-playing-upcoming
```

Developer lain menyesuaikan nama branch masing-masing.

---

## 13. Membuat Pull Request

Setelah branch berhasil di-push ke GitHub, developer harus membuat Pull Request.

Langkah-langkah:

1. Buka repository PilemQu di GitHub.
2. Masuk ke tab Pull Requests.
3. Klik New Pull Request.
4. Pilih branch fitur yang telah dibuat sebagai source branch.
5. Pilih `main` sebagai target branch.
6. Periksa perubahan yang akan diajukan.
7. Buat Pull Request.
8. Tunggu proses review oleh Maintainer.
9. Jika terdapat revisi, perbaiki kode pada branch yang sama dan push kembali.
10. Jika sudah disetujui, Maintainer akan melakukan merge ke `main`.

Developer tidak diperbolehkan melakukan merge secara langsung tanpa persetujuan Maintainer.

---

# 14. Aturan Penamaan Branch

| Fitur | Nama Branch |
|---|---|
| Home & Popular Movies | `feature/home` |
| Now Playing & Upcoming | `feature/now-playing-upcoming` |
| Search & Movie Detail | `feature/search-detail` |
| Genre & Recommendations | `feature/genre-recommendation` |
| Top Rated Movies | `feature/top-rated` |

---

# 15. Aturan Penulisan Commit

Gunakan pesan commit yang jelas dan menjelaskan perubahan yang dilakukan.

| Prefix | Kegunaan | Contoh |
|---|---|---|
| `feat` | Menambahkan fitur | `feat: add movie search` |
| `fix` | Memperbaiki bug | `fix: fix movie poster rendering` |
| `style` | Perubahan tampilan | `style: improve movie card layout` |
| `refactor` | Merapikan kode | `refactor: organize movie components` |
| `docs` | Perubahan dokumentasi | `docs: update setup guide` |
| `test` | Menambahkan atau memperbaiki pengujian | `test: add movie search test` |

Contoh perintah:

```bash
git commit -m "feat: add movie search"
```

---

# 16. Aturan Kolaborasi Tim

Seluruh anggota tim wajib mengikuti aturan berikut:

- Tidak melakukan push langsung ke `main`.
- Menggunakan branch masing-masing untuk pengembangan fitur.
- Mengambil update terbaru dari `main` sebelum membuat branch fitur baru.
- Tidak mengunggah file `.env` ke GitHub.
- Melakukan commit dengan pesan yang jelas.
- Membuat Pull Request untuk setiap fitur yang akan diintegrasikan.
- Tidak melakukan merge tanpa persetujuan Maintainer.
- Berkoordinasi ketika mengubah file yang digunakan bersama.
- Memastikan fitur telah diuji sebelum membuat Pull Request.

---

# 17. Atribusi TMDB

Project PilemQu menggunakan TMDB API untuk memperoleh data film.

This product uses the TMDB API but is not endorsed or certified by TMDB.

Dokumentasi TMDB:

https://developer.themoviedb.org/docs

---

# 18. Ringkasan Setup

Berikut merupakan rangkaian perintah untuk menjalankan project setelah repository tersedia di GitHub.

```bash
git clone https://github.com/USERNAME/ppl-kelompok3-projectPilemQu.git

cd ppl-kelompok3-projectPilemQu

npm install
```

Buat file `.env` dan isi API Key TMDB.

Kemudian jalankan:

```bash
npm run dev
```

Project PilemQu siap dikembangkan!

---

**PilemQu — Discover Your Next Favorite Movie.**
```
Link Website: https://ppl-kelompok3-projectpilemquu.vercel.app
