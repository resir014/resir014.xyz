---
category: article
layout: post
date: '2018-07-06T20:36:00+07:00'
title: 'Redux 4 + TypeScript: A type-safe approach'
lead: 'An updated version of my type-safe guide to Redux, now compatible with Redux 4 + TypeScript 3.'
syndication:
  - name: dev.to
    url: https://dev.to/resir014/redux-4--typescript-29-a-type-safe-approach-2lf4
  - name: Medium
    url: https://medium.com/@resir014/redux-4-typescript-2-9-a-type-safe-approach-7f073917b803
---

Even when the JavaScript community is slowly growing mixed opinions about it, I couldn't help but continue using [Redux](https://redux.js.org/). Its patterns on immutable state management has become all too familiar to us, and is especially useful when building large apps. Its TypeScript support is exceptional too, with much-needed improvements to its type declarations arriving in Redux 4.

[I wrote a guide on it](/posts/2018/02/07/a-type-safe-approach-to-redux-stores-in-typescript/) a few months ago, and it has received some amount of attention. The feedback has helped me improve beyond what I normally would've done, and I couldn't thank you enough for that.

In spirit of that, I finally took the time to update said guide based on the feedbacks I've received, making everything up to date with the latest version of React, Redux, and TypeScript, as well as introducing some neat new tricks.

Note that the following guide is tested on:

- `react@^16.4.0`
- `redux@^4.0.0`
- `react-redux@^6.0.0`
- `typescript@^3.3.0`

## What we're building

