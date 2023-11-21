/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Safe this keyword, `this.$methodName` points to the target method, and delete `this.methodName` to avoid
 */
export type SafeThis<C, K extends keyof C> = {
  [i in keyof C as i extends K ? `$${string & i}` : i]: C[i]
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type MethodType<T, K extends keyof T> = (this: SafeThis<T, K>, ...args: Parameters<T[K]>) => ReturnType<T[K]>

/**
 * Object used to enhance methods of class T.
 */
export type Enhancement<T> = {
  [K in keyof T]?: MethodType<T, K>
}

/**
 * Decorator to enhance the target method.
 * @param enhancer Function to enhance the target method.
 */
export declare function Enhance<This, Args extends any[], Return>(
  enhancer: (this: This, ...args: Args) => Return
): (
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<any, (this: This, ...args: Args) => Return>
) => (this: This, ...args: Args) => Return

/**
 * Get the enhancer for methods of class T.
 * @param obj Enhancer object
 */
export declare function enhancer<T, O = Enhancement<T>>(obj: O): { [K in keyof T]: MethodType<T, K> }

export {}
