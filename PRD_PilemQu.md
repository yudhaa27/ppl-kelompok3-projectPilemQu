# PRD — PilemQu

> **Product Requirements Document (PRD)**  
> Website katalog dan eksplorasi film berbasis TMDB API  
> Versi: 1.0

## 1. Ringkasan Produk

**PilemQu** adalah website katalog dan eksplorasi film yang memungkinkan pengguna menemukan film, melihat film populer, film yang sedang tayang, film yang akan datang, film dengan rating tertinggi, mencari film, melihat detail film, serta menjelajahi film berdasarkan genre dan rekomendasi.

PilemQu menggunakan data dari **The Movie Database (TMDB) API**. Website ini bukan layanan streaming dan tidak menyediakan pemutaran film.

## 2. Latar Belakang

Informasi film tersebar pada berbagai sumber dan pengguna membutuhkan cara yang sederhana untuk menemukan film serta memahami informasi dasar film sebelum memutuskan untuk menontonnya. PilemQu dirancang sebagai katalog film dengan navigasi dan penyajian informasi yang mudah digunakan.

Proyek ini juga menjadi media praktik kolaborasi pengembangan perangkat lunak menggunakan Git dan GitHub, termasuk branch, commit, Issues, Pull Request, code review, dan merge.

## 3. Tujuan Produk

- Menyediakan katalog film yang mudah dijelajahi.
- Menampilkan informasi film yang bersumber dari TMDB.
- Memungkinkan pengguna mencari film berdasarkan judul.
- Memungkinkan pengguna menjelajahi film berdasarkan kategori genre.
- Menampilkan detail dan rekomendasi film.
- Menyelesaikan proyek melalui kolaborasi GitHub Flow.

## 4. Target Pengguna

- Pengguna yang ingin menemukan film untuk ditonton.
- Pengguna yang ingin melihat informasi, rating, genre, dan sinopsis film.
- Pengguna yang ingin mencari atau menjelajahi katalog film berdasarkan genre.

## 5. Ruang Lingkup

### 5.1 In-Scope

- Home / Popular Movies
- Now Playing
- Upcoming Movies
- Top Rated Movies
- Search Movies
- Movie Detail
- Genre dan daftar film berdasarkan genre
- Movie Recommendations
- Responsive layout untuk desktop dan mobile
- Loading, empty, dan error state
- Integrasi TMDB API
- Kolaborasi GitHub Flow dan dokumentasi

### 5.2 Out-of-Scope

- Streaming atau pemutaran film
- Pembelian atau penyewaan film
- Akun pengguna dan autentikasi
- Komentar, ulasan, dan rating yang dibuat pengguna
- Favorit atau watchlist yang tersimpan lintas perangkat
- Backend dan database khusus untuk aplikasi
- Aplikasi mobile native

## 6. Teknologi

| Teknologi | Penggunaan |
|---|---|
| React | Pembangunan UI berbasis komponen |
| Vite | Development server dan build tool |
| JavaScript | Logika aplikasi |
| Fetch API | Mengakses TMDB API |
| CSS | Styling dan responsive layout |
| React Router | Navigasi halaman (jika digunakan) |
| TMDB API | Sumber data film |
| Git | Version control |
| GitHub | Repository, Issues, Projects, Pull Request, review |

## 7. Sumber Data dan API

PilemQu menggunakan TMDB API. Endpoint yang telah diuji oleh tim:

| Fitur | Endpoint |
|---|---|
| Popular | `/3/movie/popular` |
| Now Playing | `/3/movie/now_playing` |
| Upcoming | `/3/movie/upcoming` |
| Top Rated | `/3/movie/top_rated` |
| Genre list | `/3/genre/movie/list` |

Endpoint yang direncanakan untuk fitur lanjutan:

| Fitur | Endpoint |
|---|---|
| Movie search | `/3/search/movie` |
| Movie detail | `/3/movie/{movie_id}` |
| Movies by genre | `/3/discover/movie` |
| Recommendations | `/3/movie/{movie_id}/recommendations` |

Dokumentasi: https://developer.themoviedb.org/docs

### 7.1 Data Film yang Ditampilkan

- ID film
- Judul
- Poster
- Backdrop (jika tersedia)
- Sinopsis
- Tanggal rilis
- Rating
- Genre
- Data tambahan pada halaman detail, sesuai respons API

