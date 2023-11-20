/* eslint-disable @typescript-eslint/ban-ts-comment */

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
