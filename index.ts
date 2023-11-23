/* eslint-disable @typescript-eslint/no-explicit-any */

type MethodType<T, K extends keyof T> = T[K] extends (...args: any) => any
  ? (target: T[K], ...args: Parameters<T[K]>) => ReturnType<T[K]>
  : never

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
export function Enhance<This, Args extends any[], Return>(
  enhancer: (target: (this: This, ...args: Args) => Return, ...args: Args) => Return
) {
  return function enhanceDecorator(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
  ) {
    if (context.kind !== 'method') throw new Error('This decorator can only be used on class method.')
    return function enhancedTarget(this: This, ...args: Args): Return {
      return enhancer.call(this, target, ...args)
    }
  }
}
