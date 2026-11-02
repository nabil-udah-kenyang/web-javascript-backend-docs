# 08 · Mini project dan checkpoint akhir

<div class="eyebrow">Tahap 8 · membuktikan pemahaman</div>

Selesaikan project ini secara bertahap. Tidak perlu membuat UI rumit; fokusnya adalah bentuk data, pembagian module, asynchronous flow, dan type yang masuk akal.

## Project 1 · JavaScript Data Manager

### Fokus

Variable, array/object, function, array methods, destructuring, spread, dan module.

### Fitur minimum

- Menampilkan seluruh data.
- Menambah, mengubah, dan menghapus data.
- Search dan filter.
- Ringkasan dengan `reduce()`.
- Data, function, dan entry point berada di module berbeda.

Struktur yang disarankan:

```text:line-numbers
data-manager/
└── src/
    ├── data/products.js
    ├── services/product-service.js
    ├── utils/summary.js
    └── index.js
```

Contoh service inti:

```js:line-numbers
const products = []

export function addProduct(input) {
  const product = { id: Date.now(), ...input }
  products.push(product)
  return { ...product }
}

export function updateProduct(id, patch) {
  const index = products.findIndex((product) => product.id === id)
  if (index === -1) return null

  products[index] = { ...products[index], ...patch }
  return { ...products[index] }
}

export function removeProduct(id) {
  const index = products.findIndex((product) => product.id === id)
  if (index === -1) return false
  products.splice(index, 1)
  return true
}
```

Pikirkan juga kontrak function: apa yang dikembalikan jika data tidak ditemukan? `null`, `false`, atau error? Pilih satu pola dan konsisten.

## Project 2 · Async API Consumer

### Fokus

Promise, async/await, fetch, JSON, error handling, dan `Promise.all()`.

### Fitur minimum

- Mengambil data dari public API.
- Menampilkan dan mengolah response.
- Search data.
- Loading dan error melalui alur program.
- Dua request independent berjalan paralel.

```js:line-numbers
async function fetchJSON(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.json()
}

async function loadSummary() {
  const [todos, users] = await Promise.all([
    fetchJSON('https://jsonplaceholder.typicode.com/todos?_limit=10'),
    fetchJSON('https://jsonplaceholder.typicode.com/users')
  ])

  return {
    totalTodos: todos.length,
    completedTodos: todos.filter((todo) => todo.completed).length,
    users: users.map((user) => user.name)
  }
}

loadSummary()
  .then(console.log)
  .catch((error) => console.error('Tidak bisa memuat summary:', error.message))
```

Upgrade project dengan retry terbatas, timeout, atau cache sederhana. Pastikan kamu membedakan network error dari HTTP error.

## Project 3 · TypeScript Mini Application

### Fokus

Type alias, interface, function typing, union/narrowing, generic, utility type, module, dan async/await.

### Fitur minimum

- Type untuk entity.
- Function dengan parameter dan return type.
- Generic helper response.
- Array of objects.
- API response type.
- Error handling yang aman.
- `strict: true`.

Contoh pondasi:

```ts:line-numbers
type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string }

interface Course {
  id: number
  title: string
  level: 'basic' | 'intermediate'
}

function findCourse(courses: Course[], id: number): Result<Course> {
  const course = courses.find((item) => item.id === id)
  return course
    ? { ok: true, data: course }
    : { ok: false, error: 'Course tidak ditemukan' }
}
```

Tambahkan schema validation jika data berasal dari API. TypeScript membantu editor dan compiler memahami `Course`, tetapi response network tetap perlu diperiksa.

## Checkpoint pemahaman

<CheckpointChecklist
  id="stage-08-checkpoint-akhir"
  title="Checkpoint akhir roadmap"
  description="Ini ringkasan besar sebelum kamu mulai Node.js Fundamental dan Express.js."
  :items="[
    'Memahami tipe data, operator, control flow, string, array, dan object.',
    'Memahami function, callback, scope, hoisting, closure, this, class, dan error handling.',
    'Memahami destructuring, spread, import/export, ESM, dan CommonJS.',
    'Memahami Promise, async/await, event loop, error asynchronous, dan API JSON.',
    'Memahami type inference, annotation, union, narrowing, generic, dan utility types.',
    'Memahami tsconfig, type declaration, async typing, validasi runtime, dan konteks Express.'
  ]"
/>

## Rubrik sederhana sebelum lanjut

Kamu belum perlu merasa “menguasai semuanya”. Lanjut jika kamu bisa:

1. Membuat program kecil tanpa menyalin struktur contoh.
2. Menjelaskan alasan pemilihan `map`, `filter`, `reduce`, atau `Promise.all`.
3. Menelusuri error dari stack trace sampai sumbernya.
4. Memecah file berdasarkan tanggung jawab.
5. Menunjukkan bagian mana yang dijaga TypeScript dan bagian mana yang masih perlu validasi runtime.

::: warning Project adalah tempat menemukan celah
Jika project terasa lambat atau penuh error, itu bukan tanda kamu gagal. Catat konsep yang belum jelas, buat reproduksi sekecil mungkin, lalu kembali ke bab terkait. Debugging adalah bagian dari belajar backend.
:::

## Jalur berikutnya

Setelah tiga project selesai, lanjutkan ke:

```text:line-numbers
Node.js Fundamental
        ↓
HTTP dan REST API
        ↓
Express.js dengan TypeScript
        ↓
Validasi request + database + testing
```

Database dan Laravel yang sudah kamu pelajari tidak perlu diulang dari nol. Pindahkan pengetahuan domain tersebut ke pola Node.js secara bertahap.

## Referensi latihan

- [Node.js Learn](https://nodejs.org/learn)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
