/* eslint-disable @typescript-eslint/ban-ts-comment */

type Class<T, Arguments extends unknown[] = any[]> = {
  prototype: T
  new(...arguments_: Arguments): T
}

type SafeThis<C, K extends keyof C> = {
  [i in keyof C as i extends K ? `$${string & i}` : i]: C[i]
}

// @ts-ignore
type MethodType<T, K extends keyof T> = (this: SafeThis<T, K>, ...args: Parameters<T[K]>) => ReturnType<T[K]>

/**
 * Object used to enhance methods of class T.
 */
type Enhancement<T> = {
  [K in keyof T]?: MethodType<T, K>
}
