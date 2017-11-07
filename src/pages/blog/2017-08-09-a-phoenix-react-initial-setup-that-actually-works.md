---
category: blog
layout: post
title: "A Phoenix+React initial setup that actually works"
subtitle: "I got tired of following guides on connecting React with Phoenix that never seem to work, so I made my own."
---

*This post is also published on [Medium](https://medium.com/@resir014/a-phoenix-react-initial-setup-that-actually-works-c943e48f1e9e).*

---

I've been playing around with [Elixir](https://elixir-lang.org/) a lot lately. Recently a friend showed me [this blog post](https://blog.discordapp.com/scaling-elixir-f9b8e1e7c29b) by the Discord engineering team about how they could scale their platform through the power of Elixir, and after reading it I was convinced to give it a try. If you're about to learn the language, and you came from Node.js like me, I suggest you go watch [this introductory video](https://www.youtube.com/watch?v=q8wueg2hswA).

A research into the Elixir ecosystem pointed me to the [Phoenix](http://phoenixframework.org/) framework. If Ruby had [Rails](http://rubyonrails.org/), and PHP had [Laravel](https://laravel.com/), then Elixir has Phoenix. If you've ever used Rails before, you'll feel right at home. It has the bare essentials of your typical MVC framework, although it has some neat additional features like [Channels](https://hexdocs.pm/phoenix/channels.html).

My ideal stack for a web app usually includes a React frontend, so it would make sense that my first question about Phoenix is:

> How do you set up Phoenix with a React frontend?

Unfortunately, setting up React with Phoenix isn't as straightforward as many people think. Almost every guide that I came across on the internet only goes as far as rendering a single React component and doesn't cover essential things like routing and API fetching. It took me a while, but finally, I found a setup that Actually Works™.

So if you're like me and have been wondering how the heck do you actually get it to work, I'm going to show you how, and hopefully put an end to this question once and for all.

**Note:** This guide doesn't cover server-side rendering yet. I might include it in a future update post.

## TL;DR

If reading's not your thing, I have prepared the end result of this guide [here](https://github.com/resir014/phoenix_react_playground). To make it easier to understand, the commit logs outline the steps taken on this guide.

Once you're all set up, you should have a working Phoenix setup with the following stack:

* Elixir (^1.5.0)
* Node.js (^8.2.1)
* npm (^5.3.0)
* Phoenix (^1.3.0)
* React (^15.6.1)
* TypeScript (^2.4.2)
* Webpack (^3.4.1)

---

## Getting started

In this guide, I will assume that you already have [Elixir](https://elixir-lang.org/), [Phoenix](https://hexdocs.pm/phoenix/installation.html), and [Node.js](https://nodejs.org/en/) installed. If you haven't already, open the links above in a new tab and do it. Don't worry, I'll wait.

We're also going to use Phoenix 1.3, the latest version available at the time of writing.

### The boilerplate

We're going to set up a new Phoenix project, complete with the build environment we're going to use. Phoenix ships with [Brunch](http://brunch.io/) by default. We're not going to use it and will use [Webpack](https://webpack.js.org/) instead; partly because I don't really like Brunch, but also because React has support for Webpack's hot module reloading.

So let's set up a Phoenix boilerplate without Brunch.

```bash
$ mix phx.new phoenix_react_playground --no-brunch
```

When you're asked if you want to fetch and install dependencies as well, answer No. We'll get to it later.

And now let's set up our front-end tooling. Our set up will be a React frontend written in TypeScript, compiled with Webpack. By default, the `package.json` file set up with Phoenix is located in the `assets/` folder instead of the project root, which is a bad thing to do, since it could fuck up with IDEs like [Visual Studio Code](https://code.visualstudio.com/). So let's generate our `package.json` file in the project route instead.

```bash
$ cd phoenix_react_playground
$ npm init
```

Now we can install our Node dependencies. Add the following to `package.json`:

```json
{
  // include these at the end of package.json
  "dependencies": {
    "bootstrap": "4.0.0-alpha.6",
    "history": "^4.6.3",
    "phoenix": "file:deps/phoenix",
    "phoenix_html": "file:deps/phoenix_html",
    "react": "^15.6.1",
    "react-addons-css-transition-group": "^15.6.0",
    "react-addons-transition-group": "^15.6.0",
    "react-dom": "^15.6.1",
    "react-hot-loader": "^1.3.1",
    "react-router": "^4.1.2",
    "react-router-dom": "^4.1.2",
    "react-stdio": "^3.1.0",
    "reactstrap": "^4.8.0"
  },
  "devDependencies": {
    "@types/history": "^4.6.0",
    "@types/node": "^8.0.17",
    "@types/phoenix": "^0.0.4",
    "@types/react": "^15.6.0",
    "@types/react-dom": "^15.5.1",
    "@types/react-router": "^4.0.14",
    "@types/react-router-dom": "^4.0.7",
    "@types/webpack-env": "^1.13.0",
    "autoprefixer": "^7.1.2",
    "awesome-typescript-loader": "^3.2.2",
    "clean-webpack-plugin": "^0.1.16",
    "copy-webpack-plugin": "^4.0.1",
    "css-loader": "^0.28.4",
    "cssnano": "^3.10.0",
    "extract-text-webpack-plugin": "^3.0.0",
    "file-loader": "^0.11.2",
    "node-sass": "^4.5.3",
    "postcss-loader": "^2.0.6",
    "sass-loader": "^6.0.6",
    "source-map-loader": "^0.2.1",
    "style-loader": "^0.18.2",
    "typescript": "^2.4.2",
    "url-loader": "^0.5.9",
    "webpack": "^3.4.1",
    "webpack-cli": "^1.3.3"
  }
}
```

After adding the packages above, let's install our dependencies.

```bash
# NOTE: This MUST be run in order. Some npm packages rely on the Phoenix `deps/`
# directory, so `npm install` will fail if you run it first.
$ mix deps.get
$ npm install
```

Up next, we'll set up our front-end. Our set up is a React frontend written in TypeScript/TSX, with SCSS as the stylesheet preprocessor.

`webpack.config.js`

```js
const path = require('path')
const webpack = require('webpack')
const { CheckerPlugin } = require('awesome-typescript-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// Since Webpack will be run directly within Phoenix, we'll use the `MIX_ENV`
// variable instead of `NODE_ENV`.
const env = process.env.MIX_ENV === 'prod' ? 'production' : 'development'

const plugins = {
  production: [
    // Only run in production. Produce minified JS.
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    })
  ],
  development: []
}

module.exports = {
  devtool: 'source-map',
  entry: [
    path.join(__dirname, 'assets/js/app.tsx'),
    path.join(__dirname, 'assets/scss/app.scss')
  ],
  output: {
    path: path.join(__dirname, '/priv/static'),
    filename: 'js/app.js'
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ['awesome-typescript-loader'],
        include: path.join(__dirname, 'assets/js'),
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader', // for minifying CSS/adding vendor prefixes
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([
      path.join(__dirname, 'priv/static')
    ]),
    // Important to keep React file size down
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      }
    }),
    // Type checker for `awesome-typescript-loader`
    new CheckerPlugin(),
    // Add this plugin so Webpack won't output the files when anything errors
    // during the build process
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: 'css/app.css',
      allChunks: true
    }),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'assets', 'static') }
    ])
  ].concat(plugins[env]),
  resolve: {
    modules: [
      'node_modules',
      'assets/js'
    ],
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      phoenix: path.join(__dirname, '/deps/phoenix/priv/static/phoenix.js'),
      phoenix_html: path.join(__dirname, '/deps/phoenix_html/priv/static/phoenix_html.js')
    }
  }
}
```

`postcss.config.js`

```js
// The Webpack config also includes `postcss-loader` to minify CSS and add
// vendor prefixing. It loads the configurations set on this file.

// The list of browsers that we support
const supportedBrowsers = ['last 2 versions']

module.exports = {
  plugins: [
    require('autoprefixer')({ browsers: supportedBrowsers }), // add vendor prefixes
    require('cssnano')() // advanced CSS minificaion
  ]
}
```

This Webpack configuration works for the ideal Phoenix setup of placing unbundled assets on the `assets/` folder. That being said, the `--no-brunch` setup places our assets in the `priv/static/` folder. So we gotta move them first.

```bash
# First, create the `assets/` folder/
$ mkdir assets
# Then, move the `css/` and `js/` folders to `assets/`.
$ mv priv/static/css assets
$ mv priv/static/js assets
# And finally, move the rest of the `static/` folder to the `assets/` folder.
$ mv priv/static assets
```

And finally, we'll set up our TypeScript environment. We'll create a standard `tsconfig.json` file and fill it up with the following.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "moduleResolution": "node",
    "target": "es5",
    "jsx": "react",
    "experimentalDecorators": true,
    "sourceMap": true,
    "skipDefaultLibCheck": true,
    "lib": ["es2015", "dom"],
    "types": ["webpack-env"],
    "paths": {
      "history": ["./node_modules/@types/history/index"],
      "react": ["./node_modules/@types/react/index"]
    }
  }
}
```

Once you've got your boilerplate set up, your Phoenix project's folder structure should now look like this.

```
phoenix_react_playground/
├── assets/
│   ├── js/
│   │   ├── ...
│   │   └── app.tsx
│   ├── scss/
│   │   ├── ...
│   │   └── app.scss
│   └── static/
│       ├── images/
│       │   └── ...
│       ├── favicon.ico
│       └── robots.txt
├── config/
│   └── ...
├── lib/
│   └── ...
├── priv/
│   └── ...
├── test/
│   └── ...
├── .gitignore
├── mix.exs
├── package.json
├── postcss.config.js
├── README.md
├── tsconfig.json
└── webpack.config.js
```

### Setting up React

Let's now hook up React with Phoenix the right way. We need to make sure that Phoenix correctly runs the Webpack command as our watcher. To do so, modify `config/dev.exs` as follows:

```diff
-  watchers: []
+  watchers: [
+    {"node", [
+      "node_modules/webpack/bin/webpack.js",
+      "--watch-stdin",
+      "--colors"
+    ]}
+  ]
```

Now we can set up our base React boilerplate.

`assets/css/app.scss`

```scss
@import "~bootstrap/scss/bootstrap";

// Include extra SCSS down here.
```

`assets/js/app.tsx`

```typescript
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { routes } from './routes'

// This code starts up the React app when it runs in a browser. It sets up the routing
// configuration and injects the app into a DOM element.
ReactDOM.render(
  <BrowserRouter children={ routes } />,
  document.getElementById('react-app')
)
```

`assets/js/Root.tsx`

```typescript
import * as React from 'react'
import { Container } from 'reactstrap'

export default class Root extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        ...
        {this.props.children}
        ...
      </div>
    )
  }
}
```

`assets/js/routes.tsx`

```typescript
import * as React from 'react'
import { Route } from 'react-router-dom'
import Root from './Root'
import Home from './components/Home'

