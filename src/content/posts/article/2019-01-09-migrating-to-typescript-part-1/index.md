---
category: article
layout: post
date: 2019-01-09T16:48:00+07:00
title: 'Migrating to TypeScript, Part 1: Introduction and getting started'
lead: 'In this first article of a multi-part series on migrating to TypeScript, we look into the things you need to do to prepare your project for the Big Rewrite.'
header_image: franz-harvin-aceituna-432708-unsplash.jpg
syndication:
  - name: Medium
    url: https://medium.com/kata-engineering/migrating-to-typescript-part-1-getting-started-f81e8d8c81aa
  - name: dev.to
    url: https://dev.to/resir014/migrating-to-typescript-part-1-getting-started-n4l
---

<em>Header image by [Franz Harvin Aceituna](https://unsplash.com/photos/vkfrFrAIO4o) on [Unsplash](https://unsplash.com/).</em>

[TypeScript (TS)](https://www.typescriptlang.org/) is a language which has seen quite a meteoric rise lately. It's gone some favourable results on the [2018 State of JavaScript (JS)](https://2018.stateofjs.com/javascript-flavors/typescript/) survey. It has even come to the point where big names like [Kent C. Dodds](https://twitter.com/kentcdodds/status/1075853845048188929) started migrating into it.

To learn more about how the TypeScript type system works, and how it can help you, watch this talk by Anders Hejlsberg, the creator of TypeScript.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/hDACN-BGvI8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

For many of us already using TypeScript, we could never imagine writing JS without it anymore. And with newly-added support for Babel compilation, it gets much easier to integrate with the rest of the JS ecosystem. But for many people looking to migrate their apps into it, it could feel a little too overwhelming. This gets further out of control when you're looking at a medium/large-sized app, all already written in JavaScript.

A lot of TypeScript learning materials out there never seem to dive deep on migrating a well-matured app to TypeScript. Worse still, TypeScript does have their own, [official migration guide](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html) - but it's horribly outdated.

So in this series of posts, I try to outline my personal steps on how to migrate an existing codebase to TypeScript. The first part will go through the steps on preparing your project for the Big Rewrite. This includes setting up the TS compiler, and the basic essentials of the TypeScript compiler.

## Table of contents

- Part 1: Introduction and getting started (you are here)
- [Part 2: Trust the compiler!](/posts/2019/02/20/migrating-to-typescript-part-2/)

---

## So what is TypeScript, exactly?

TypeScript is a superset of JavaScript that compiles to plain JavaScript code. It enables great tooling and developer experience through the power of static typing. Some of the improved JS experience being unlocked by static typing includes better refactoring tools, statement completion, and more.

TypeScript was authored by Anders Hejlsberg, known for being the lead architect of C# and creator of [Turbo Pascal](https://en.wikipedia.org/wiki/Turbo_Pascal). TypeScript 2.0 was released on September 2016, with much-improved Node.js modules support and stricter `null` checking. Since then, the language is continuously improved with features like object rest/spread, `--strict` mode, conditional types, and more. [TypeScript 3.0](https://blogs.msdn.microsoft.com/typescript/2018/07/30/announcing-typescript-3-0/), released in July 2018, even has support for monorepos through project references.

To read more about TypeScript, I recommend the [TypeScript Deep Dive](https://basarat.gitbooks.io/typescript/) book by Basarat.

## Getting started with TypeScript

So to start off, we will need to set up our environment for TypeScript. There are two ways to set this up:

- You use Babel 7 + TypeScript preset to compile, and have the TypeScript compiler only do the type-checking.
- You use the TypeScript compiler to both type-check and compile your code.

Since we’re migrating from JavaScript, we can assume that we’re already using Babel in our development toolchain, so we can go with the first option. You can also run the second option and chain with Babel. But the first option is still better if we want to have finer control over the Babel presets/plugins we use as well.

### Initialising the compiler

This guide will make use of TypeScript 3.2. It should work as well on any versions starting from 3.0+.

To get started with TypeScript, install the TypeScript compiler CLI by running:

```sh-session
$ npm install -g typescript
```

Then run `tsc --init` to initialise a `tsconfig.json` file with the default options. It lists out all the options available as well as an explanation, with the non-essential options commented out. The number of options may overwhelm you, but let's break the config down to just the essentials.

`tsconfig.json`

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": false,
    "esModuleInterop": true,
    "downlevelIteration": true,
    "lib": ["esnext", "dom"],
    "module": "commonjs",
    "noUnusedLocals": true,
    "outDir": "dist",
    "skipLibCheck": true,
    "strict": true,
    "target": "esnext"
  },
  "include": ["src"]
}
```

This setup will take everything from the `src` and compile it into the `dist` folder. There are some other essential compiler options here, but we'll go through them in the next section. To compile, run the `tsc` command.

**Note:** If you use webpack to compile things, you don't need the `outDir` option!

### Setting up build tasks

Now that the TypeScript compiler works, we can include it as a script in our `package.json` file!

```json
{
  "scripts": {
    "build": "tsc"
  }
}
```

This way, you can simply run `yarn build` (or `npm run build` if you're running npm) to build your project.

### Wiring up the TypeScript Babel preset (Optional)

If you already use Babel to compile your ES6+ JS code, you can use the [TS preset for Babel](https://babeljs.io/docs/en/babel-preset-typescript). Note that you need **Babel 7 and above** to use this.

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-typescript"],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread"
  ]
}
```

The TypeScript compiler supports all modern ES2015 features, as well as next-generaton ES features. Though one common pitfall is that **you can't use next-generation syntax newer than stage-3**, since TS doesn't support it. This means that using proposed syntax like the [pipeline](https://github.com/tc39/proposal-pipeline-operator) will give you type errors. The proposal plugins should include the stage-3 features required for TypeScript transpilation.

Note that the Babel compiler **only** removes the types from your code. **It does not do any extra type-checking!** Make sure to run type-checking separately with `tsc --noEmit`. Or better yet, add it as a compiler option into your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "noEmit": true
  }
}
```

This option will run the TypeScript compiler without outputting any code, so it only runs type-checking. You can then add the `tsc` command to your `package.json` scripts, which will help if you use a CI system as well.

```json
{
  "scripts": {
    "type-check": "tsc"
  }
}
```

**Note:** If you use Flowtype, you can't use the Flowtype Babel preset together with the TypeScript preset. You have to choose one or the other!

## `tsconfig.json` essentials

The above `tsconfig.json` file already contains the essential compiler options when working with TypeScript. Let's go through the essentials one by one.

### TS/JS interoperability

The TypeScript compiler can also be set up to type-check and compile JS files alongside TS files. `allowJs` allows regular JavaScript files to be compiled. If you want to also enable type-checking in JavaScript files, you can also enable `checkJs`. If you're just getting started, it's recommended to disable `checkJs` and manually enable per-file type checking. To do that, add a `// @ts-check` comment on the top of the JS file you'd like to type-check.

