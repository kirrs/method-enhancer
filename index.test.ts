import { Enhance, Enhancement, enhancer } from '.'

test('check object', () => {
  const B: Enhancement<A> = {
    words(arg) {
      return 'Hello ' + this.$words(arg) + '.'
    }
  }

  class A {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    @Enhance(B.words)
    words(arg: string) {
      return arg
    }
  }

  const a = new A()

  expect(a.words('world')).toEqual('Hello world.')
})

test('check fucntion', () => {
  const B = enhancer<A>({
    words(arg) {
      return 'Hello ' + this.$words(arg) + '.'
    }
  })

  class A {
    @Enhance(B.words)
    words(arg: string) {
      return arg
    }
  }

  const a = new A()

  expect(a.words('world')).toEqual('Hello world.')
})