### 7.2 API Key

- API key tidak boleh dimasukkan ke commit publik.
- Gunakan file environment lokal seperti `.env`.
- Untuk proyek Vite, konfigurasi variabel yang digunakan frontend dapat terekspos pada browser dan bukan rahasia yang aman. Jangan menggunakan key untuk akses sensitif.
- Sertakan `.env` dalam `.gitignore`.
- Sediakan `.env.example` tanpa nilai key asli.

## 8. Functional Requirements

### FR-01 — Home / Popular Movies

- Sistem menampilkan halaman utama PilemQu.
- Sistem mengambil dan menampilkan film populer dari TMDB.
- Sistem menampilkan poster dan informasi ringkas film.
- Pengguna dapat membuka detail film dari kartu film.
- Sistem menyediakan navigasi ke halaman fitur lainnya.

### FR-02 — Now Playing

- Sistem mengambil data film yang sedang tayang.
- Sistem menampilkan daftar film.
- Pengguna dapat membuka detail film.

### FR-03 — Upcoming Movies

- Sistem mengambil data film yang akan datang.
- Sistem menampilkan daftar film.
- Pengguna dapat membuka detail film.

### FR-04 — Top Rated Movies

- Sistem mengambil data film dengan rating tertinggi.
- Sistem menampilkan daftar film.
- Pengguna dapat membuka detail film.

### FR-05 — Search Movies

- Pengguna dapat memasukkan judul film pada input pencarian.
- Sistem mengambil hasil pencarian dari TMDB.
- Sistem menampilkan hasil yang sesuai.
- Sistem menampilkan empty state jika tidak ada hasil.
- Sistem menangani input kosong dan error API.

### FR-06 — Movie Detail

- Pengguna dapat membuka halaman detail suatu film.
- Sistem mengambil data film berdasarkan ID.
- Sistem menampilkan informasi film yang tersedia, seperti judul, sinopsis, poster/backdrop, rating, tanggal rilis, dan genre.

### FR-07 — Genre

- Sistem mengambil daftar genre dari TMDB.
- Sistem menampilkan genre yang tersedia.
- Pengguna dapat memilih genre.
- Sistem menampilkan film yang sesuai dengan genre pilihan.

### FR-08 — Recommendations

- Sistem mengambil rekomendasi film dari endpoint rekomendasi TMDB berdasarkan film yang dipilih.
- Sistem menampilkan rekomendasi jika data tersedia.
- Pengguna dapat membuka detail film rekomendasi.

### FR-09 — Loading, Error, dan Empty State

- Sistem menampilkan indikator loading saat data sedang diambil.
- Sistem menampilkan pesan error yang ramah jika permintaan gagal.
- Sistem menampilkan pesan yang sesuai ketika data tidak tersedia.
- Sistem menyediakan cara untuk mencoba kembali jika memungkinkan.

### FR-10 — Responsive UI

- Layout dapat digunakan pada desktop, tablet, dan mobile.
- Navigasi dan kartu film menyesuaikan ukuran layar.
- Konten tidak menyebabkan horizontal overflow yang tidak diperlukan.

## 9. Non-Functional Requirements

### NFR-01 — Usability

Navigasi harus mudah dipahami, konsisten, dan tidak membingungkan.

### NFR-02 — Performance

- Hindari request API yang tidak diperlukan.
- Gunakan pagination TMDB bila relevan.
- Gunakan ukuran gambar yang sesuai.
- Tampilkan loading state selama request berlangsung.

### NFR-03 — Reliability

- Aplikasi menangani kegagalan request dan data kosong.
- Error API tidak membuat seluruh halaman gagal bila dapat ditangani secara lokal.

### NFR-04 — Maintainability

- Komponen UI, halaman, service API, dan aset disusun secara terstruktur.
- Hindari duplikasi logika request API.
- Gunakan penamaan file dan komponen yang konsisten.

### NFR-05 — Security

- API key tidak disimpan di repository.
- `.env` diabaikan oleh Git.
- Tidak memasukkan credential ke screenshot, Issue, PR, atau dokumentasi publik.

### NFR-06 — Compatibility

Website dapat digunakan pada browser modern, terutama Google Chrome.

## 10. UI/UX Guidelines

