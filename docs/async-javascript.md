# 04 · Asynchronous JavaScript

<div class="eyebrow">Tahap 4 · waktu dan event loop</div>

Operasi seperti membaca file, menunggu API, atau mengirim request membutuhkan waktu. JavaScript tetap bisa melanjutkan pekerjaan lain selama operasi itu belum selesai. Inilah inti asynchronous programming.

## 1. Synchronous vs asynchronous

Kode synchronous dijalankan berurutan dan menunggu baris sebelumnya selesai. Kode asynchronous menyerahkan pekerjaan yang menunggu ke runtime, lalu melanjutkan eksekusi.

```js:line-numbers
console.log('A')

setTimeout(() => {
  console.log('B')
}, 0)

Promise.resolve().then(() => console.log('C'))
console.log('D')
```

Output:

```text:line-numbers
A
D
C
B
```

Callback Promise masuk microtask queue; callback timer masuk task/macrotask queue. Setelah call stack kosong, microtask diproses lebih dulu.

## 2. Call stack dan event loop

Gambaran mentalnya:

1. Synchronous function masuk call stack.
2. Operasi yang membutuhkan waktu ditangani runtime.
3. Callback menunggu di queue.
4. Event loop memasukkan callback ke stack ketika stack kosong.

Node.js menggunakan model event-driven dan non-blocking I/O. Satu function yang menjalankan loop berat tanpa jeda tetap dapat memblokir pekerjaan lain; asynchronous bukan berarti semua kode otomatis paralel.

## 3. Callback dan error-first style

```js:line-numbers
function readConfig(callback) {
  setTimeout(() => {
    const config = { port: 3000 }
    callback(null, config)
  }, 100)
}

readConfig((error, config) => {
  if (error) {
    console.error(error)
    return
  }
  console.log(config)
})
```

Pola `(error, result)` banyak ditemui pada API Node.js lama. Jika callback bertingkat terlalu dalam dan setiap level menangani error sendiri, terbentuk callback hell. Promise membantu membuat alurnya lebih datar.

## 4. Promise

Promise merepresentasikan hasil yang belum tersedia: `pending`, kemudian `fulfilled` atau `rejected`.

```js:line-numbers
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`selesai setelah ${ms}ms`), ms)
  })
}

wait(300)
  .then((message) => console.log(message))
  .catch((error) => console.error(error))
  .finally(() => console.log('request selesai'))
```

Promise chaining meneruskan return value ke `.then` berikutnya. Jika function di dalam chain melempar error atau return rejected Promise, `.catch` dapat menangkapnya.

### Combinator Promise

```js:line-numbers
const first = Promise.resolve('first')
const second = Promise.resolve('second')

const all = await Promise.all([first, second])
const settled = await Promise.allSettled([first, Promise.reject(new Error('gagal'))])
const winner = await Promise.race([wait(50), wait(100)])
const firstSuccess = await Promise.any([Promise.reject('x'), Promise.resolve('ok')])

console.log(all, settled, winner, firstSuccess)
```

Gunakan `Promise.all` saat semua hasil wajib berhasil. Gunakan `allSettled` saat ingin melihat hasil sukses dan gagal sekaligus. `race` mengambil yang selesai pertama; `any` mengambil sukses pertama.

## 5. Async/await

`async` membuat function selalu mengembalikan Promise. `await` membuat alur Promise terlihat seperti synchronous, tetapi tidak memblokir event loop selama menunggu.

```js:line-numbers
async function loadProfile() {
  try {
    const response = await fetch('https://example.com/profile')
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('gagal memuat profile:', error)
    throw error
  }
}
```

`fetch` tidak otomatis reject saat server mengembalikan HTTP 404 atau 500. Periksa `response.ok` secara eksplisit.

### Berurutan vs paralel

```js:line-numbers
async function loadDashboard(userId) {
  const [profile, notifications] = await Promise.all([
    fetch(`/api/users/${userId}`).then((response) => response.json()),
    fetch(`/api/users/${userId}/notifications`).then((response) => response.json())
  ])

  return { profile, notifications }
}
```

Jika request kedua tidak bergantung pada hasil request pertama, jalankan bersamaan dengan `Promise.all`. Jika bergantung, `await` berurutan lebih tepat.

## 6. JSON dan HTTP dasar

JSON adalah format teks untuk pertukaran data, sedangkan object JavaScript adalah nilai runtime.

```js:line-numbers
const payload = { name: 'Naufal', roles: ['reader'] }
const json = JSON.stringify(payload)
const parsed = JSON.parse(json)

console.log(typeof json) // string
console.log(parsed.roles[0])
```

Contoh POST:

```js:line-numbers
async function createPost(title) {
  const response = await fetch('https://example.com/posts', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ title })
  })

  if (!response.ok) throw new Error(`Request gagal: ${response.status}`)
  return response.json()
}
```

## Penerapan: API consumer dengan loading, data, error

```js:line-numbers
async function getTodos(query = '') {
  const endpoint = `https://jsonplaceholder.typicode.com/todos?_limit=10`
  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error(`Gagal mengambil todos (${response.status})`)
  }

  const todos = await response.json()
  return todos.filter((todo) =>
    todo.title.toLowerCase().includes(query.toLowerCase())
  )
}

async function main() {
  console.log('loading...')
  try {
    const todos = await getTodos('qui')
    console.table(todos)
  } catch (error) {
    console.error(error.message)
  } finally {
    console.log('done')
  }
}

main()
```

## Latihan bab

- Buat `delay(ms)` dan bandingkan dua `await` berurutan dengan `Promise.all`.
- Ambil dua endpoint public API dan gabungkan hasilnya.
- Simulasikan error HTTP, network error, dan JSON yang tidak valid.
- Tulis ulang callback error-first menjadi Promise.

<CheckpointChecklist
  id="stage-04-async-javascript"
  title="Asynchronous JavaScript sudah tidak membingungkan?"
  description="Jalankan contoh-contohnya sendiri sebelum mencentang bagian ini."
  :items="[
    'Bisa menjelaskan call stack, microtask queue, task queue, dan event loop secara dasar.',
    'Memahami callback dan alasan callback hell bisa terjadi.',
    'Bisa membuat, chaining, dan menangani rejection pada Promise.',
    'Tahu kapan memakai Promise.all, allSettled, race, dan any.',
    'Bisa memakai async/await, fetch, JSON, dan memeriksa response.ok.'
  ]"
/>

## Referensi bab

- [JavaScript.info — Promise](https://javascript.info/promise-basics)
- [JavaScript.info — Async/Await](https://javascript.info/async-await)
- [MDN — Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN — Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop)
