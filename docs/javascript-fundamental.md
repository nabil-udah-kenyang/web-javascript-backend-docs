# 01 · JavaScript fundamental

<div class="eyebrow">Tahap 1 · bahasa dasar</div>

JavaScript adalah bahasa yang dijalankan oleh runtime seperti browser atau Node.js. Ia **dynamically typed**: tipe sebuah nilai diketahui saat program berjalan, dan sebuah variable dapat menunjuk ke nilai dengan tipe berbeda pada waktu berbeda.

## Tujuan bab

- Memahami primitive value, coercion, truthy/falsy, dan perbandingan.
- Mengontrol alur program dengan operator, kondisi, dan loop.
- Mengolah array dan object yang umum dipakai sebagai data backend.
- Menghindari bug karena referensi object dan perubahan data yang tidak disadari.

## 1. Variable dan tipe data

Gunakan `const` ketika binding tidak perlu diarahkan ke nilai lain. Gunakan `let` ketika memang akan di-assign ulang. `var` adalah syntax lama dengan function scope dan hoisting yang mudah membingungkan.

```js:line-numbers
const appName = 'Study API'
let requestCount = 0
requestCount += 1

const user = { name: 'Naufal' }
user.name = 'Nabil' // object-nya masih boleh diubah

console.log(appName, requestCount, user.name)
```

`const` membekukan binding, bukan isi object. Jika butuh object yang tidak dapat diubah, gunakan pola immutable atau `Object.freeze()` dengan memahami batasannya.

### Primitive dan nilai khusus

| Tipe | Contoh | Catatan |
| --- | --- | --- |
| `string` | `'Node.js'` | Teks immutable |
| `number` | `42`, `3.14` | Bilangan floating point |
| `boolean` | `true` | Nilai logika |
| `undefined` | `let value` | Belum diberi nilai |
| `null` | `let result = null` | Sengaja tidak ada nilai |
| `symbol` | `Symbol('id')` | Identifier unik |
| `bigint` | `9007199254740993n` | Bilangan integer sangat besar |

```js:line-numbers
console.log(typeof 'api')       // string
console.log(typeof 200)         // number
console.log(typeof undefined)   // undefined
console.log(typeof null)        // object — perilaku lama JavaScript
console.log(typeof 10n)         // bigint
```

`null` dan `undefined` sama-sama berarti “tidak ada data”, tetapi maksudnya berbeda. `undefined` biasanya berarti nilai belum tersedia; `null` biasanya berarti program sengaja mengosongkannya.

## 2. Coercion, truthy, dan perbandingan

JavaScript bisa mengubah tipe secara implisit. Ini disebut type coercion.

```js:line-numbers
console.log('5' + 2)   // '52' — + dapat menjadi penggabungan string
console.log('5' - 2)   // 3   — - memaksa ke number
console.log(Boolean('')) // false
console.log(Boolean('0')) // true: string tidak kosong

console.log(0 == false)  // true  — coercion terjadi
console.log(0 === false) // false — tipe juga dibandingkan
```

Biasakan memakai `===` dan `!==`. Nilai falsy yang perlu diingat: `false`, `0`, `-0`, `0n`, `''`, `null`, `undefined`, dan `NaN`. Hampir semua nilai lain truthy, termasuk `[]` dan `{}`.

### `??` dan `?.`

Nullish coalescing hanya memakai fallback jika nilai di kiri `null` atau `undefined`, bukan ketika nilainya `0` atau string kosong.

```js:line-numbers
const settings = { pageSize: 0, owner: { name: 'Naufal' } }
const pageSize = settings.pageSize ?? 20 // 0 tetap dipertahankan
const city = settings.owner?.address?.city ?? 'Belum diisi'

console.log(pageSize, city)
```

## 3. Operator dan control flow

```js:line-numbers
function labelStock(stock) {
  if (stock === 0) return 'habis'
  if (stock < 5) return 'menipis'
  return 'tersedia'
}

const role = 'editor'
const canPublish = role === 'admin' || role === 'editor'
const badge = canPublish ? 'boleh publish' : 'hanya baca'

console.log(labelStock(3), badge)
```

Loop dipilih berdasarkan kebutuhan:

```js:line-numbers
const queue = ['compile', 'test', 'deploy']

for (const job of queue) {
  if (job === 'test') continue
  console.log(`menjalankan ${job}`)
}

let retry = 0
while (retry < 2) {
  console.log(`percobaan ${retry + 1}`)
  retry += 1
}
```

Gunakan `for...of` untuk membaca nilai array. `for...in` lebih cocok untuk key object, bukan untuk array karena ia berjalan melalui property key.

## 4. String dan number

Template literal membuat string dinamis lebih mudah dibaca.

```js:line-numbers
const product = 'Keyboard'
const price = 125000
const message = `${product} harganya Rp${price.toLocaleString('id-ID')}`

const rawInput = '  naufal@example.com  '
const email = rawInput.trim().toLowerCase()
console.log(message, email, email.includes('@'))
```

Method string yang sering dipakai: `trim`, `toLowerCase`, `toUpperCase`, `includes`, `startsWith`, `endsWith`, `split`, `replace`, `slice`, dan `substring`.

```js:line-numbers
const input = '42.5px'
const pixels = parseFloat(input)
const count = Number.parseInt('12', 10)

console.log(pixels, count, Number.isNaN(Number('abc')))
console.log(Math.round(4.6), Math.floor(4.6), Math.ceil(4.1))
```

Jangan menganggap `parseInt('12px')` sebagai validasi lengkap. Untuk input keuangan, periksa hasil parsing dan aturan domain sebelum menyimpan data.