To demonstrate this post, we're going to build a simple app. We're going to create a website which pulls data from the [OpenDota API](https://docs.opendota.com/), and display information about certain heroes and professional teams. This will also demonstrate how to structure your stores for each feature/module in a Redux-enabled app.

## TL;DR

If you want to jump straight to the examples, I've also published a sample project in GitHub, based on the feedback from my previous post. Click [here](https://github.com/resir014/react-redux-typescript-example) to go there.

---

## Updates

- **2018-12-08:** Updated `Dispatch` to be imported from `redux` instead of `react-redux`. The guide is also now tested to work on TypeScript `^3.0.0`. (Thanks [cancerberoSgx](https://github.com/resir014/react-redux-typescript-example/pull/2)!)
- **2019-01-05:** Changed `const enum`s to `enum`s due to Babel not supporting it. (Thanks [Kyle Gillen](https://github.com/nextriot)!)
- **2019-03-09:** The latest version of `react-redux` broke the typings for the"children-props-as-redux-container" approach I mentioned in the previous version of this post. I would suggest against using this pattern nowadays, but if you still want to use it, I've upgraded the corresponding section in this article to have the same pattern, making use of the newly-introduced `ReactReduxContext`.
- **2019-09-22:** The above pattern breaks on a Create React App setup. The entire `LayoutContainer` is now rewritten using built-in `react-redux` hooks.

---

## Directory structure

I'll level with you, one of the hardest steps in getting started with working on React + Redux for me is figuring out how to structure your project. There's really no _de facto_ way to do this, but it's still important to get this right so to not cause further distractions down the road. Here's how I normally do it.

### Use a dedicated `store/` directory

A lot of the guides/projects out there structure their store separately inside a root `actions/` and `reducers/` directory, to mimic the patterns in Redux architecture.

_(Note that the following directory trees assume that your code is placed inside a `src/` directory.)_

```
.
|-- actions
|   |-- chat.ts
|   |-- index.ts
|   `-- layout.ts
|-- components
|   |-- Footer.tsx
|   `-- Header.tsx
|-- containers
|   `-- ChatWindow.tsx
|-- reducers
|   |-- chat.ts
|   |-- index.ts
|   `-- layout.ts
|-- ...
|-- index.tsx
`-- types.d.ts
```

However, I personally find this to be distracting. When your codebase grows larger, you would end up scattering code which shares the same context across a great length of the directory tree, which wouldn't be intuitive for newcomers who wanted to take a quick glance at your code. Therefore, roughly following the Redux pattern in this case is less advantageous in terms of code readability.

So I decided to dedicate a `store/` directory for all my Redux actions/reducers. This method is mostly borrowed from [this guide](https://hackernoon.com/redux-step-by-step-a-simple-and-robust-workflow-for-real-life-apps-1fdf7df46092) made by Tal Kol of Wix, with a few adjustments.

```
.
|-- components
|   |-- Footer.tsx
|   `-- Header.tsx
|-- containers
|   `-- LayoutContainer.tsx
|-- pages
|   |-- index.tsx
|   |-- matches.tsx
|   `-- heroes.tsx
|-- store
|   |-- heroes
|   |   |-- actions.ts
|   |   |-- reducer.ts
|   |   `-- types.ts
|   |-- layout
|   |   |-- actions.ts
|   |   |-- reducer.ts
|   |   `-- types.ts
|   `-- index.ts
|-- ...
|-- index.tsx
`-- types.d.ts
```

### Group stores by context

As an extension to the guides above, the state tree should be structured **by context**.

```
.
`- store
    |-- heroes // Handles application states inside the `/heroes` page.
    |   |-- actions.ts
    |   |-- reducer.ts
    |   `-- types.ts
    ├── layout // Handles global layout settings, e.g. theme, small/large text.
    |   |-- actions.ts
    |   |-- reducer.ts
    |   `-- types.ts
    `-- index.ts
```

### Combine reducers inside `store/index.ts`

Include an `index.ts` file at the root of the `store/` directory. We'll use this to declare the top-level application state object type, as well as exporting our combined reducers.

```tsx
// ./src/store/index.ts

import { combineReducers, Dispatch, Reducer, Action, AnyAction } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { LayoutState, layoutReducer } from './layout'

// The top-level state object.
//
// `connected-react-router` already injects the router state typings for us,
// so we can ignore them here.
export interface ApplicationState {
  layout: LayoutState
  router: RouterState
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const createRootReducer = (history: History) =>
  combineReducers({
    layout: layoutReducer,
    router: connectRouter(history)
  })
```

## Store types

Include a `types.ts` file inside each store module. This is where we hold our state types, as well as any other types related to this Redux store module.

```tsx
// ./src/store/heroes/types.ts

// Response object for GET /heroes
// https://docs.opendota.com/#tag/heroes%2Fpaths%2F~1heroes%2Fget
export interface Hero {
  id: number
  name: string
  localized_name: string
  primary_attr: string
  attack_type: string
  roles: string[]
  legs: number
}

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>

// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum HeroesActionTypes {
  FETCH_REQUEST = '@@heroes/FETCH_REQUEST',
  FETCH_SUCCESS = '@@heroes/FETCH_SUCCESS',
  FETCH_ERROR = '@@heroes/FETCH_ERROR',
  SELECTED = '@@heroes/SELECTED'
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface HeroesState {
  readonly loading: boolean
  readonly data: Hero[]
  readonly errors?: string
}
```

## Typing actions

Now that we have everything scaffolded, time to set up our actions!

### Writing typesafe actions with `typesafe-actions`

[Piotrek Witek](https://github.com/piotrwitek) created the [`typesafe-actions`](https://github.com/piotrwitek/typesafe-actions) library, which provides useful helper functions to create type-safe Redux actions. We'll use this to write our Redux actions.

```tsx
// ./src/store/heroes/actions.ts

import { action } from 'typesafe-actions'
import { HeroesActionTypes, Hero } from './types'

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const fetchRequest = () => action(HeroesActionTypes.FETCH_REQUEST)

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const fetchSuccess = (data: Hero[]) => action(HeroesActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(HeroesActionTypes.FETCH_ERROR, message)
```

## Typing reducers

Typing reducers is a lot more straightforward with Redux 4.

```tsx
// ./src/store/heroes/reducer.ts

import { Reducer } from 'redux'
import { HeroesState, HeroesActionTypes } from './types'

// Type-safe initialState!
const initialState: HeroesState = {
  data: [],
  errors: undefined,
  loading: false
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<HeroesState> = (state = initialState, action) => {
  switch (action.type) {
    case HeroesActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case HeroesActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case HeroesActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as heroesReducer }
```

## Handling actions asynchronously with `redux-saga`

If your action dispatcher involves making numerous asynchronous tasks, it's better to include a library which handles side-effects on Redux. The two commonly-used libraries for this are [redux-thunk](https://github.com/reduxjs/redux-thunk) and [redux-saga](https://redux-saga.js.org/). We're going to use `redux-saga` due to its cleaner API, which makes use of [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).

```tsx
// ./src/store/heroes/sagas.ts

import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { HeroesActionTypes } from './types'
import { fetchError, fetchSuccess } from './actions'
import callApi from '../../utils/callApi'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || ''

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*

function* handleFetch() {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(callApi, 'get', API_ENDPOINT, '/heroes')

    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(fetchSuccess(res))
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
  yield takeEvery(HeroesActionTypes.FETCH_REQUEST, handleFetch)
}

// Export our root saga.
// We can also use `fork()` here to split our saga into multiple watchers.
export function* heroesSaga() {
  yield all([fork(watchFetchRequest)])
}
```

To include them in our root store, we add a `rootSaga()` generator function which collects all of our store sagas.

```tsx
// ./src/store/index.ts

import { all, fork } from 'redux-saga/effects'

// We `fork()` these tasks so they execute in the background.
export function* rootSaga() {
  yield all([
    fork(heroesSaga),
    fork(teamsSaga)
    // `fork()` any other store sagas down here...
  ])
}
```

## Initialising Redux store

Initialising the Redux store should be done inside a `configureStore()` function. Inside this function, we bootstrap the required middlewares (including `redux-saga`) and combine them with our reducers.

```tsx
// ./src/configureStore.ts

import { Store, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
// `react-router-redux` is deprecated, so we use `connected-react-router`.
// This provides a Redux middleware which connects to our `react-router` instance.
import { connectRouter, routerMiddleware } from 'connected-react-router'
// We'll be using Redux Devtools. We can use the `composeWithDevTools()`
// directive so we can pass our middleware along with it
import { composeWithDevTools } from 'redux-devtools-extension'
// If you use react-router, don't forget to pass in your history type.
import { History } from 'history'

// Import the state interface and our combined reducers/sagas.
import { ApplicationState, createRootReducer, rootSaga } from './store'

export default function configureStore(history: History, initialState: ApplicationState): Store<ApplicationState> {
  // create the composing function for our middlewares
  const composeEnhancers = composeWithDevTools({})
  // create the redux-saga middleware
  const sagaMiddleware = createSagaMiddleware()

  // We'll create our store with the combined reducers/sagas, and the initial Redux state that
  // we'll be passing from our entry point.
  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  )

  // Don't forget to run the root saga, and return the store object.
  sagaMiddleware.run(rootSaga)
  return store
}
```

---

## Connecting with React

Now let's hook everything up with React.

### Container components

**Update:** The latest version of `react-redux` broke the typings for the"children-props-as-redux-container" approach I mentioned in the previous version of this post. I would suggest against using this pattern nowadays, but if you still want to use it, here's a way to upgrade, using the brand-new `useDispatch` and `useSelector` hooks:

```tsx
// ./src/containers/LayoutContainer

import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ApplicationState } from '../store'
import { ThemeColors } from '../store/layout'
import * as layoutActions from '../store/layout/actions'

// Redux-specific props.
interface LayoutContainerProps {
  theme: ThemeColors
  setTheme: (theme: ThemeColors) => void
}

// Wrapper props for render/children callback.
interface LayoutContainerRenderProps {
  render?: (props: LayoutContainerProps) => React.ReactElement
  children?: (props: LayoutContainerProps) => React.ReactElement
}

// ...

const LayoutContainer: React.FC<LayoutContainerRenderProps> = ({ render, children }) => {
  // We can use Hooks to call in our selector/dispatch functions.
  const { theme } = useSelector((state: ApplicationState) => state.layout)
  const dispatch = useDispatch()

  // Create the `setTheme` handler. We use the `dispatch` we got from `useDispatch()` to create said selector.
  const setTheme = (color: ThemeColors) => dispatch(layoutActions.setTheme(color))

  // Create a render/children props wrapper with the above variables set as a callback.
  if (render) {
    return render({ theme, setTheme })
  }

  if (children) {
    return children({ theme, setTheme })
  }

  return null
}

export default LayoutContainer
```

This way, we can use the Redux store linking from any component!

```tsx
// ./src/components/layouts/Header.tsx

import * as React from 'react'
import LayoutContainer from '../../containers/LayoutContainer'

const Header: React.FC = ({ children }) => (
  <LayoutContainer>
    {({ theme, setTheme }) => (
      <React.Fragment>
        <CurrentTheme>Current theme: {theme}</CurrentTheme>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Switch theme</button>
      </React.Fragment>
    )}
  </LayoutContainer>
)

export default Header
```

### Page components

When connecting pure React components, it's a good idea to connect them at the page level. As a reminder, when mapping states/action dispatcher to a component, we need to combine the state/action dispatcher prop types of the store we're mapping to our component prop types as well.

```tsx
// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  data: Hero[]
  errors: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof heroesActions.fetchRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || ''

class HeroesIndexPage extends React.Component<AllProps> {
  public componentDidMount() {
    this.props.fetchRequest()
  }

  public render() {
    const { loading } = this.props

    return (
      <Page>
        <Container>
          <TableWrapper>
            {loading && <LoadingOverlay />}
            {this.renderData()}
          </TableWrapper>
        </Container>
      </Page>
    )
  }

  private renderData() {
    const { loading, data } = this.props

    return (
      <HeroesTable columns={['Name', 'Legs']} widths={['auto', '120px']}>
        {loading && data.length === 0 && (
          <HeroLoading>
            <td colSpan={2}>Loading...</td>
          </HeroLoading>
        )}
        {data.map((hero) => (
          <tr key={hero.id}>
            <HeroDetail>
              <HeroIcon src={API_ENDPOINT + hero.icon} alt={hero.name} />
              <HeroName>
                <Link to={`/heroes/${hero.name}`}>{hero.localized_name}</Link>
              </HeroName>
            </HeroDetail>
            <td>{hero.legs}</td>
          </tr>
        ))}
      </HeroesTable>
    )
  }
}
```

### Using `react-redux`'s `connect()`

The `react-redux` `connect()` function is what connects our React component to the redux store.

```tsx
// ./src/pages/heroes.tsx

import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { ApplicationState } from '../store'

// ...

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ heroes }: ApplicationState) => ({
  loading: heroes.loading,
  errors: heroes.errors,
  data: heroes.data
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: () => dispatch(heroesActions.fetchRequest())
})

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(mapStateToProps, mapDispatchToProps)(HeroesPage)
```

## Additional helper type

We can also add a helper type for our connected Redux components.

```tsx
// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
  // Correct types for the `dispatch` prop passed by `react-redux`.
  // Additional type information is given through generics.
  dispatch: Dispatch<A>
}
```

So now on any Redux-connected component, we can extend its props interface with the interface above

```tsx
// Extend the interface (for example).
interface ComponentProps extends ConnectedReduxStore {}

class Component extends React.Component<ComponentProps> {
  public componentDidMount() {
    // We can use the extended interface above as follows.
    this.props.dispatch(layoutActions.fetchRequest())
  }
}
```

---

## Sample code

Hope you've found this guide useful! Based on your feedback as well, I've also published a sample project following the guides above on GitHub. Click [here](https://github.com/resir014/react-redux-typescript-example) to go there.

## References

To learn more about React, Redux, and TypeScript, the following guides are a good read:

- [React + TypeScript cheatsheet](https://github.com/sw-yx/react-typescript-cheatsheet) by [@sw-yx](https://github.com/sw-yx)
- [React & Redux in TypeScript](https://github.com/piotrwitek/react-redux-typescript-guide) by [@piotrwitek](https://github.com/piotrwitek)