export const routes = (
  <Root>
    <Route exact path="/" component={ Home } />
  </Root>
)
```

`assets/js/components/Home.tsx`

```typescript
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Jumbotron, Button, Row, Col } from 'reactstrap'

export default class Home extends React.Component<{}, {}> {
  constructor(props) {
    super(props)
  }

  public render(): JSX.Element {
    return (
      <div>
        {/* Be sure to always wrap the content of a component in an enclosing
         element (e.g. `<div>`) */}
      </div>
    )
  }
}
```

That should do it.

Now, open our project's `router.ex` folder, and modify our routes in the `"/"` scope as follows.

```diff
-    get "/", PageController, :index
+    get "/*path", PageController, :index
```

Then, modify our template files so that it properly loads up our React code. We can remove the rest of the base layout template and just include the body and our script.

`templates/layout/app.html.eex`

```html
  <body>
    <%= render @view_module, @view_template, assigns %>
    <script src="<%= static_path(@conn, "/js/app.js") %>"></script>
  </body>
```

And now the Index page template. Be sure you set the `id` attribute to the one you set as the application entry point specified on `app.tsx`.

`templates/page/index.html.eex`

```html
<div id="react-app"></div>
```

## Sanity check

Now we're going to check if everything works. Run `mix deps.get` and `npm install` once again just to make sure, then run `mix ecto.setup` to build our database (if we have any set up). Then run `mix phx.server`, wait until the Webpack process is complete, then head over to `localhost:4000`.

If it works and you can see your webpage loading up, congratulations! Let's move on to the fancy part.

<figure>
  <img src="/images/blog/2017/a-phoenix-react-initial-setup-that-actually-works/chrome_2017-08-01_22-19-26.png" alt="chrome_2017-08-01_22-19-26.png">
</figure>

---

## Writing up a simple app with routing

Now that we have our basic Phoenix server running, let's create several examples of the nifty things you could do with React. The most common example that people make when demonstrating the capabilities of React is a Counter app.

First, we're going add the Counter route to our `routes.tsx` file.

```diff
  // ...
  import Root from './Root'
  import Home from './components/Home'
