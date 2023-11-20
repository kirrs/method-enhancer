# Method Enhancer

Enhance the class method in a simple way.

## Install

```
npm install method-enhancer
```

## Usage

```ts
import { Enhance } from 'method-enhancer'

class SpeakerEnhancer implements Enhancement<Speaker> {
  say(this: SafeThis<Speaker, 'say'>, arg: string) {
    console.log('Before')
    this.$say(arg)
    console.log('After')
  }
}

const speakerEnhancer = new SpeakerEnhancer()

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

Or use function:

```ts
import { Enhance, enhancer } from 'method-enhancer'

const speakerEnhancer = enhancer<Speaker>({
  say(arg) {
    console.log('Before')
    this.$say(arg)
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
import { Enhance } from 'method-enhancer'

const speakerEnhancer: Enhancement<Speaker> = {
  say(arg) {
    console.log('Before')
    this.$say(arg)
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

`@Enhance` decorator make `this.$originalName` point to the target method, and pass `this` to the enhancer.
