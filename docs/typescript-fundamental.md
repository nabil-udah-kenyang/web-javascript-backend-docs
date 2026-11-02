# 06 · TypeScript fundamental

<div class="eyebrow">Tahap 6 · static type system</div>

TypeScript adalah superset JavaScript yang menambahkan pemeriksaan tipe saat development/compile-time. Setelah di-compile, yang berjalan tetap JavaScript. TypeScript tidak melakukan validasi otomatis terhadap data dari user, API, atau database.

## 1. Inference dan annotation

TypeScript sering dapat menyimpulkan tipe dari nilai awal.

```ts:line-numbers
const appName = 'Study API' // inferred: string
let retries = 0             // inferred: number

let status: 'idle' | 'loading' = 'idle'
status = 'loading'

function greet(name: string): string {
  return `Hello, ${name}`
}
```

Gunakan annotation saat tipe tidak bisa ditebak dengan baik, saat membuat public API function, atau saat ingin menjelaskan kontrak data. Jangan memberi annotation berlebihan pada variable lokal yang sudah jelas.

## 2. Basic types

```ts:line-numbers
const title: string = 'Backend Notes'
const count: number = 8
const published: boolean = false
const tags: string[] = ['js', 'ts']
const coordinates: [number, number] = [-6.2, 106.8]
const empty: null = null
let missing: undefined

const literal: 'draft' | 'published' = 'draft'
```

`any` mematikan sebagian besar pemeriksaan tipe, jadi gunakan hanya ketika ada alasan migrasi atau boundary yang memang belum bisa diketik. `unknown` lebih aman karena harus dipersempit sebelum dipakai.

```ts:line-numbers
function printValue(value: unknown) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase())
  }
}

function fail(message: string): never {
  throw new Error(message)
}
```

`void` biasanya dipakai untuk function yang tidak mengembalikan nilai yang berguna. `never` menunjukkan function tidak pernah selesai normal, misalnya selalu throw.

## 3. Typing function

```ts:line-numbers
type Formatter = (value: number, currency?: string) => string

const formatPrice: Formatter = (value, currency = 'IDR') => {
  return `${currency} ${value.toLocaleString('id-ID')}`
}

function sum(values: number[], start = 0): number {
  return values.reduce((total, value) => total + value, start)
}

function logAll(...messages: string[]): void {
  messages.forEach(console.log)
}
```

Optional parameter harus diproses seolah-olah mungkin `undefined`. Default parameter otomatis memberi nilai fallback di dalam function.

### Function overload

Overload mendeskripsikan beberapa bentuk pemanggilan, sementara implementation signature harus bisa menangani semuanya.

```ts:line-numbers
function parseId(value: number): number
function parseId(value: string): number
function parseId(value: number | string): number {
  const id = Number(value)
  if (!Number.isInteger(id)) throw new Error('Invalid id')
  return id
}

console.log(parseId('42'), parseId(42))
```

## 4. Object type, type alias, dan interface

```ts:line-numbers
type Role = 'reader' | 'editor' | 'admin'

interface User {
  readonly id: number
  name: string
  email?: string
  roles: Role[]
  profile: {
    city: string
  }
}

const user: User = {
  id: 1,
  name: 'Naufal',
  roles: ['reader'],
  profile: { city: 'Jakarta' }
}
```

`readonly` mencegah assignment melalui tipe tersebut, bukan membuat object benar-benar immutable saat runtime. Optional property (`?`) harus diperiksa sebelum dipakai.

Type alias dan interface sama-sama dapat mendeskripsikan object. Interface nyaman untuk kontrak object yang ingin di-extend; type alias kuat untuk union, tuple, dan composition.

```ts:line-numbers
interface Timestamped {
  createdAt: string
}

interface Article extends Timestamped {
  title: string
}

type WithId<T> = T & { id: number }
type ArticleRecord = WithId<Article>
```

Index signature dipakai ketika key tidak diketahui sejak awal:

```ts:line-numbers
interface ScoreMap {
  [username: string]: number
}

const scores: ScoreMap = { naufal: 100, budi: 80 }
```

## 5. Union dan narrowing

Union berarti sebuah nilai dapat memiliki salah satu dari beberapa tipe. Narrowing membuat TypeScript tahu tipe yang sedang aktif di branch tertentu.

```ts:line-numbers
function formatId(id: number | string): string {
  if (typeof id === 'number') return `#${id}`
  return id.toUpperCase()
}

function printUser(input: User | null) {
  if (input === null) return
  console.log(input.name)
}
```

Narrowing juga dapat memakai `in`, `instanceof`, dan custom type guard.

```ts:line-numbers
type Cat = { kind: 'cat'; meow: () => void }
type Dog = { kind: 'dog'; bark: () => void }
type Pet = Cat | Dog

