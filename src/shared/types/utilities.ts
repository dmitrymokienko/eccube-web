export type Nullable<T> = T | null

export type Xor<A, B> =
  | (B & {
      [P in keyof A]?: never
    })
  | (A & {
      [P in keyof B]?: never
    })
