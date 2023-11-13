# Method Enhancer

Enhance the class method in a simple way.

## Install

```
npm install method-enhancer
```

## Usage

```ts
import { Enhance, enhancer } from 'method-enhancer'

const speakerEnhancer = enhancer<Speaker>({
  say(arg) {
    console.log('Before')
    this._say(arg)
    console.log('After')
  }
})

class Speaker {
  @Enhance(speakerEnhancer.say)
  say(arg: string) {
    console.log(arg)
  }
}

const speaker = new Speaker()

speaker.say('Hello world')
// output:
// Before
// Hello world
// After
```

If you set `strictNullChecks: false`, you can write like this:

```ts
import { Enhance, Enhancement } from 'method-enhancer'

const speakerEnhancer: Enhancement<Speaker> = {
  say(arg) {
    console.log('Before')
    this._say(arg)
    console.log('After')
  }
}

class Speaker {
  @Enhance(speakerEnhancer.say)
  say(arg: string) {
    console.log(arg)
  }
}

const speaker = new Speaker()

speaker.say('Hello world')
```

## Typescript Support

Only support Typescript 5.0 and above

## How Does This Work?

`@Enhance` decorator make `this._originalName` point to the target method, and pass `this` to the enhancer.
