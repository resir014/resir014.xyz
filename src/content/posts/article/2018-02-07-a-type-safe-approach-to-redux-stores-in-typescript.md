---
category: article
layout: post
title: "A type-safe approach to Redux stores in TypeScript"
lead: "Redux and TypeScript are a match made in heaven. Here's how to make the most out of static types to make your Redux store as type-safe as possible."
redirect_from:
  - "/article/2018/02/07/a-type-safe-approach-to-redux-stores-in-typescript/"
---

I've been writing a lot of code in TypeScript lately. And alongside that, I've also been writing a lot of React code alongside [Redux](https://redux.js.org/). This lightweight state management library has been a time-saver for many React developers alike. And its TypeScript support is exceptional too, with an actively-maintained [type declaration file](https://github.com/reactjs/redux/blob/master/index.d.ts).

There are many guides on structuring the codebase for your Redux store lying around on the internet. I've mixed and matched a lot of these guides to come up with the structure that is easily typeable and fits perfectly with my personal workflow.

I've experimented a lot before I settled with this method, and admittedly this is still an ongoing experiment, so I'm open for suggestions. I decided to write this partly as a personal guide, so most of the things mentioned here are based on personal preference, but I also hope anyone else reading this will get something out of it.

*Note: This article is valid for `redux@^3.7.2`. I'll look into updating this to support `redux@^4.0.0` when it's released!*

## Directory structure

 I'll level with you, one of the hardest steps in getting started with working on React + Redux for me is figuring out how to structure your project. There's really no *de facto* way to do this, but it's still important to get this right so to not cause further distractions down the road. Here's how I normally do it.

### Use a dedicated `store/` directory

A lot of the guides/projects out there structure their store separately inside a root `actions` and `reducers` directory, e.g.

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

But, I personally find this to be distracting. You would end up scattering code which shares the same functionality throughout the entire project. I'd naturally want all code handling Redux stores to be in the same place.

So I decided to dedicate a `store/` directory for all my Redux actions/reducers. This method is mostly borrowed from [this guide](https://hackernoon.com/redux-step-by-step-a-simple-and-robust-workflow-for-real-life-apps-1fdf7df46092) made by Tal Kol of Wix, obviously with a few adjustments.

```
.
|-- components
|   |-- Footer.tsx
|   `-- Header.tsx
|-- containers
|   `-- ChatWindow.tsx
|-- store
|   |-- chat
|   |   |-- actions.ts
|   |   |-- reducer.ts
|   |   `-- types.ts
|   ├── layout
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
    |-- chat // Handles chat functionalities, e.g. fetching messages
    |   |-- actions.ts
    |   |-- reducer.ts
    |   `-- types.ts
    ├── layout // Handles layout settings, e.g. theme, small/large text, etc.
    |   |-- actions.ts
    |   |-- reducer.ts
    |   `-- types.ts
    `-- index.ts
```

### Combine reducers inside `store/index.ts`

Include an `index.ts` file at the root of the `store/` directory. We'll use this to declare the top-level application state object type, as well as exporting our combined reducers.

```ts
// ./src/store/index.ts

import { combineReducers, Dispatch, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import your state types and reducers here.
import { ChatState } from 'store/chat/types';
import { LayoutState } from 'store/layout/types';
import chatReducer from 'store/chat/reducer';
import layoutReducer from 'store/layout/reducer';

// The top-level state object
export interface ApplicationState {
  chat: ChatState;
  layout: LayoutState
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  router: routerReducer,
  chat: chatReducer,
  layout: layoutReducer,
});
```

### Separate presentational and container components

This is more of a React thing than a Redux thing, but let's go through it anyway.

[Dan Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) originally coined the term for "presentational" and "container" components. How I use this component structure is more or less the same. I use container components to connect to my Redux store, and presentational components handle most of the styling work.

```
.
├── components
|   |-- Footer.tsx
|   `-- Header.tsx
├── containers
|   |-- AddMessage.tsx
|   `-- ChatWindow.tsx
├── ...
`-- index.tsx
```

## Typing actions

Now that we have everything scaffolded, time to set up our stores in the most type-safe manner!

### Declare the state of each reducer

The first thing to do is type each of our reducers' state. Open the `types.ts` file of the `chat` store, and add our state object.

```ts
// ./src/store/chat/types.ts

// Our chat-level state object
export interface ChatState {
  username: string;
  connectedUsers: UserInfo[];
  messages: MessagePayload[];
}

// Feel free to include more types for good measure.

export interface UserInfo {
  name: string;
  id: number;
}

export interface TemplateItem {
  item: string;
  text: string;
}

export interface MessagePayload {
  timestamp: Date;
  user: string;
  message: {
    type: 'text' | 'template';
    content?: string;
    items?: TemplateItem[];
  };
}
```

### Declare action types as interfaces

To properly type our action creators, declare them as `interface`s. We'll also extend from the base `Action` interface for each of them.

```ts
// ./src/store/chat/types.ts

import { Action } from 'redux';

// Declare our action types using our interface. For a better debugging experience,
// I use the `@@context/ACTION_TYPE` convention for naming action types.

export interface UsersListUpdatedAction extends Action {
  type: '@@chat/USERS_LIST_UPDATED';
  payload: {
    users: UserInfo[];
  };
}

export interface MessageReceivedAction extends Action {
  type: '@@chat/MESSAGE_RECEIVED';
  payload: {
    timestamp: Date;
    user: string;
    message: MessagePayload;
  };
}

// Down here, we'll create a discriminated union type of all actions which will be used for our reducer.
export type ChatActions = UsersListUpdatedAction | MessageReceivedAction;
```

### `ActionCreator` is your friend

Time to write our action creators! First we'll import `ActionCreator` from Redux. We'll use this alongside the action types we've made earlier, as a generic.

```ts
// ./src/store/chat/actions.ts

import { ActionCreator } from 'redux';
import {
  UsersListUpdatedAction,
  UserInfo,
  MessageReceivedAction,
  MessagePayload,
} from './types';

// Type these action creators with `: ActionCreator<ActionTypeYouWantToPass>`.
// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly.

export const updateUsersList: ActionCreator<UsersListUpdatedAction> = (users: UserInfo[]) => ({
  type: '@@chat/USERS_LIST_UPDATED',
  payload: {
    users,
  },
});

export const messageReceived: ActionCreator<MessageReceivedAction> = (
  user: string,
  message: MessagePayload,
) => ({
  type: '@@chat/MESSAGE_RECEIVED',
  payload: {
    timestamp: new Date(),
    user,
    message,
  },
});
```

## Typing reducers

```ts
// ./src/store/chat/reducer.ts

import { Reducer } from 'redux';
import { ChatState, ChatActions } from './types';

// Type-safe initialState!
export const initialState: ChatState = {
  username: '',
  connectedUsers: [],
  messages: [],
};

// Unfortunately, typing of the `action` parameter seems to be broken at the moment.
// This should be fixed in Redux 4.x, but for now, just augment your types.

const reducer: Reducer<ChatState> = (state: ChatState = initialState, action) => {
  // We'll augment the action type on the switch case to make sure we have
  // all the cases handled.
  switch ((action as ChatActions).type) {
    case '@@chat/SET_USERNAME':
      return { ...state, username: action.username };
    case '@@chat/USERS_LIST_UPDATED':
      return { ...state, connectedUsers: action.users };
    case '@@chat/MESSAGE_RECEIVED':
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
};

export default reducer;
```

## Store configuration

Initialising the Redux store should be done inside a `configureStore()` function. Inside this function, we bootstrap the required middlewares and combine them with our reducers.

```ts
// ./stc/configureStore.ts

import { createStore, applyMiddleware, Store } from 'redux';

// react-router has its own Redux middleware, so we'll use this
import { routerMiddleware } from 'react-router-redux';
// We'll be using Redux Devtools. We can use the `composeWithDevTools()`
// directive so we can pass our middleware along with it
import { composeWithDevTools } from 'redux-devtools-extension';
// If you use react-router, don't forget to pass in your history type.
import { History } from 'history';

// Import the state interface and our combined reducers.
import { ApplicationState, reducers } from './store';

export default function configureStore(
  history: History,
  initialState: ApplicationState,
): Store<ApplicationState> {
  // create the composing function for our middlewares
  const composeEnhancers = composeWithDevTools({});

  // We'll create our store with the combined reducers and the initial Redux state that
  // we'll be passing from our entry point.
  return createStore<ApplicationState>(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(
      routerMiddleware(history),
    )),
  );
}
```

## Hooking up with React

Now let's see how well this whole structure hooks up to React.

### Connecting a React component to Redux

We're now going to connect our React component to Redux. Since we're mapping our state, we need to combine the state object of the store we're mapping to our component props as well.

```ts
// ./src/containers/ChatWindow.tsx

import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { ChatState } from 'store/chat/types';

// Standard component props
interface ChatWindowProps {
  // write your props here
}

// Create an intersection type of the component props and our state.
type AllProps = ChatWindowProps & ChatState;

// You can now safely use the mapped state as our component props!
const ChatWindow: React.SFC<AllProps> = ({ username, messages }) => (
  <Container>
    <div className={styles.root}>
      <ChatHeader username={username} />
      <ChatMessages>
        {messages && messages.map(message => (
          <ChatMessageItem
            key={`[${message.timestamp.toISOString()}]${message.user}`}
            payload={message}
            isCurrentUser={username === message.user}
          />
        ))}
      </ChatMessages>
      <div className={styles.chatNewMessage}><AddMessage /></div>
    </div>
  </Container>
);
```

The `react-redux` `connect()` function is what connects our React component to the redux store. Note that we're **only** going to use the `mapStateToProps()` call in this case.

```ts
// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = (state: ApplicationState) => state.chat;

// Now let's connect our component!
export default connect(mapStateToProps)(ChatWindow);
```

### Dispatching actions

I know what you're probably thinking. *You didn't call `mapDispatchToProps()`? How the hell do you dispatch your action?*

Easy, when we call `connect()` on a component, it will also pass the `dispatch` prop which you can use to call the action creators!

We can create a base interface for this. I usually put this inside `./src/store/index.ts`.

```ts
// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<S> {
  // Correct types for the `dispatch` prop passed by `react-redux`.
  // Additional type information is given through generics.
  dispatch: Dispatch<S>;
}
```

So let's go back to the `ChatWindowProps` interface we made earlier, and make it extend the interface we just made:

```ts
import { connect, Dispatch } from 'react-redux';
import { ConnectedReduxProps } from 'store';
import { ChatState } from 'store/chat/types';

// Extend the interface.
interface ChatWindowProps extends ConnectedReduxStore<ChatState> {}
```

---

If you follow these guides closely, you should have a Redux store with a strong enough typing! Of course, this is just one of the many ways to do it, so don't be afraid to experiment further with these guides. And of course, this is just a personal preference, your mileage may vary.
