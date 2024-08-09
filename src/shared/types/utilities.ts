export type Nullable<T> = T | null | undefined

export type Awaitable<T> = T | PromiseLike<T>

export type Xor<A, B> =
  | (B & {
      [P in keyof A]?: never
    })
  | (A & {
      [P in keyof B]?: never
    })
