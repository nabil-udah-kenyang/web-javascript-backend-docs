# 02 · Function, scope, dan cara kerja JavaScript

<div class="eyebrow">Tahap 2 · menyusun logic</div>

Function adalah unit kerja utama dalam aplikasi backend. Function menerima input, menjalankan aturan, lalu mengembalikan output atau efek samping yang jelas.

## 1. Bentuk function

```js:line-numbers
function addTax(price, rate = 0.11) {
  return price + price * rate
}

const formatPrice = function (price) {
  return `Rp${price.toLocaleString('id-ID')}`
}

const isExpensive = (price) => price > 1_000_000

console.log(formatPrice(addTax(100_000)))
console.log(isExpensive(1_500_000))
```

Declaration cocok untuk function yang menjadi bagian utama module. Expression dan arrow function sering dipakai untuk callback atau function lokal. Parameter adalah nama di definisi; argument adalah nilai yang dikirim saat pemanggilan.

### Return dan parameter

```js:line-numbers
function createUser(name, ...roles) {
  return {
    name,
    roles,
    createdAt: new Date().toISOString()
  }
}

const user = createUser('Naufal', 'reader', 'admin')
console.log(user)
```

`...roles` adalah rest parameter dan harus berada di posisi terakhir. Hindari function yang mengandalkan terlalu banyak parameter posisi; object parameter sering lebih mudah dibaca.

```js:line-numbers
function createReport({ title, rows = [], includeSummary = true }) {
  return { title, rows, includeSummary }
}

console.log(createReport({ title: 'Penjualan', rows: [1, 2] }))
```

## 2. Callback dan higher-order function

Function adalah first-class citizen: dapat disimpan di variable, dikirim sebagai argument, dan dikembalikan dari function lain.

```js:line-numbers
function withLog(task, label) {
  return (...args) => {
    console.log(`[start] ${label}`)
    const result = task(...args)
    console.log(`[done] ${label}`)
    return result
  }
}

const double = withLog((number) => number * 2, 'double')
console.log(double(4))
```

`map`, `filter`, dan `reduce` adalah higher-order function karena menerima function lain. Callback sebaiknya kecil dan punya nama yang menjelaskan niatnya.

## 3. Pure function

Pure function menghasilkan output yang sama untuk input yang sama dan tidak mengubah dunia luar.

```js:line-numbers
function addItem(items, item) {
  return [...items, item]
}

function addItemMutating(items, item) {
  items.push(item)
  return items
}
```

Versi pertama lebih aman untuk logic bisnis karena tidak mengubah array pemanggil secara diam-diam. Function yang membaca file atau mengirim request boleh memiliki side effect, tetapi pisahkan dari function transformasi data jika memungkinkan.

## 4. Scope, hoisting, dan TDZ

JavaScript memiliki global scope, function scope, dan block scope. `let` dan `const` hidup di block scope; `var` hidup di function scope.

```js:line-numbers
const appName = 'notes'

function printStatus() {
  const status = 'ready'
  if (status) {
    const detail = 'server is ready'
    console.log(appName, detail)
  }
  // detail tidak tersedia di sini
}

printStatus()
```

Hoisting membuat declaration diproses sebelum eksekusi, tetapi perilakunya berbeda:

```js:line-numbers
sayHello() // bisa dipanggil sebelum declaration
function sayHello() {
  console.log('hello')
}

console.log(varValue) // undefined
var varValue = 1

// console.log(letValue) // ReferenceError: Temporal Dead Zone
let letValue = 2
```

Biasakan mendeklarasikan variable sebelum digunakan. Jangan mengandalkan hoisting untuk membuat kode terlihat “ajaib”.

## 5. Closure

Closure terjadi saat function mengingat variable dari lexical scope tempat ia dibuat, bahkan setelah outer function selesai.

```js:line-numbers
function createCounter(initial = 0) {
  let count = initial

  return {
    increment() {
      count += 1
      return count
    },
    value() {
      return count
    }
  }
}

const counter = createCounter(10)
console.log(counter.increment()) // 11
console.log(counter.value())     // 11
```

`count` tidak bisa diakses langsung dari luar. Pola ini berguna untuk private state sederhana, function factory, dan konfigurasi yang ingin dipertahankan.

## 6. `this` dan method object

Nilai `this` pada regular function ditentukan oleh cara function dipanggil. Pada arrow function, `this` diambil dari lexical scope dan tidak memiliki `this` sendiri.

```js:line-numbers
const cart = {
  items: [100, 200],
  total() {
    return this.items.reduce((sum, item) => sum + item, 0)
  }
}

console.log(cart.total())
```

