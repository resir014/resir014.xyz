---
category: article
layout: post
title: 'No, TypeScript is not a waste of time.'
lead: 'Another day, another heated "discussion" about how static typing in JavaScript is both the single greatest thing since sliced bread _and_ the worst thing to have happened to humanity as a whole.'
header_image: chris-leggat-AoEEtI6onH4-unsplash.jpg
date: 2019-07-30T00:27:00+07:00
syndication:
  - name: dev.to
    url: https://dev.to/resir014/no-typescript-is-not-a-waste-of-time-2hpk
---

_Header image by [Chris Leggat](https://unsplash.com/photos/AoEEtI6onH4) on Unsplash._

Another day, another heated "discussion" about how static typing in JavaScript is both the single greatest thing since sliced bread _and_ the worst thing to have happened to humanity as a whole.

Let's look into a [recent dev.to post](https://dev.to/parkroolucas/typescript-is-a-waste-of-time-change-my-mind-pi8) that has been stirring this debate back up again. I'll try to clear out some misconceptions, and hopefully, take things in a level-headed manner.

Before I start, I want to change up some terms I used, especially the one in the title. Instead of referring to TypeScript specifically, I'd like to use the term "typed JavaScript". Because there's also another tool in the typed JS land, [Flow](https://flow.org/), and I don't want to leave Flow users out. After all, we have the same goal of enforcing type soundness/safety in our apps.

Another term that I would like to throw into the glossary is "dynamically-typed" JS, or "dynamic" for short. Despite what the original post wanted to make you believe, writing JS code without type annotations doesn't mean that your code. A string written in dynamic JS still has a type of `string`. So is a `number`, `boolean`, you get the point.

## Yes, it's longer to start writing statically-typed JS short-term...

I'm going to level with you: writing dynamically-typed JS is faster in the short-term. You might be surprised hearing that from a TypeScript advocate, but I'm being serious here. Really!

Let's say you're writing a Node.js library. If you're writing it in dynamically-typed JS, you can write your library and publish it, all without going through any build tools. It's that fast! For tiny libraries that do one thing, writing it like this is the most effective way because of the speed.

But now, let's say you're writing an entire backend in Node.js. It's just a tiny API service with a couple endpoints. You have written your authentication system, middleware, and controllers in JavaScript. And since it's a small endpoint with minor functionalities, you went with plain ol' JavaScript.

Now, imagine that tiny API service balooned into a full-fledged platform API with thousands of code. Probably tens of thousands of lines of code. Then you realised that you found a bug in one of your endpoints. Oh dear! Unit testing didn't catch it, so you had to spend hours to trace around your app, looking for the issue. Maybe even setting up breakpoints, or even doing the old-fashioned `console.log`-driven debugging.

Then, you found the issue. Remember that one time you refactored that one middleware? You also changed the name of the exported function along with it. Sure, you had that middleware unit-tested, but your unit tests were only isolated to that middleware.

Then your eyes came across a file where you had that middleware imported. _Of course._ You changed the exported function name, but you forgot to rename the imports.

Hours of productivity lost just because of a typo or missing file!

## ...but the long-term effects are real!

Sure, you can also check mismatched imports with linting tools. But you might also want to rename a function — as well as updating the function name on all the files that import said function — all in the click of a button. After all, humans make mistakes, and missing things like this is not uncommon. TypeScript's support for [quick refactoring](https://code.visualstudio.com/docs/editor/refactoring) and find-and-replace support helps you deal with this. Therefore you can focus more on writing code instead of doing pointless find-and-replace by hand.

Static type checkers like TypeScript and Flow also help reduce the amount of bugs in your code by detecting errors like this during compile time. There's some statistical proof to this, too. In general, using static typing in your JavaScript code [can help prevent about 15%](https://blog.acolyer.org/2017/09/19/to-type-or-not-to-type-quantifying-detectable-bugs-in-javascript/) of the bugs that end up in committed code.

Sure, this will make starting out a project with TypeScript much slower, because you'll need to define types, interfaces, and the like, in the very early stages of your app. But I'd argue that having you write implementation models, in the form of types and/or interfaces, makes you think about your app's data structure early in the day.

This greatly improves confidence of your app in the long run. And when you use these types well, in many cases you don't even need types, thanks to TypeScript's [control-flow based type analysis](https://mariusschulz.com/blog/control-flow-based-type-analysis-in-typescript). The benefits of TypeScript on large-scale apps outweighs the trade-offs of the longer time to kickstart your TypeScript project.

Is this an investment that you would take in the future? It sure is for me, but I wouldn't make any prior judgement for your apps. It's still up to you to decide whether that investment is worth it.

## You can adopt TypeScript incrementally

Maybe you're already maintaining a medium to large-scale app that's already written in plain ol' JavaScript. And you want to migrate to TypeScript, but are afraid that the red squiggly lines will haunt you in your sleep. How would you

There are various guides in migrating to TypeScript. There's one in Basarat Ali Syed's awesome [TypeScript Deep Dive](https://basarat.gitbooks.io/typescript/content/docs/types/migrating.html) handbook. I have also written a comprehensive guide [here](https://dev.to/resir014/migrating-to-typescript-part-1-getting-started-n4l).

Another neat part of TypeScript is being able to infer types of normal JS files through JSDoc annotations, so if you write valid JSDoc annotations, and have JS typechecking turned on, it'll be easy for you to migrate down the road.

![infer-types-from-jsdoc](https://media.giphy.com/media/fMzOUcjYX6k8GdC8a3/giphy.gif)

Although admittedly, the migration experience is where TypeScript falls short. The reason I linked to third-party guides is — well — TypeScript _does_ have an [official migration guide](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html), although it's horribly outdated. The official documentation also makes hard assumptions that the user know _something_ about statically-typed languages, so I wouldn't recommend them to newcomers.

Though rest assured, the TypeScript team has been working on [reworking the documentation](https://github.com/microsoft/TypeScript/issues/31983), as well as [a new handbook](https://github.com/microsoft/TypeScript-New-Handbook) that will hopefully teach TypeScript a lot more progressively.

## But what about dynamic, runtime values?

Admittedly, the TypeScript team has explicitly stated that extending static type-checking to the runtime is a [non-goal](https://github.com/Microsoft/TypeScript/issues/1573#issuecomment-68374376) for the TypeScript compiler itself. But in reality, we still have to handle these runtime boundaries. A common example to this would be reading a JSON output from an API, or consuming an HTTP request payload.

Since there's a strong community backing towards TypeScript, the community has developed elegant solutions to this issue. There are tools like [io-ts](https://github.com/gcanti/io-ts) which you can use to determine runtime representations in TS. A suitable alternative to Flow would be [flow-runtime](https://gajus.github.io/flow-runtime/).

## Static typing and testing go hand-in-hand!

So far we've done a lot in making sure the type safety of our app with static types. Despite that, there are certain bugs static typing cannot catch. For a quick example, testing whether that toggle button displays its opposite state the right way when clicked.

I'm a fan of the [Testing Trophy](https://kentcdodds.com/blog/unit-vs-integration-vs-e2e-tests) model by Kent C. Dodds. In his model, both linting/static analysis/static type checking and unit testing are located in the "base" of the trophy. This means that they're both integral parts into building a testing experience that evokes confidence in your code. Hence I'd like to argue that both static typing and unit testing go hand-in-hand in helping you write code with less bugs!

Let's put the toggle button example above into code. We're using TypeScript as our static typing, and Jest + react-testing-library to test our code.

Here's an example of said component, implemented in React.

```tsx
import * as React from 'react'

interface ToggleButtonProps {
  enabledText: string
  disabledText: string
}

function ToggleButton({ enabledText, disabledText }: ToggleButtonProps) {
  const [toggle, setToggle] = React.useState(false)

  const handleToggle = () => {
    setToggle(!toggle)
  }

  return (
    <div>
      <span>{toggle ? enabledText : disabledText}</span>
      <button onClick={handleToggle}>Toggle</button>
    </div>
  )
}

export default ToggleButton
```

On the surface, it looks like static typing has done its job. However, if we take a look closer, we're able to set a custom state text for our toggle button. Sure, TypeScript can check if the string we passed to the `enabledText` and `disabledText` we pass into the component is a string. But that's just half of the battle.

After all, if we've set our button's enabled and disabled state is set to `'On'` and `'Off'` respectively, we want it to correctly show `'Off'` when it's disabled, and `'On'` when it's enabled. Not the other way around.

Since we already checked the types of our component and its props through TypeScript, we can focus on testing the behaviour of the button.

The following example uses [Jest](https://jestjs.io/) as our test runner, and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro) as our React testing utility.

```tsx
import * as React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import ToggleButton from './ToggleButton'

describe('ToggleButton', () => {
  afterEach(cleanup)

  test('correctly renders the state of button', () => {
    const { getByText, queryByText } = render(<ToggleButton enabledText="on" disabledText="off" />)
    // Test the initial state of the button.
    expect(getByText('Off')).toBeDefined()
    expect(queryByText('On')).toBeNull()

    // Fires a click event to the button.
    fireEvent.click(getByText('Toggle'))

    // Test if toggle state is correctly modified.
    expect(getByText('On')).toBeDefined()
    expect(queryByText('Off')).toBeNull()
  })
})
```

Two things are happening here.

- Static typing provides soundness and improves the developer experience by detecting type errors and allowing developers to refactor confidently through great IDE tools.
- Unit testing provides confidence that our code behaves the way that it's supposed to be used.

[Try it out in CodeSandbox](https://codesandbox.io/s/react-ts-unit-test-example-2u85p)

## Let's clear our heads

The original post contained a lot of subjective points, which was a shame because I'd love some objective reasoning as to why static types aren't worth the time.

My rebuttal to the original post... also contains a lot of subjective points. But that's fine! Because my goal in writing this post isn't about going off about how one technology is "objectively better" than the other. I was trying to outline how one technology might benefit the users more than the other, and vice versa. And also find a commonality shared between both of them. Or at least, [I tried to](https://www.destroyallsoftware.com/talks/ideology).

Instead of building inflammatory, subjective opinions disguised as "objective" "fact", let's approach things in a level-headed manner and understand that certain tools exists for certain reasons. Constructive criticism is a great power to improve all of us, regardless of which side you're in on this debate.

Since I'm a front-end developer myself, a good example I'd like to pick would be the endless debates between the Big Three frameworks (Angular, React, and Vue), and why one is better than the other.

For example, Vue and React developers often went up in arms, writing senseless Medium thinkpieces about how one is better than the other. I'm a React guy myself, but I still understand that Evan You had his own issues to tackle with Vue, hence the issues that he solved being his framework's key selling point. The most prominent ones being the learning curve and how easy it is to adopt.

The people behind TypeScript and Flow are smart enough to tackle one of their pain points in writing JavaScript. They want to write JavaScript code that scales in large-scale projects. And the way they approach that is to provide a static typing superset that ensures type soundness and safety, as well as improving productivity through developer tools that are enabled thanks to the power of static types. And for some people, it worked well. TypeScript and Flow are both running many medium to large-scale projects out there (including where I work), and I could imagine all the ways they enabled engineers to write code with less bugs.

TypeScript might be a waste of time **for you**, but it certainly isn't a waste of time for me.

Don't get me wrong, there's nothing wrong in writing plain JS as well! Maybe you want to iterate faster on the early stages of the project, so you opted for plain JS instead of jumping into TS straight away. Maybe you want to get down and dirty with TypeScript right from the get-go. Both of these are fine. After all, it's only _you_ knows how to best develop your app. It's only _you_ who knows how to serve a better user/developer experience.

Because regardless of our choices of tools, languages, and frameworks (or lack thereof), it all ends up with a working app.

Right?
