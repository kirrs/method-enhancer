/**
 * Decorator to enhance the target method.
 * @param enhancer Function to enhance the target method.
 */
export declare function Enhance<This, Args extends any[], Return>(
  enhancer: (this: This, ...args: Args) => Return): (target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<any, (this: This, ...args: Args) => Return>
) => (this: This, ...args: Args) => Return;

/**
 * Get the enhancer for methods of class T.
 * @param obj Enhancer object
 */
// @ts-ignore
export declare function enhancer<T, O = Enhancement<T>>(obj: O): { [K in keyof T]: MethodType<T, K>; };
