/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export type Class<T, Arguments extends unknown[] = any[]> = {
  prototype: T
  new (...arguments_: Arguments): T
}

type SafeThis<C, K extends keyof C> = {
  [i in keyof C as i extends K ? `$${string & i}` : i]: C[i]
}

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
export function Enhance<This, Args extends any[], Return>(enhancer: (this: This, ...args: Args) => Return) {
  return function enhanceDecorator(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<any, (this: This, ...args: Args) => Return>
  ) {
    return function enhancedTarget(this: This, ...args: Args): Return {
      // @ts-ignore
      this[`$${String(context.name)}`] = target.bind(this)
      return enhancer.call(this, ...args)
    }
  }
}

/**
 * Get the enhancer for methods of class T.
 * @param obj Enhancer object
 */
export function enhancer<T, O = Enhancement<T>>(obj: O) {
  return obj as {
    [K in keyof T]: MethodType<T, K>
  }
}