function speak(pet: Pet) {
  if (pet.kind === 'cat') pet.meow()
  else pet.bark()
}

function isString(value: unknown): value is string {
  return typeof value === 'string'
}
```

Discriminated union dengan property seperti `kind` biasanya lebih mudah dipahami daripada banyak `as`.

### Assertion dan non-null assertion

```ts:line-numbers
const raw = document.querySelector('#app') as HTMLElement
const maybeUser: User | undefined = undefined
// maybeUser!.name // berbahaya jika nilainya benar-benar undefined
```

Assertion memberi tahu compiler apa yang kamu yakini, tetapi tidak mengubah data dan tidak menambah validasi. Gunakan dengan hati-hati di boundary.

## 6. Generic

Generic membuat function atau type bekerja dengan banyak tipe tanpa kehilangan informasi tipe.

```ts:line-numbers
function first<T>(items: T[]): T | undefined {
  return items[0]
}

const firstNumber = first([1, 2, 3]) // number | undefined
const firstName = first(['Naufal', 'Budi']) // string | undefined

interface ApiResponse<T> {
  data: T
  message: string
}

const response: ApiResponse<User> = {
  data: user,
  message: 'ok'
}
```

Generic constraint membatasi tipe yang boleh dipakai.

```ts:line-numbers
function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id)
}
```

## 7. Utility types

Utility type membentuk tipe baru dari tipe yang sudah ada.

```ts:line-numbers
interface Product {
  id: number
  name: string
  price: number
  stock: number
}

type ProductInput = Omit<Product, 'id'>
type ProductPatch = Partial<ProductInput>
type ProductPreview = Pick<Product, 'id' | 'name' | 'price'>
type ProductById = Record<string, Product>

const patch: ProductPatch = { price: 130000 }
```

Ringkasnya:

| Utility | Kegunaan |
| --- | --- |
| `Partial<T>` | Semua property menjadi optional |
| `Required<T>` | Semua property menjadi wajib |
| `Readonly<T>` | Property tidak dapat di-assign melalui tipe |
| `Pick<T, K>` | Memilih property tertentu |
| `Omit<T, K>` | Menghapus property tertentu |
| `Record<K, T>` | Map key ke tipe tertentu |
| `Exclude<T, U>` | Menghapus anggota union |
| `Extract<T, U>` | Mengambil anggota union yang cocok |
| `ReturnType<F>` | Mengambil return type function |
| `Parameters<F>` | Mengambil tuple parameter function |
| `Awaited<T>` | Mengambil nilai di dalam Promise |

## 8. `keyof`, indexed access, dan `satisfies`

```ts:line-numbers
type ProductKey = keyof Product // 'id' | 'name' | 'price' | 'stock'
type ProductName = Product['name'] // string

const statuses = {
  draft: 'Belum terbit',
  published: 'Sudah terbit'
} as const satisfies Record<string, string>

function readField(product: Product, key: ProductKey) {
  return product[key]
}
```

`satisfies` memeriksa apakah object cocok dengan target type tanpa menghilangkan tipe literal yang lebih spesifik dari object tersebut.

## Penerapan: response API bertipe

```ts:line-numbers
type Status = 'success' | 'error'

type ApiResult<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; message: string; code: string }

function unwrap<T>(result: ApiResult<T>): T {
  if (result.status === 'error') {
    throw new Error(`${result.code}: ${result.message}`)
  }
  return result.data
}

const result: ApiResult<Product[]> = {
  status: 'success',
  data: []
}

console.log(unwrap(result))
```

## Latihan bab

- Buat `User`, `Product`, dan `Order` dengan interface atau type yang masuk akal.
- Buat generic `paginate<T>` yang mengembalikan `items`, `page`, dan `total`.
- Gunakan `Pick`, `Omit`, `Partial`, dan `Record` pada model yang sama.
- Buat discriminated union untuk status pembayaran.

<CheckpointChecklist
  id="stage-06-typescript-fundamental"
  title="TypeScript fundamental sudah cukup kuat?"
  description="Centang jika kamu bisa menjelaskan error tipe, bukan hanya menghilangkannya dengan assertion."
  :items="[
    'Memahami type inference, annotation, basic types, tuple, literal, any, dan unknown.',
    'Bisa mengetik parameter, return value, callback, optional parameter, dan function overload.',
    'Bisa membuat type alias, interface, optional property, readonly, dan nested object type.',
    'Memahami union, narrowing, discriminated union, type guard, dan risiko assertion.',
    'Bisa menggunakan generic, keyof, satisfies, serta utility types yang umum.'
  ]"
/>

## Referensi bab

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