- Gunakan gaya visual sinematik yang berfokus pada poster dan backdrop film.
- Gunakan hierarki visual yang jelas.
- Navigasi utama konsisten di seluruh halaman.
- Kartu film memiliki informasi ringkas dan affordance untuk membuka detail.
- Gunakan placeholder atau fallback jika poster tidak tersedia.
- Gunakan layout responsive.
- Desain boleh dikembangkan oleh tim, tetapi konsistensi komponen harus dijaga.

## 11. Struktur Halaman

| Halaman | Deskripsi |
|---|---|
| Home | Banner/featured dan Popular Movies |
| Now Playing | Daftar film yang sedang tayang |
| Upcoming | Daftar film yang akan datang |
| Top Rated | Daftar film dengan rating tinggi |
| Search | Hasil pencarian film |
| Movie Detail | Informasi film |
| Genre | Daftar genre dan film per genre |

## 12. Rencana Struktur Folder

Struktur dapat disesuaikan saat implementasi.

```text
PilemQu/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieList.jsx
│   │   ├── Loading.jsx
│   │   └── ErrorMessage.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── NowPlaying.jsx
│   │   ├── Upcoming.jsx
│   │   ├── TopRated.jsx
│   │   ├── Search.jsx
│   │   ├── MovieDetail.jsx
│   │   └── Genre.jsx
│   ├── services/
│   │   └── tmdb.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 13. Team & Responsibility

Tim terdiri dari empat anggota.

| Anggota | Peran | Tanggung Jawab |
|---|---|---|
| Anggota 1 (Maintainer) | Project setup, Home, integrasi | Setup React + Vite, konfigurasi API, Home/Popular, integrasi, review dan merge PR |
| Anggota 2 (Developer) | Now Playing & Upcoming | Halaman Now Playing dan Upcoming |
| Anggota 3 (Developer) | Search & Detail | Search Movies dan Movie Detail |
| Anggota 4 (Developer) | Genre & Recommendations | Genre, discover by genre dan recommendations |

Pembagian dapat disesuaikan jika beban kerja anggota berubah, tetapi pekerjaan tetap dicatat melalui Issues.

## 14. GitHub Workflow

PilemQu menerapkan GitHub Flow.

1. Maintainer memastikan branch `main` berisi versi stabil.
2. Setiap pekerjaan dicatat sebagai Issue.
3. Developer memperbarui branch lokal berdasarkan `main`.
4. Developer membuat feature branch sesuai Issue.
5. Developer mengimplementasikan fitur.
6. Developer membuat commit dengan pesan yang jelas.
7. Developer push branch ke repository.
8. Developer membuat Pull Request menuju `main`.
9. Maintainer memeriksa perubahan dan memberikan feedback.
10. Setelah disetujui dan pengecekan selesai, PR di-merge ke `main`.
11. Issue dan Project Board diperbarui.

### 14.1 Branch Naming

| Pekerjaan | Branch |
|---|---|
| Home & setup | `feature/home` |
| Now Playing & Upcoming | `feature/now-playing-upcoming` |
| Search & Detail | `feature/search-detail` |
| Genre & Recommendations | `feature/genre-recommendation` |
| Top Rated (jika terpisah) | `feature/top-rated` |

### 14.2 Commit Convention

Gunakan pesan commit ringkas dan berorientasi tindakan, misalnya:

- `feat: create home page layout`
- `feat: fetch popular movies from TMDB`
- `feat: add movie search`
- `fix: handle missing movie poster`
- `style: improve movie card layout`
- `docs: update project README`

### 14.3 Pull Request Checklist

- [ ] PR terhubung ke Issue terkait.
- [ ] Perubahan tidak langsung dilakukan pada `main`.
- [ ] Aplikasi berhasil dijalankan.
- [ ] Fitur diuji.
- [ ] Tidak ada API key atau credential yang tercommit.
- [ ] Deskripsi PR menjelaskan perubahan.
- [ ] Reviewer memberikan feedback atau approval.
- [ ] PR di-merge setelah pemeriksaan.

## 15. GitHub Project Board

Gunakan Kanban Board dengan status:

- **Todo**: pekerjaan belum dimulai.
- **In Progress**: pekerjaan sedang dikerjakan.
- **Done**: pekerjaan telah selesai dan memenuhi kriteria.

Setiap Issue sebaiknya memiliki assignee, deskripsi, checklist, label, dan Project.

## 16. Labels

| Label | Tujuan |
|---|---|
| `feature` | Fitur baru |
| `setup` | Setup dan konfigurasi |
| `api` | Integrasi atau request API |
| `ui` | UI/UX dan styling |
| `bug` | Perbaikan bug |
| `documentation` | Dokumentasi |

## 17. Testing Plan

Pengujian dilakukan secara bertahap pada setiap fitur dan setelah integrasi.

### 17.1 Functional Testing

| ID | Test | Expected Result |
|---|---|---|
| TC-01 | Membuka Home | Popular Movies tampil |
| TC-02 | Membuka Now Playing | Film yang sedang tayang tampil |
| TC-03 | Membuka Upcoming | Film yang akan datang tampil |
| TC-04 | Membuka Top Rated | Film rating tinggi tampil |
| TC-05 | Melakukan search judul yang valid | Hasil pencarian relevan tampil |
| TC-06 | Search dengan query yang tidak menghasilkan data | Empty state tampil |
| TC-07 | Membuka detail film | Detail film sesuai ID tampil |
| TC-08 | Memilih genre | Film berdasarkan genre tampil |
| TC-09 | Membuka rekomendasi | Rekomendasi tampil jika tersedia |
| TC-10 | Request API gagal | Pesan error tampil |
| TC-11 | Poster tidak tersedia | Fallback image/placeholder tampil |
| TC-12 | Membuka website pada layar mobile | Layout responsive |

### 17.2 Integration Testing

- Memastikan fitur anggota dapat diintegrasikan ke aplikasi.
- Memastikan navigasi antar halaman berfungsi.
- Memastikan penggunaan service API konsisten.
- Memastikan merge tidak menimbulkan konflik atau regresi.
- Menguji fitur utama setelah merge ke branch integrasi/main.

### 17.3 Git Workflow Verification

- Memastikan setiap developer menggunakan branch masing-masing.
- Memastikan commit tercatat.
- Memastikan Pull Request dibuat.
- Memastikan review dilakukan.
- Memastikan merge dilakukan ke `main`.
- Memastikan Issue dan Board diperbarui.

## 18. Milestones

| Milestone | Target |
|---|---|
| M1 — Repository & collaboration setup | Repository, collaborator, Project Board, Issues |
| M2 — Project initialization | React + Vite dan struktur dasar |
| M3 — Core movie features | Home, Now Playing, Upcoming, Top Rated |
| M4 — Discovery features | Search, Detail, Genre, Recommendations |
| M5 — Integration | Integrasi dan perbaikan |
| M6 — Testing & submission | Testing, README, bukti GitHub Workflow |

## 19. Definition of Done

Sebuah fitur dinyatakan selesai apabila:

- Fitur sesuai dengan deskripsi Issue.
- Implementasi tidak mengganggu fitur lain.
- Request API dan data ditangani dengan benar.
- Loading, error, dan empty state yang relevan tersedia.
- Fitur diuji.
- Perubahan sudah dikirim melalui PR.
- PR sudah di-review dan di-merge.
- Issue dan Project Board diperbarui.

## 20. Attribution

PilemQu menggunakan data dan/atau gambar dari TMDB.

PilemQu is not endorsed, certified, or otherwise approved by TMDB.

Untuk penggunaan data TMDB, tim harus mengikuti ketentuan attribution TMDB dan kebijakan penggunaan API yang berlaku. Logo dan attribution TMDB harus ditampilkan sesuai ketentuan resminya.

Referensi:
- https://www.themoviedb.org/
- https://developer.themoviedb.org/docs
- https://developer.themoviedb.org/docs/faq

## 21. Success Criteria

PilemQu dianggap mencapai tujuan proyek apabila:

- Fitur utama katalog film dapat digunakan.
- Data dapat diambil dari endpoint TMDB yang relevan.
- Pengguna dapat mencari dan melihat detail film.
- Pengguna dapat menjelajahi genre dan rekomendasi.
- Website dapat digunakan pada desktop dan mobile.
- Tim menyelesaikan kolaborasi menggunakan Issues, branch, commit, Pull Request, review, dan merge.
- Repository dan dokumentasi siap diperiksa dan diserahkan.
