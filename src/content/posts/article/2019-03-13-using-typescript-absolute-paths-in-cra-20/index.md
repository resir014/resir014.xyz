---
category: article
layout: post
date: 2019-03-13T09:37:00+07:00
title: "Using TypeScript's absolute paths in Create React App 2.0 without ejecting"
lead: 'Down with the `../../../`!'
header_image: Ejection_seat_test_at_China_Lake_with_F-4B_cockpit_1967.jpg
syndication:
  - name: dev.to
    url: https://dev.to/resir014/using-typescripts-absolute-paths-in-create-react-app-20-without-ejecting-4kd9
---

<em>Header image: [Ejection seat test at China Lake with F-4B cockpit (1967)](https://commons.wikimedia.org/wiki/File:Ejection_seat_test_at_China_Lake_with_F-4B_cockpit_1967.jpg), public domain (US).</em>

[Create React App (CRA) 2.0](https://facebook.github.io/create-react-app/) allows for drop-in support for TypeScript. This means we can finally use TypeScript from the core CRA package without having to rely on community-maintained forks like [create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript). Thanks to Babel 7’s TypeScript support, the TypeScript integration to CRA 2.0 is seamless. Although this means that slight differences from `create-react-app-typescript` apply.

One TypeScript feature that lacks from `create-react-app` and TypeScript is the ability to use absolute imports. This allows importing from an absolute path based on the project's root source directory. It means you can import modules without having to resort to relative paths. Nothing wrong with them, but when your folders are deeply nested, they can sometimes go ugly. (`../../../../../../../`, anyone?)

Unfortunately, with CRA 2.0 making use of Babel for transpilation, this feature is rather limited. And they made it clear by forcing some defaults on this behaviour. For instance, CRA 2.0 automatically removes the `baseUrl` and `paths` options from the `tsconfig.json` any time we run its scripts. This means for some people wanting to make use of this feature, ejecting is the only option.

Not anymore. Thanks to some clever little hacks and using CRA rewiring tools, we can now set up CRA 2.0 to respect TypeScript's absolute imports without ejecting.

## Before we start

Please note that rewiring CRA scripts is a slightly-advanced technique. Proceed with caution!

By rewiring your scripts, your're breaking the ["guarantees"](https://github.com/facebookincubator/create-react-app/issues/99#issuecomment-234657710) that React provides. You now accept that you "own" your configs, which means that the CRA team cannot give support for your rewired config.

> "Stuff can break" — [Dan Abramov](https://twitter.com/dan_abramov/status/1045809734069170176)

But fortunately, with tools like `craco`, we can easily revert back to the default CRA config should things go wrong. It's still a better option over ejecting CRA entirely.

## Set up `craco`

[craco](https://github.com/sharegate/craco) is a wonderful tool which allows us to extend CRA 2.0 configs without ejecting. It's the spiritual successor for [react-app-rewired](https://github.com/timarney/react-app-rewired), which has ceased development.

```sh
# yarn
$ yarn add @craco/craco

# npm
$ npm install @craco/craco
```

After `craco` is installed, create an empty `craco.config.js` file. We'll touch this later.

```js
// craco.config.js

module.exports = {
  // ...
}
```

And finally, change the npm scripts in the `package.json` to the following:

```diff
   "scripts": {
-     "start": "react-scripts start",
+     "start": "craco start",
-     "build": "react-scripts build",
+     "build": "craco build"
-     "test": "react-scripts test",
+     "test": "craco test"
   }
```

This will run the CRA scripts through `craco` which will inject the rewires set in `craco.config.js` to the scripts.

## Extend `paths` option from a separate file

CRA 2.0 will automatically override the `paths` config on the base `tsconfig.json` every time we run `npm start`. So we'll have to work around it by defining it from a separate file.

Name this file whatever you'd like. This file exists solely because CRA 2.1 overwrites our base tsconfig every time we run `npm start`. Always define paths in this file!

`tsconfig.paths.json`

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "//": "Define absolute imports path mappings.",
      "//": "Don't forget to add these to `resolve.alias` on `craco.config.js`.",
      "*": ["src/*"]
    }
  }
}
```

This allows us to set our absolute imports relative to the `src` folder, e.g. `components/Container`. If you prefer to use wildcard characters like `~`, you can also use that:

```json
{
  "//": "Allows you to import modules with the `~/components/Container` format.",
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "~/*": ["src/*"]
    }
  }
}
```

Then, we can extend the config above in our main `tsconfig.json` file.

`tsconfig.json`

```json
{
  "//": "Extend the config we just created",
  "extends": "./tsconfig.paths.json",
  "compilerOptions": {
    "//": "the rest of the tsconfig"
  }
}
```

## Rewire webpack aliases using `craco`

Now it's time to tell the transpiler to alias a root module directory to its correct path. There are two ways to do this, one through Babel using `babel-plugin-module-resolver`, and the other by setting webpack aliases. We'll do the latter.

Open your `craco.config.js` file and add the webpack config rewire.

```js
// craco.config.js
const { paths } = require('@craco/craco')

module.exports = {
  webpack: {
    alias: {
      // Add the aliases for all the top-level folders in the `src/` folder.
      assets: `${paths.appSrc}/assets/`,
      components: `${paths.appSrc}/components/`,
      interfaces: `${paths.appSrc}/interfaces/`,
      modules: `${paths.appSrc}/modules/`,
      utils: `${paths.appSrc}/utils/`,

      // Another example for using a wildcard character
      '~': `${paths.appSrc}/`
    }
  }
}
```

Start the development server again, and now your absolute imports should work!

## Configure Jest's `moduleNameMapper`

If you use Jest, you should also let it know how to handle absolute imports. We can, of course, do this through `craco`.

```js
module.exports = {
  webpack: {
    alias: {
      // Add the aliases for all the top-level folders in the `src/` folder.
      assets: `${paths.appSrc}/assets/`,
      components: `${paths.appSrc}/components/`,
      interfaces: `${paths.appSrc}/interfaces/`,
      modules: `${paths.appSrc}/modules/`,
      utils: `${paths.appSrc}/utils/`,

      // Another example for using a wildcard character
      '~': `${paths.appSrc}/`
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
        // Jest module mapper which will detect our absolute imports.
        '^assets(.*)$': '<rootDir>/src/assets$1',
        '^components(.*)$': '<rootDir>/src/components$1',
        '^interfaces(.*)$': '<rootDir>/src/interfaces$1',
        '^modules(.*)$': '<rootDir>/src/modules$1',
        '^utils(.*)$': '<rootDir>/src/utils$1',

        // Another example for using a wildcard character
        '^~(.*)$': '<rootDir>/src$1'
      }
    }
  }
}
```

---

## And that's it!

Your CRA 2.0 setup now respects TypeScript's absolute imports. Pretty simple, right?

Enjoy the power of TypeScript in your React app! If you want to learn more about how TypeScript can help you in React, check out the [React TypeScript Cheatsheet](https://github.com/sw-yx/react-typescript-cheatsheet). It also includes cheatsheets for common React patterns in TypeScript.
