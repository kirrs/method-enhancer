import { Enhance, Enhancement } from '.'

test('check class', () => {
  class B implements Enhancement<A> {
    words(target: A['words'], arg: string): string {
      return 'Hello ' + target(arg) + '.'
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
