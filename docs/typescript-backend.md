# 07 · TypeScript untuk backend

<div class="eyebrow">Tahap 7 · siap masuk Node.js / Express</div>

Di backend, TypeScript paling berguna ketika ia mendeskripsikan kontrak antar-layer: input, output, service, repository, dan response. Ia tidak boleh dipakai sebagai alasan untuk mempercayai data dari luar aplikasi.

## 1. Model data dan function

```ts:line-numbers
export type OrderStatus = 'pending' | 'paid' | 'cancelled'

export interface OrderItem {
  productId: number
  quantity: number
  price: number
}

export interface Order {
  readonly id: number
  customerId: number
  items: OrderItem[]
  status: OrderStatus
}

export function calculateTotal(order: Pick<Order, 'items'>): number {
  return order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
}
```

Gunakan `readonly` untuk nilai identity atau data yang tidak boleh diubah oleh layer tertentu. Untuk update sebagian data, buat input terpisah dengan `Partial`/`Omit` daripada menjadikan seluruh model optional.

## 2. Typing asynchronous code

`async function` mengembalikan `Promise<T>`, walaupun `return` di dalamnya terlihat seperti nilai biasa.

```ts:line-numbers
interface User {
  id: number
  name: string
}

async function findUser(id: number): Promise<User | null> {
  if (id <= 0) return null
  return { id, name: 'Naufal' }
}

async function logUser(id: number): Promise<void> {
  const user = await findUser(id)
  if (!user) return
  console.log(user.name)
}
```

`Promise<void>` berarti caller menunggu proses selesai tetapi tidak mendapat data bermakna. Untuk beberapa operasi yang independen, TypeScript dapat mempertahankan tuple hasil `Promise.all`.

```ts:line-numbers
const [user, orders] = await Promise.all([
  findUser(1),
  Promise.resolve([{ id: 10, status: 'paid' as const }])
])
```

Pada TypeScript modern, nilai `catch` sebaiknya diperlakukan sebagai `unknown`.

```ts:line-numbers
try {
  await logUser(1)
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : 'Unknown error'
  console.error(message)
}
```

## 3. Type bukan validasi runtime

Code berikut aman untuk compiler, tetapi bisa salah saat runtime karena `response.json()` adalah data luar.

```ts:line-numbers
interface Profile {
  id: number
  name: string
}

async function unsafeLoad(): Promise<Profile> {
  const response = await fetch('/api/profile')
  return response.json() as Promise<Profile>
}
```

Assertion hanya membungkam compiler. Untuk boundary penting, validasi bentuk data dengan schema validator seperti Zod, atau tulis type guard sendiri.

```ts:line-numbers
function isProfile(value: unknown): value is Profile {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>
  return typeof candidate.id === 'number' && typeof candidate.name === 'string'
}

async function loadProfile(): Promise<Profile> {
  const response = await fetch('/api/profile')
  const body: unknown = await response.json()
  if (!isProfile(body)) throw new Error('Bentuk profile tidak valid')
  return body
}
```

TypeScript menjaga kode yang kamu tulis. Validasi menjaga asumsi ketika data masuk ke sistem.

## 4. `tsconfig.json`

Contoh konfigurasi ketat untuk project Node.js:

```json:line-numbers
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "esModuleInterop": true,
    "types": ["node"]
  },
  "include": ["src/**/*.ts"]
}
```

Makna opsi yang penting:

- `target`: JavaScript version output.
- `module`: format module output dan cara Node membaca import.
- `moduleResolution`: aturan mencari module.
- `strict`: mengaktifkan keluarga pemeriksaan ketat.
- `noImplicitAny`: menolak parameter yang diam-diam menjadi `any`.
- `strictNullChecks`: membedakan `null`/`undefined` dari tipe lain.
- `outDir`: tempat JavaScript hasil build.
- `@types/node`: type untuk API Node.js.

Script yang lazim:

```json:line-numbers
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "typecheck": "tsc --noEmit",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

Development runtime menjalankan `.ts` dengan tooling seperti `tsx`; production biasanya menjalankan hasil build JavaScript di `dist`.

## 5. Module dan declaration

Project TypeScript tetap menggunakan prinsip ESM yang sudah dipelajari:

```ts:line-numbers
// domain/product.ts
export interface Product {
  id: number
  name: string
}