+ import Counter from './components/Counter'

  export const routes = (
    <Root>
      <Route exact path="/" component={ Home } />
+     <Route path="/counter" component={ Counter } />
    </Root>
  )
```

Then, we'll add the `Counter` component.

`assets/js/components/Counter.tsx`

```typescript
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

// Interface for the Counter component state
interface CounterState {
  currentCount: number
}

const initialState = { currentCount: 0 }

export default class Counter extends React.Component<{}, CounterState> {
  constructor() {
    super()
    // Set the initial state of the component in a constructor.
    this.state = initialState
  }

  public render(): JSX.Element {
    return (
      <div>
        <h1>Counter</h1>
        <p>The Counter is the simplest example of what you can do with a React component.</p>
        <p>Current count: <strong>{this.state.currentCount}</strong></p>

        {/* We apply an onClick event to these buttons to their corresponding functions */}
        <Button color="primary" onClick={() => { this.incrementCounter() }}>Increment counter</Button>{' '}
        <Button color="secondary" onClick={() => { this.decrementCounter() }}>Decrement counter</Button>{' '}
        <Button color="secondary" onClick={() => { this.resetCounter() }}>Reset counter</Button>
        <br /><br />
        <p><Link to="/">Back to home</Link></p>
      </div>
    )
  }

