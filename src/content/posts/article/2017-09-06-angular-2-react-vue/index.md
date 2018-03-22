---
category: article
layout: post
title: "Why you moved from Angular 2 to Vue.js (and why you didn't understand what React is about)"
subtitle: "Or, why we should never compare apples to oranges, again."
syndication:
  - name: Medium
    url: https://medium.com/@resir014/why-you-moved-from-angular-2-to-vue-js-and-why-you-didnt-understand-what-react-is-about-107ea9188912
---

A few days ago an article surfaced on Medium titled ["Why we moved from Angular 2 to Vue.js (and why we didn’t choose React)"](https://medium.com/reverdev/why-we-moved-from-angular-2-to-vue-js-and-why-we-didnt-choose-react-ef807d9f4163). It finally made it to my circle of peers today, so I finally managed to read what the article is all about. What started out as a promising article quickly derailed into an endless stream of bad takes, to the point where I had to write a counter-critique.

Full disclosure: I've spent a fair amount of time on all three frameworks, and while I spend more time on Angular 2+, I've spent sufficient time on [React](https://facebook.github.io/react/) and Vue as well. And while I try to make these counter-critiques as balanced as possible, you don't have to take my word for it.

## Missing the point of TypeScript

The article expresses about how [TypeScript](http://www.typescriptlang.org/) is their main source of frustration of Angular 2. Many other people even state how using TypeScript means learning an entirely different language altogether. But here's the thing:

> Your JavaScript code is already TypeScript.

TypeScript is not "a different language". This is pretty much misconception #1 whenever people talk about TypeScript. TypeScript is merely a **superset** of JavaScript, which adds **optional** static type-checking **on top of** standard JavaScript. Based on my personal experience (when writing [my personal AI code for Screeps](https://github.com/resir014/screeps)), 75% of the time you're just writing standard ES6 on top of TypeScript. On top of that, it has top-notch IDE integration which allows for auto-completion experience that has never been seen before in any JavaScript environment.

To reiterate, the typing syntax provided by TypeScript is entirely optional. You don't need it, but TypeScript offers optional stricter type-checking, which better catches typing errors at compile time.

That's because TypeScript *is* JavaScript.

## Beating the Angular dead horse

The author initially started strong with the argument that Angular 2 has undergone many different mutations throughout its beta phase, its Release Candidates, and its final release. And while I find there's nothing that's inherently wrong with Angular 2, I totally agree that most developers who have lived their life with Angular 1[^fn-ng1] find the massive changes of Angular 2 to be quite the dealbreaker, and it's one of the many reasons people prefer to switch to frameworks like React.

I did dabble around with Angular 1 back in the day, but not too much, to the point that I could pick up Angular 2 at a much faster pace. And to be honest, I'm quite comfortable with it. It has a unique, modular structure, and writing apps with it makes me care a little more about best practices.

My attention was drawn into the comparison chart the author made of the three frameworks.

<figure>
  <img src="./table.png" alt="table.png">
</figure>

The table outlines that Angular is "slow" to code in, which is a highly subjective thing. In fact the author echoes this subjectivity as well in the "Easy to learn part", particularly with not-at-all scientific units like "slow", "medium", and "fast". It's very useful to do a little bit of benchmarking and compare this with other peers who have gone through the same path (as the author mentioned in the comments). Unfortunately, I didn't see any of these in the article.

> Reactivity: Kind of

Actually, Angular 2+ is built *for* reactive programming! There's a reason that it's built on top of [RxJS](http://reactivex.io/), a library that improves the functional reactive programming capabilities of JavaScript.

## Glancing over React like it's nothing

In this article, the section on React contains only one paragraph. When I read that, my initial takeaway on their answer to the question "why we didn't choose React" is that they never actually taken a deep dive into it. In fact, the whole article is more about Angular and Vue than it is about React.

The other part where they brought up React is when they talked about their licensing.

> At the time I write this, there is great amount of discussion because Facebook changed the React license to BSD+Patents.

The BSD+PATENTS license has been used by React [since 2015](https://github.com/facebook/react), and Facebook has never changed it ever since.

In fact, it was only recently brought into the spotlight because the Apache Software Foundation (ASF) finally realised that React's BSD+PATENTS license clashes with the Apache License's terms, therefore marking it [incompatible with ASF's projects](https://www.apache.org/legal/resolved.html#category-x).

## Why we should never compare apples to oranges, again

The vagueness of the article begs to imply that the author wrote off Angular due to mere frustration, and thanks to the time spent on trying to overcome their frustration, has lost all belief in Angular, whilst glancing over the garden of React and throwing a random paper plane into the general direction of Vue.js.

The way they threw the other two frameworks off is a little unfair. I believe that with a level head, the author will be able to see the intricacies of these frameworks. As I said, I've spent enough time with all of these three to be able to make a conscious decision about which framework you should use. I'm currently working on an Electron app in Angular, I wrote [a video aggregation site](https://github.com/tildetown/tildetv-frontend) in Vue.js, and while I haven't made anything notable in React, I'm looking forward to creating sleek apps with it sometime soon.

And these frameworks do adapt to very specific use cases. For instance, Angular fits well in an enterprise environment, React is better suited for developing declarative, cross-platform apps that work on both desktop and mobile, whereas Vue fits well if you want your single-page application to be as lightweight as possible.

Either way, if you understand the general gist of how these frameworks work, you can easily adapt yourself to all the other frameworks easily. These three frameworks are nearly similar by the typical pattern of a framework, they're just packaged in a different way.

I personally classify Angular and Vue as *frameworks* while React as a *library*. The former forces design decisions on you and promotes best practices, while the other forces you to make your own decisions about how your own coding practices are going to shape up as your project grows. While people still love to compare these three frameworks, I believe that comparing them are like comparing apples to oranges.

In which case, the decision falls on you.

> You like Vue? Cool!<br>
> You prefer React? That's great!<br>
> You want to get down and dirty with Angular? That's adventurous of you, but oh well, you do you!

---

*This story is also published on [Medium](https://medium.com/@resir014/why-you-moved-from-angular-2-to-vue-js-and-why-you-didnt-understand-what-react-is-about-107ea9188912).*

[^fn-ng1]: Google insists Angular 1 be referred to as "AngularJS" and Angular 2+ as "just Angular". This just creates further confusion and is probably part of the reason why it threw people off from upgrading to it in the first place.
