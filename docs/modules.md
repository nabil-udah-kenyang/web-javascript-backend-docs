# 03 · Modern JavaScript dan module system

<div class="eyebrow">Tahap 3 · mengorganisasi kode</div>

Fitur modern JavaScript membuat kode lebih ringkas, tetapi tujuan utamanya bukan sekadar syntax pendek. Destructuring, spread, dan module membantu kita menyatakan bentuk data dan batas tanggung jawab dengan lebih jelas.

## 1. Destructuring, spread, dan default

```js:line-numbers
const request = {
  method: 'GET',
  headers: { accept: 'application/json' },
  query: { page: '1' }
}

const {
  method,
  headers: { accept },
  query: { page = '1', limit = '20' }
} = request

const nextRequest = {
  ...request,
  query: { ...request.query, page, limit }
}

console.log(method, accept, nextRequest)
```

Spread pada object melakukan shallow copy. Hindari mengubah nested property hasil spread jika object asal masih dipakai oleh bagian lain.

## 2. Immutability sebagai kebiasaan

Immutability berarti kita membuat nilai baru daripada mengubah nilai yang dibagikan.

```js:line-numbers
const state = {
  user: { name: 'Naufal', roles: ['reader'] }
}

const nextState = {
  ...state,
  user: {
    ...state.user,
    roles: [...state.user.roles, 'editor']
  }
}

console.log(state.user.roles)     // ['reader']
console.log(nextState.user.roles) // ['reader', 'editor']
```

Kebiasaan ini membuat perubahan data lebih mudah dilacak, terutama saat data diproses oleh banyak function.

## 3. Mengapa module?

Tanpa module, semua variable berada pada satu file besar. Module memberi:

- batas scope per file;
- nama dependency yang terlihat dari `import`;
- tempat yang jelas untuk data, utility, dan service;
- peluang menguji satu bagian secara terpisah.

Struktur sederhana:

```text
src/
├── data/products.js
├── services/product-service.js
└── index.js
```

## 4. ESM: export dan import

`data/products.js`:

```js:line-numbers
export const products = [
  { id: 1, name: 'Keyboard', price: 125000 },
  { id: 2, name: 'Mouse', price: 75000 }
]

export function findProduct(id) {
  return products.find((product) => product.id === id)
}
```

`services/product-service.js`:

```js:line-numbers
import { findProduct, products } from '../data/products.js'

export function listProducts() {
  return products.map((product) => ({ ...product }))
}

export function getProduct(id) {
  return findProduct(id) ?? null
}
```

`index.js`:

```js:line-numbers
import { getProduct, listProducts } from './services/product-service.js'

console.log(listProducts())
console.log(getProduct(2))
```

Named export cocok ketika satu file menyediakan beberapa fungsi yang ingin dipanggil dengan nama aslinya. Default export cocok untuk satu primary value.

```js:line-numbers
// logger.js
export default function logger(message) {
  console.log(`[app] ${message}`)
}

// index.js
import log from './logger.js'
import { findProduct as find } from './data/products.js'

log(find(1))
```

Nama default import boleh berbeda. Named import bisa diberi alias dengan `as`. Re-export berguna untuk membuat public API module.

```js:line-numbers
// services/index.js
export { listProducts, getProduct } from './product-service.js'

// index.js
import { getProduct } from './services/index.js'
```

## 5. Menjalankan ESM di Node.js

Tambahkan `type` pada `package.json`:

```json:line-numbers
{
  "type": "module"
}
```

Node.js mengharuskan path relatif ESM biasanya menyertakan ekstensi file. Jangan mencampur `require` dan `import` tanpa memahami konfigurasi module yang sedang dipakai.

## 6. CommonJS

CommonJS adalah system module lama yang masih banyak ditemui pada project Node.js.

```js:line-numbers
// math.cjs
function add(a, b) {
  return a + b
}

module.exports = { add }

// index.cjs
const { add } = require('./math.cjs')
console.log(add(2, 3))
```

| ESM | CommonJS |
| --- | --- |
| `export` / `import` | `module.exports` / `require` |
| Standar JavaScript modern | Sistem historis Node.js |
| Static import yang mudah dianalisis | Import function call |
| Umum pada project baru | Masih muncul pada package lama |

Ikuti gaya module project yang sedang kamu baca. Saat membuat project baru, ESM adalah pilihan yang baik jika seluruh toolchain mendukungnya.

## 7. Package dan dependency

`package.json` adalah manifest project: nama, script, versi, dan dependency. `dependencies` dibutuhkan ketika aplikasi berjalan; `devDependencies` terutama untuk tooling development seperti test runner atau formatter.

```bash:line-numbers
npm install date-fns
npm install -D eslint
npm run start
```

Lockfile menjaga versi dependency agar instalasi lebih konsisten. Sebelum memakai package pihak ketiga, baca API utamanya, versi yang didukung, dan cara menangani error.

## Penerapan: modul data + service + entry point

Pemisahan tanggung jawabnya sederhana:

```js:line-numbers
// data/tasks.js
export const tasks = []

// services/task-service.js
import { tasks } from '../data/tasks.js'

export function addTask(title) {
  const task = { id: tasks.length + 1, title, done: false }
  tasks.push(task)
  return task
}

export function completeTask(id) {
  const task = tasks.find((item) => item.id === id)
  if (!task) return null
  task.done = true
  return task
}

// index.js
import { addTask, completeTask } from './services/task-service.js'

addTask('Pelajari ESM')
console.log(completeTask(1))
```

Contoh ini masih memakai array in-memory. Nanti layer data dapat diganti database tanpa mengubah cara entry point menggunakan service.

## Latihan bab

- Pecah product manager bab sebelumnya menjadi `data`, `service`, dan `index`.
- Buat satu named export dan satu default export, lalu jelaskan kapan masing-masing dipilih.
- Baca satu package Node.js dan catat entry point, dependency, serta cara import-nya.

<CheckpointChecklist
  id="stage-03-modules"
  title="Siap memecah kode menjadi module?"
  description="Coba baca ulang project kecilmu dan pastikan dependency antar-file terasa jelas."
  :items="[
    'Memahami manfaat destructuring, spread, default value, dan immutability.',
    'Bisa membuat named export dan default export.',
    'Bisa menggunakan import alias dan re-export.',
    'Memahami perbedaan ESM dan CommonJS.',
    'Bisa membaca package.json dan membedakan dependency dengan devDependency.'
  ]"
/>

## Referensi bab

- [MDN — JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Node.js — ECMAScript Modules](https://nodejs.org/api/esm.html)