```js:line-numbers
const user = {
  name: 'Naufal',
  regular() {
    return this.name
  },
  arrow: () => this.name
}

console.log(user.regular())
// user.arrow() bukan cara yang tepat untuk method yang membutuhkan this
```

Gunakan `call`, `apply`, atau `bind` ketika perlu mengatur receiver secara eksplisit.

```js:line-numbers
function introduce(prefix) {
  return `${prefix}, ${this.name}`
}

const person = { name: 'Naufal' }
console.log(introduce.call(person, 'Halo'))
console.log(introduce.apply(person, ['Hai']))
const sayHi = introduce.bind(person, 'Hello')
console.log(sayHi())
```

## 7. Prototype dan class

Object JavaScript memiliki prototype chain. `class` adalah syntax yang lebih nyaman untuk membuat object dengan method bersama; ia tetap berjalan di atas mekanisme prototype.

```js:line-numbers
class Product {
  constructor(name, price) {
    this.name = name
    this.price = price
  }

  getLabel() {
    return `${this.name} · Rp${this.price.toLocaleString('id-ID')}`
  }

  static fromJSON(input) {
    return new Product(input.name, Number(input.price))
  }
}

class DigitalProduct extends Product {
  constructor(name, price, fileSize) {
    super(name, price)
    this.fileSize = fileSize
  }
}

const course = DigitalProduct.fromJSON({ name: 'JS Notes', price: '99000' })
console.log(course.getLabel())
```

Gunakan class ketika object memiliki identity dan behavior yang jelas. Untuk data sederhana, object literal dan function biasa sering lebih ringan.

## 8. Error handling

Error adalah bagian dari alur program. Jangan menelan error tanpa log atau keputusan yang jelas.

```js:line-numbers
class ValidationError extends Error {
  constructor(message, field) {
    super(message)
    this.name = 'ValidationError'
    this.field = field
  }
}

function validateProduct(input) {
  if (!input.name?.trim()) {
    throw new ValidationError('Nama produk wajib diisi', 'name')
  }
  if (!Number.isFinite(input.price) || input.price <= 0) {
    throw new ValidationError('Harga harus angka positif', 'price')
  }
  return { name: input.name.trim(), price: input.price }
}

try {
  console.log(validateProduct({ name: '', price: 0 }))
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(error.name, error.field, error.message)
  } else {
    throw error // rethrow error yang tidak kita kenal
  }
} finally {
  console.log('validasi selesai')
}
```

`SyntaxError`, `ReferenceError`, dan `TypeError` menunjukkan kelas masalah yang berbeda. `Error.message` cocok untuk pesan; `Error.stack` berguna saat debugging. Pada boundary aplikasi, ubah error internal menjadi response yang aman dan jangan membocorkan stack ke user.

## Penerapan: service validasi sederhana

```js:line-numbers
function createProductService() {
  const products = []

  return {
    add(input) {
      const product = validateProduct(input)
      const saved = { id: products.length + 1, ...product }
      products.push(saved)
      return saved
    },
    list() {
      return products.map((product) => ({ ...product }))
    }
  }
}

const service = createProductService()
service.add({ name: 'Keyboard', price: 125000 })
console.log(service.list())
```

Service di atas memakai closure untuk menyembunyikan array internal, validation untuk menjaga invariant, dan copy object agar caller tidak mengubah state internal secara langsung.

## Latihan bab

- Buat function factory `createTodoList` dengan operasi tambah, selesai, dan filter.
- Buat custom error `NotFoundError` untuk pencarian produk berdasarkan id.
- Tulis ulang satu callback sebagai arrow function, lalu jelaskan perubahan perilaku `this`-nya.
- Buat contoh kecil yang menunjukkan perbedaan block scope `let` dan function scope `var`.

<CheckpointChecklist
  id="stage-02-functions-scope"
  title="Function dan scope sudah cukup jelas?"
  description="Gunakan checklist ini setelah latihan function factory, closure, dan custom error selesai."
  :items="[
    'Bisa membedakan function declaration, expression, arrow function, parameter, dan argument.',
    'Memahami callback, higher-order function, dan konsep pure function.',
    'Bisa menjelaskan scope chain, hoisting, dan Temporal Dead Zone.',
    'Memahami closure dan dapat membuat function factory sederhana.',
    'Memahami this, prototype, class, dan cara menangani error dengan try/catch.'
  ]"
/>

## Referensi bab

- [JavaScript.info — Functions](https://javascript.info/functions)
- [JavaScript.info — Object](https://javascript.info/object)
- [MDN — Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