  private incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    })
  }

  private decrementCounter() {
    this.setState({
      currentCount: this.state.currentCount - 1
    })
  }

  private resetCounter() {
    this.setState({
      currentCount: 0
    })
  }
}
```

Now go to `localhost:4000/counter` and test your creation. If it works, we can continue to the next part.

<figure>
  <img src="/images/blog/2017/a-phoenix-react-initial-setup-that-actually-works/chrome_2017-08-01_22-20-00.png" alt="chrome_2017-08-01_22-20-00.png">
</figure>

## Fetching APIs - a painless example

As mentioned earlier, almost every React+Phoenix tutorial that I ever found on the internet only go as far as rendering a single React component, with no regard on how to set both React and Phoenix properly so that they could communicate with each other. Hopefully this will explain everything.

Before you start, please please *please* make sure that on `router.ex`, you have the `"/api"` scope declared *on top of* the `/*path` declaration. Seriously. I spent a whole week figuring this out and then only recently realised that I had the routing declarations the other way around.

`router.ex`

```ex
  # ...

  scope "/api", PhoenixReactPlaygroundWeb do
    pipe_through :api

    # ...your API endpoints
  end

  # ...

  scope "/", PhoenixReactPlaygroundWeb do
    pipe_through :browser # Use the default browser stack

    # This route declaration MUST be below everything else! Else, it will
    # override the rest of the routes, even the `/api` routes we've set above.
    get "/*path", PageController, :index
  end
```

When we have that all set, create a new context for our sample data.

```bash
$ mix phx.gen.json Example Language languages name:string proverb:string
```

`router.ex`

```diff
    scope "/api", PhoenixReactPlaygroundWeb do
      pipe_through :api

+     resources "/languages", LanguageController, except: [:new, :edit]
    end
```

You can also create a database seed to prepopulate the data beforehand. More information on how to do that is available on the [Phoenix docs](https://hexdocs.pm/phoenix/seeding_data.html).

Time for another sanity check! Run the Phoenix server and go to `localhost:4000/api/languages`. If everything works correctly, you should see either a blank or populated JSON (depending on whether you preloaded the database first or not).

<figure>
  <img src="/images/blog/2017/a-phoenix-react-initial-setup-that-actually-works/chrome_2017-08-01_22-19-43.png" alt="chrome_2017-08-01_22-19-43.png">
</figure>

If everything works well, we can now proceed to our component.

`routes.tsx`

```diff
  export const routes = (
    <Root>
      <Route exact path="/" component={ Home } />
      <Route path="/counter" component={ Counter } />
+     <Route path="/fetch-data" component={ FetchData } />
    </Root>
  )
```

`components/FetchData.tsx`

```js
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'reactstrap'

// The interface for our API response
interface ApiResponse {
  data: Language[]
}

// The interface for our Language model.
interface Language {
  id: number
  name: string
  proverb: string
}

interface FetchDataExampleState {
  languages: Language[]
  loading: boolean
}

export default class FetchData extends React.Component<{}, FetchDataExampleState> {
  constructor() {
    super()
    this.state = { languages: [], loading: true }

    // Get the data from our API.
    fetch('/api/languages')
      .then((response) => response.json() as Promise<ApiResponse>)
      .then((data) => {
        this.setState({ languages: data.data, loading: false })
      })
  }

  private static renderLanguagesTable(languages: Language[]) {
    return (
      <Table>
        <thead>
          <tr>
            <th>Language</th>
            <th>Example proverb</th>
          </tr>
        </thead>
        <tbody>
          {languages.map((language) =>
            <tr key={language.id}>
              <td>{language.name}</td>
              <td>{language.proverb}</td>
            </tr>
          )}
        </tbody>
      </Table>
    )
  }

  public render(): JSX.Element {
    const content = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderLanguagesTable(this.state.languages)

    return (
      <div>
        <h1>Fetch Data</h1>
        <p>This component demonstrates fetching data from the Phoenix API endpoint.</p>
        {content}
        <br /><br />
        <p><Link to="/">Back to home</Link></p>
      </div>
    )
  }
}
```

All good! Now go to `localhost:4000/fetch-data` and give it a try.

<figure>
  <img src="/images/blog/2017/a-phoenix-react-initial-setup-that-actually-works/chrome_2017-08-01_22-20-14.png" alt="chrome_2017-08-01_22-20-14.png">
</figure>

---

## The result

If you're still here, congratulations, your setup is complete! Run `mix phx.server` again and go through everything. If everything works, double congratulations! You can now use this knowledge to build your next Phoenix application, powered by React!

The end result of this guide is available [here](https://github.com/blvdgroup/phoenix-react-starter) for everyone to try out. To make it easier to understand, the commit logs outline the steps taken on this guide. Do remember that this guide doesn't cover server-side rendering yet, though I might include it in a future update post.

Good luck! Feel free to [tweet at me](https://twitter.com/resir014) if you have any questions.

---

*Thanks to [~selsky](https://tilde.town/~selsky) for their help on proofreading this post!*
