export {}

declare global {
  type Mutable<T> = {
    -readonly [P in keyof T]: T[P]
  }
}
