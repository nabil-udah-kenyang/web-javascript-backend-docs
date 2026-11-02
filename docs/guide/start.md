# Cara memakai handbook

Belajar di sini seperti mengikuti jalur hiking: setiap bab punya tujuan, bekal konsep, contoh, lalu checkpoint. Tidak perlu menghafalkan semua API dalam sekali duduk.

## Sebelum mulai

- Pastikan Node.js sudah terpasang: `node --version`.
- Siapkan editor dan satu folder latihan terpisah.
- Jalankan contoh JavaScript dengan `node nama-file.js`.
- Untuk TypeScript, gunakan TypeScript Playground lebih dulu atau project lokal setelah membaca bab konfigurasi.

Contoh project kecil untuk JavaScript:

```bash:line-numbers
mkdir belajar-js
cd belajar-js
npm init -y
touch index.js
node index.js
```

## Pola membaca setiap bab

1. Baca tujuan bab dan istilah kunci.
2. Jalankan potongan kode persis seperti ditulis.
3. Ubah satu hal: nilai input, nama property, atau urutan operasi.
4. Kerjakan latihan tanpa melihat jawaban.
5. Centang checkpoint hanya jika bisa menjelaskan alasan kodenya bekerja.

::: warning Jangan lompat ke TypeScript terlalu cepat
TypeScript membantu memberi label pada JavaScript, tetapi tidak menggantikan pemahaman tentang runtime JavaScript. Selesaikan setidaknya Tahap 1–4 sebelum masuk jauh ke TypeScript.
:::

## Konvensi contoh kode

Contoh menggunakan ESM ketika membahas module modern. Untuk menjalankannya, tambahkan `"type": "module"` di `package.json`, atau gunakan ekstensi `.mjs`.

```json:line-numbers
{
  "type": "module",
  "scripts": {
    "start": "node src/index.js"
  }
}
```

Nomor baris sengaja ditampilkan agar mudah membicarakan bagian tertentu dari contoh. Nomor itu bukan bagian dari kode yang perlu kamu ketik.

## Batasan materi

Database, SQL, relasi, migration, ORM, CRUD database, autentikasi, deployment, dan Express secara mendalam berada di luar handbook ini. Semua itu akan lebih mudah dipelajari setelah fondasi bahasa dan asynchronous programming kamu kuat.

## Progress pribadi

Kamu bisa membuat salinan checklist dari roadmap, lalu menulis satu kalimat “aku sudah paham karena…” untuk setiap topik. Kalimat itu jauh lebih berguna daripada sekadar mencentang.