Another compiler option to take note of is `esModuleInterop`. This allows you to do default imports with CommonJS modules (e.g. `import React from 'react';`). For TS veterans, this option is similar to `allowSyntheticDefaultImports`. The only difference is that it added some helpers during compile time for improved Babel interoperability.

### Libraries and compile targets

There are three options that define how your TS code is interpreted by the compiler.

`lib` outlines the TS library files used for compilation. Some libraries that are commonly used are:

- `esnext` - Modern ESnext features (up to stage-3 recommendations)
- `es201x` - Yearly ES specifications. Note than including one year will include all of the yearly specs before it (e.g. `es2018` will also include `es2017`, `es2016` and `es2015`).
- `dom` - DOM-specific APIs.
- `webworker` - APIs for [Web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API).

`target` defines the target version of ES.

`module` defines the module type the TS compiler will generate. If you set `target` to `es5` or below, it will default to `commonjs` (standard CommonJS modules for Node.js compatibility). Otherwise, it will default to `esnext` (ES Modules).

---

And that's it for this part. In part 2, we'll go through how to make your TypeScript migration painless by adding types gradually. We'll also go through the quirks of TypeScript's type system, as well as changing your way of thinking to write TypeScript apps.

Once again, I really recommend the [TypeScript Deep Dive](https://basarat.gitbooks.io/typescript/) book by Basarat. His book on TypeScript has helped me a lot on learning this language. Should you ever get stuck, the `#typescript` channel on the [Reactiflux](https://www.reactiflux.com/) Discord server has a bunch of lovely people who know TypeScript inside and out. Feel free to hop in and ask questions!