export function createProduct(name: string): Product {
  return { id: Date.now(), name }
}

// index.ts
import { createProduct } from './domain/product.js'

console.log(createProduct('Keyboard'))
```

Pada output ESM NodeNext, import source sering tetap ditulis dengan ekstensi `.js` karena itulah file yang akan tersedia saat runtime setelah compile.

File `.d.ts` berisi deklarasi tipe tanpa implementation. Package yang tidak membawa type sendiri dapat memakai `@types/package` dari DefinitelyTyped.

## 6. Gambaran typing Express

Express menyediakan type untuk `Request`, `Response`, dan `NextFunction`. Cara tepatnya bergantung versi Express dan cara project mendeklarasikan request body, tetapi bentuk dasarnya seperti ini:

```ts:line-numbers
import type { NextFunction, Request, Response } from 'express'

interface CreateUserBody {
  name: string
  email: string
}

export async function createUser(
  request: Request<{}, {}, CreateUserBody>,
  response: Response,
  next: NextFunction
) {
  try {
    const user = await saveUser(request.body)
    response.status(201).json({ data: user })
  } catch (error) {
    next(error)
  }
}
```

Generic `Request<Params, ResBody, ReqBody, Query>` memberi konteks pada object request, tetapi tidak melakukan validasi. Request body yang datang dari network tetap dianggap tidak tepercaya sampai schema validator memeriksanya.

## 7. Response helper generic

```ts:line-numbers
type Success<T> = { ok: true; data: T }
type Failure = { ok: false; error: { code: string; message: string } }
type Result<T> = Success<T> | Failure

function success<T>(data: T): Success<T> {
  return { ok: true, data }
}

function failure(code: string, message: string): Failure {
  return { ok: false, error: { code, message } }
}

function render<T>(result: Result<T>): T | null {
  if (!result.ok) {
    console.error(result.error.code, result.error.message)
    return null
  }
  return result.data
}

console.log(render(success({ id: 1 })))
console.log(render(failure('NOT_FOUND', 'Data tidak ditemukan')))
```

Discriminated union seperti `ok: true | false` memudahkan narrowing dan membuat caller menangani success/error dengan eksplisit.

## Penerapan: mini layer service

```ts:line-numbers
interface Product {
  id: number
  name: string
  price: number
}

type NewProduct = Omit<Product, 'id'>

class ProductService {
  #products: Product[] = []

  async create(input: NewProduct): Promise<Product> {
    if (input.price <= 0) throw new Error('Harga harus positif')
    const product = { id: this.#products.length + 1, ...input }
    this.#products.push(product)
    return product
  }

  async list(): Promise<readonly Product[]> {
    return this.#products.map((product) => ({ ...product }))
  }
}

const service = new ProductService()
console.log(await service.create({ name: 'Keyboard', price: 125000 }))
```

Class private field `#products` menyembunyikan state dari caller. Pada aplikasi nyata, service ini dapat bergantung pada repository database dengan interface yang sama.

## Latihan bab

- Aktifkan `strict` dan perbaiki semua error pada project TypeScript kecil.
- Buat helper `paginate<T>` dan response union success/error.
- Ketik function yang membaca JSON dari API sebagai `unknown`, lalu validasi hasilnya.
- Buat interface repository dan service yang menggunakannya.

<CheckpointChecklist
  id="stage-07-typescript-backend"
  title="Siap memakai TypeScript untuk backend?"
  description="Bagian terpenting di sini adalah tahu batas TypeScript dan tetap memvalidasi data dari luar."
  :items="[
    'Bisa membuat type untuk entity, function, callback, status, dan response aplikasi.',
    'Bisa mengetik Promise<T>, async function, Promise.all, dan catch sebagai unknown.',
    'Memahami perbedaan static type checking dengan validasi runtime.',
    'Memahami opsi penting tsconfig seperti strict, module, target, dan moduleResolution.',
    'Bisa membaca gambaran typing Request, Response, middleware, dan controller Express.'
  ]"
/>

## Referensi bab

- [TypeScript — tsconfig](https://www.typescriptlang.org/tsconfig/)
- [TypeScript — Modules](https://www.typescriptlang.org/docs/handbook/modules/introduction.html)
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)
