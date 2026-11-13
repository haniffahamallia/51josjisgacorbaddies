# Class 5.1 — Our Little Universe 🩵

Website resmi kelas 5.1 yang cute, minimalis, modern, dan fully responsive.

## Fitur Utama

- **Home**: Welcome, live clock, countdown, random quote, announcements, greeting otomatis
- **Members**: 20 kartu profil dengan search + filter absen, modal detail lengkap
- **Jadwal Pelajaran**: Senin–Jumat
- **Jadwal Piket**: Kartu pastel per hari
- **Memories**: Placeholder galeri kenangan
- **Fun Zone**: Birthday Corner, games placeholders
- **Digital Guestbook**: Pesan tersimpan di localStorage
- **Music Player**: UI untuk "Kita — Sheila On 7" (lihat catatan hak cipta)
- Loading screen, progress bar, back-to-top, mobile bottom nav, smooth animations

## Desain

- Warna: Baby Blue, Putih, Navy
- Aesthetic: Cute, minimalis, modern, soft shadows, rounded cards
- Fully responsive + mobile friendly

## Cara Deploy ke GitHub Pages

1. Buat repository baru di GitHub (misal: `class-5-1` atau `class51`)
2. Upload semua file di folder ini ke root repository
3. Pergi ke **Settings → Pages**
4. Source: Deploy from branch `main` (atau `master`), folder `/ (root)`
5. Tunggu beberapa menit, lalu buka `https://<username>.github.io/<repo-name>/`

## Catatan Musik

Lagu **"Kita" oleh Sheila On 7** dilindungi hak cipta.  
Website ini **tidak** menyertakan file audio copyrighted.

- Tombol Play akan mencoba memutar audio (jika kamu menambahkan file legal ke `assets/`)
- Atau membuka official audio di YouTube: https://www.youtube.com/watch?v=qFZI6kPtOh0
- Untuk produksi, gunakan sumber yang sudah dilisensikan atau hapus fitur audio.

## Menambah Foto Anggota

Ganti avatar inisial dengan foto:
1. Simpan foto di `assets/photos/`
2. Edit `js/data.js` → tambah properti `photo: "assets/photos/nama.jpg"`
3. Update render di `js/main.js` untuk menampilkan `<img>` jika ada photo.

## Custom Domain

Setelah GitHub Pages aktif, kamu bisa set custom domain di Settings → Pages.

---

Made with 🩵 for Class 5.1  
ONE CLASS · TWENTY PEOPLE · ENDLESS STORIES
