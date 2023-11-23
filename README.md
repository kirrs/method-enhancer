# Method Enhancer

Enhance the class method in a simple way.

## Install

```
npm install method-enhancer
```

## Usage

```ts
import { Enhance, Enhancement } from 'method-enhancer'

class SpeakerEnhancer implements Enhancement<Speaker> {
  say(target: Speaker['say'], arg: string): void {
    console.log('Before')
    target(arg)
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

## Typescript Support

Only support Typescript 5.0 and above
