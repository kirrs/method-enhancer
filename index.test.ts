import { Enhance, Enhancement, SafeThis, enhancer } from '.'

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

test('check class', () => {
  class B implements Enhancement<A> {
    words(this: SafeThis<A, 'words'>, arg: string): string {
      return 'Hello ' + this.$words(arg) + '.'
    }
  }

  const b = new B()

  class A {
    @Enhance(b.words)
    words(arg: string) {
      return arg
    }
  }

  const a = new A()

  expect(a.words('world')).toEqual('Hello world.')
})