## 5. Array: data berurutan

Array menyimpan kumpulan nilai dengan index mulai dari `0`.

```js:line-numbers
const tags = ['js', 'node']
tags.push('backend')
const first = tags[0]
const last = tags.at(-1)

console.log(first, last, tags.length)
```

Method transformasi penting:

```js:line-numbers
const products = [
  { name: 'Keyboard', price: 125000, active: true },
  { name: 'Mouse', price: 75000, active: false },
  { name: 'Monitor', price: 1500000, active: true }
]

const activeNames = products
  .filter((product) => product.active)
  .map((product) => product.name)

const totalActivePrice = products
  .filter((product) => product.active)
  .reduce((total, product) => total + product.price, 0)

const monitor = products.find((product) => product.name === 'Monitor')
const hasExpensive = products.some((product) => product.price > 1000000)
const allValid = products.every((product) => product.price > 0)

console.log(activeNames, totalActivePrice, monitor, hasExpensive, allValid)
```

`map` mengubah setiap item, `filter` memilih item, `find` mengambil satu item, dan `reduce` menggabungkan banyak item menjadi satu hasil. Method-method ini tidak mengubah array asal.

### `slice` dan `splice`

`slice` membuat potongan tanpa mengubah array; `splice` menghapus atau menyisipkan isi array asal.

```js:line-numbers
const numbers = [10, 20, 30, 40]
const preview = numbers.slice(0, 2)
numbers.splice(1, 1, 25)

console.log(preview) // [10, 20]
console.log(numbers) // [10, 25, 30, 40]
```

### Destructuring dan spread

```js:line-numbers
const [firstProduct, ...otherProducts] = products
const updatedProducts = [...products, { name: 'USB Hub', price: 90000, active: true }]

console.log(firstProduct.name, otherProducts.length, updatedProducts.length)
```

Spread memberi array baru, tetapi object di dalamnya masih berbagi referensi. Untuk nested data, perhatikan kedalaman copy yang kamu butuhkan.

## 6. Object: data bernama

```js:line-numbers
const account = {
  username: 'naufal',
  profile: { city: 'Jakarta' },
  isActive: true
}

account.lastLogin = new Date().toISOString()
account.isActive = false
delete account.lastLogin

const { username, profile: { city } = {} } = account
console.log(username, city)
```

Dot notation cocok untuk property yang namanya tetap. Bracket notation berguna jika key berasal dari variable.

```js:line-numbers
const field = 'email'
const value = { [field]: 'naufal@example.com' }
const withMeta = { ...value, verified: true }

console.log(withMeta.email, Object.keys(withMeta))
console.log(Object.values(withMeta))
console.log(Object.entries(withMeta))
```

`Object.keys`, `Object.values`, dan `Object.entries` memudahkan iterasi data. `Object.assign` juga dapat menggabungkan object, tetapi spread biasanya lebih ringkas.

## Penerapan: product manager kecil

Contoh berikut menggabungkan array, object, function, filter, dan `reduce` dalam satu alur.

```js:line-numbers
const inventory = [
  { id: 1, name: 'Keyboard', category: 'peripheral', stock: 8, price: 125000 },
  { id: 2, name: 'Monitor', category: 'display', stock: 2, price: 1500000 },
  { id: 3, name: 'Cable USB-C', category: 'cable', stock: 0, price: 55000 }
]

function searchProducts(keyword) {
  const query = keyword.trim().toLowerCase()
  return inventory.filter((item) => item.name.toLowerCase().includes(query))
}

function summarize(items) {
  return items.reduce((summary, item) => {
    summary.totalItems += 1
    summary.totalStock += item.stock
    summary.stockValue += item.stock * item.price
    return summary
  }, { totalItems: 0, totalStock: 0, stockValue: 0 })
}

console.log(searchProducts('usb'))
console.log(summarize(inventory))
```

## Jebakan yang sering muncul

### Primitive vs reference value

Primitive disalin berdasarkan nilainya. Object dan array disalin berdasarkan referensinya.

```js:line-numbers
let scoreA = 10
let scoreB = scoreA
scoreB = 20

const original = { count: 1 }
const alias = original
alias.count = 2

console.log(scoreA, scoreB) // 10, 20
console.log(original.count) // 2
```

Jika ingin object baru pada level pertama, gunakan spread: `const copy = { ...original }`. Untuk data nested, pilih strategi copy yang sesuai dan jangan mengandalkan `JSON.stringify`/`parse` untuk semua tipe data.

## Latihan bab

- Buat fungsi tambah, ubah, hapus, dan cari produk berdasarkan `id`.
- Kelompokkan inventory berdasarkan `category` menggunakan `reduce`.
- Ubah array transaksi menjadi ringkasan `{ total, count, byStatus }`.
- Coba jelaskan kapan `??` menghasilkan output berbeda dari `||`.

<CheckpointChecklist
  id="stage-01-javascript-fundamental"
  title="JavaScript fundamental sudah cukup kuat?"
  description="Centang setelah kamu bisa menjelaskan dan mempraktikkan poin-poin ini tanpa menyalin contoh."
  :items="[
    'Memahami tipe data, coercion, truthy/falsy, dan perbandingan ===.',
    'Bisa menggunakan control flow dan loop untuk menyelesaikan masalah sederhana.',
    'Bisa mengolah string, array, dan object dengan method yang tepat.',
    'Bisa memakai map, filter, find, some, every, dan reduce.',
    'Memahami perbedaan primitive value dan reference value.'
  ]"
/>

## Referensi bab

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [JavaScript.info](https://javascript.info/)
