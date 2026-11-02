# 05 · JavaScript yang relevan untuk Node.js

<div class="eyebrow">Tahap 5 · runtime backend</div>

Node.js adalah runtime yang menjalankan JavaScript di luar browser. Ia memakai V8 untuk mengeksekusi JavaScript dan menyediakan API untuk file system, process, networking, stream, serta event.

## 1. Browser vs Node.js

Browser menyediakan `window`, DOM, dan Web API yang berkaitan dengan halaman. Node.js tidak memiliki DOM, tetapi menyediakan `process`, `fs`, `path`, `Buffer`, dan API server-side lain.

`globalThis` adalah cara lintas lingkungan untuk mengakses global object.

```js:line-numbers
console.log(typeof globalThis)
console.log(process.platform)
console.log(process.version)
console.log(globalThis === global) // true di Node.js CommonJS; periksa konteks module
```

Jangan menganggap API browser selalu tersedia di semua versi Node.js. `fetch` sudah tersedia di Node.js modern, tetapi tetap cek versi runtime project.

## 2. Environment variable dan argument

`process.env` berisi konfigurasi dari environment dan seluruh nilainya berupa string.

```js:line-numbers
const port = Number(process.env.PORT ?? 3000)
const mode = process.env.NODE_ENV ?? 'development'

console.log({ port, mode })
console.log('arguments:', process.argv.slice(2))
```

Jangan menyimpan secret langsung di source code. Saat membaca environment variable, validasi nilainya agar aplikasi gagal cepat dengan pesan yang jelas.

```js:line-numbers
function readPort(value) {
  const port = Number(value)
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT harus berupa integer 1–65535')
  }
  return port
}

const port = readPort(process.env.PORT ?? '3000')
```

## 3. Membaca dan menulis file dengan `fs`

API promise menghindari callback bertingkat.

```js:line-numbers
import { readFile, writeFile } from 'node:fs/promises'

const filePath = new URL('./notes.json', import.meta.url)

async function loadNotes() {
  try {
    const content = await readFile(filePath, 'utf8')
    return JSON.parse(content)
  } catch (error) {
    if (error.code === 'ENOENT') return []
    throw error
  }
}

async function saveNotes(notes) {
  await writeFile(filePath, JSON.stringify(notes, null, 2))
}
```

Untuk file besar, pertimbangkan stream. Untuk operasi biasa, `readFile` dan `writeFile` cukup. Jangan memakai API synchronous di request handler karena dapat memblokir event loop.

## 4. Path dan URL file

Path perlu dibangun dengan API runtime, bukan string yang diasumsikan hanya berjalan di satu sistem operasi.

```js:line-numbers
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const currentFile = fileURLToPath(import.meta.url)
const currentDir = path.dirname(currentFile)
const dataFile = path.join(currentDir, 'data', 'users.json')

console.log(dataFile)
```

`new URL('./file', import.meta.url)` juga nyaman untuk asset yang berada relatif terhadap module ESM.

## 5. Buffer dan EventEmitter

`Buffer` merepresentasikan data biner, misalnya saat membaca file atau menerima payload network.

```js:line-numbers
const buffer = Buffer.from('hello', 'utf8')
console.log(buffer, buffer.toString('utf8'))
```

`EventEmitter` adalah pola publish/subscribe sederhana.

```js:line-numbers
import { EventEmitter } from 'node:events'

const bus = new EventEmitter()
bus.on('user.created', (user) => {
  console.log('send welcome email to', user.email)
})

bus.emit('user.created', { email: 'naufal@example.com' })
```

Gunakan event untuk komunikasi yang memang loosely coupled. Untuk alur yang membutuhkan hasil langsung dan error yang eksplisit, function biasa atau Promise lebih mudah dilacak.

## 6. HTTP request dan response secara konsep

HTTP request memiliki method, URL, headers, dan body. HTTP response memiliki status code, headers, dan body. JSON sering dipakai sebagai format body, tetapi type atau struktur JSON harus tetap divalidasi di boundary.

Dengan `node:http`, server minimal terlihat seperti ini:

```js:line-numbers
import { createServer } from 'node:http'

const server = createServer((request, response) => {
  response.setHeader('content-type', 'application/json')

  if (request.url === '/health' && request.method === 'GET') {
    response.writeHead(200)
    response.end(JSON.stringify({ status: 'ok' }))
    return
  }

  response.writeHead(404)
  response.end(JSON.stringify({ error: 'Not found' }))
})

server.listen(3000, () => console.log('server on http://localhost:3000'))
```

Ini bukan pembahasan Express. Tujuannya hanya memperlihatkan bahwa framework nantinya membungkus konsep request, response, route, dan handler yang sama.

## 7. Event loop, I/O, concurrency, parallelism

- **I/O asynchronous**: runtime menunggu file atau network tanpa menahan call stack.
- **Concurrency**: beberapa pekerjaan sedang ditangani dalam rentang waktu yang sama, meski tidak selalu berjalan bersamaan secara CPU.
- **Parallelism**: pekerjaan benar-benar berjalan bersamaan pada core atau worker berbeda.

Node.js kuat untuk banyak pekerjaan I/O, tetapi CPU-heavy task seperti enkripsi besar, image processing, atau loop panjang tetap dapat menahan event loop. Untuk itu, pertimbangkan worker atau proses terpisah.

## Penerapan: konfigurasi dan file store kecil

```js:line-numbers
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const dataDir = path.resolve('data')
const dataPath = path.join(dataDir, 'tasks.json')

async function readTasks() {
  try {
    return JSON.parse(await readFile(dataPath, 'utf8'))
  } catch (error) {
    if (error.code === 'ENOENT') return []
    throw error
  }
}

async function addTask(title) {
  await mkdir(dataDir, { recursive: true })
  const tasks = await readTasks()
  const task = { id: Date.now(), title, done: false }
  await writeFile(dataPath, JSON.stringify([...tasks, task], null, 2))
  return task
}

addTask('Baca API Node.js').then(console.log).catch(console.error)
```

Store file ini cocok sebagai latihan runtime, bukan pengganti database production. Dua request bersamaan dapat menulis file berdasarkan snapshot lama; problem concurrency seperti ini menjadi alasan database memiliki transaction dan locking.

## Latihan bab

- Buat script yang membaca file JSON dan menghitung jumlah data.
- Validasi `PORT` dan satu environment variable wajib lainnya.
- Buat server `/health` dan `/version` dengan `node:http`.
- Gunakan `EventEmitter` untuk mencatat event `task.created`.

<CheckpointChecklist
  id="stage-05-node-runtime"
  title="Siap membawa JavaScript ke Node.js?"
  description="Checkpoint ini memastikan kamu memahami runtime yang akan menjalankan backend-mu."
  :items="[
    'Bisa membedakan API browser dan API bawaan Node.js.',
    'Memahami process.env, process.argv, dan validasi environment variable.',
    'Bisa membaca dan menulis file secara asynchronous dengan fs/promises.',
    'Memahami path, Buffer, EventEmitter, dan dasar HTTP request/response.',
    'Bisa menjelaskan perbedaan concurrency, parallelism, dan non-blocking I/O.'
  ]"
/>

## Referensi bab

- [Node.js Learn](https://nodejs.org/learn)
- [Node.js API Documentation](https://nodejs.org/api/)
