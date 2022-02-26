## Just a function.. middleware({machine})

<br/>
<br/>

# @bemedev/middleware-zustand-xstate-fsm

This middleware allows you to easily put your
[@xstate/fsm](https://www.npmjs.com/package/@xstate/fsm) state machines
into a global [zustand](https://www.npmjs.com/package/zustand) store.

<br/>

## Installation

```sh
npm install middleware-zustand-xstate-fsm zustand xstate
```

<br/>

## Usage

```tsx
import create from 'zustand';
import { createMachine } from '@xstate/fsm';
import middleware from '@bemedev/middleware-zustand-xstate-fsm';

// create your machine
const machine = createMachine({
  id: 'toggle',
  states: {
    // ...
  },
});

// create a hook using the @xstate/fsm middleware
const useStore = create(middleware(machine));

// use the store in your components
const App = () => {
  const { state, send, service } = useStore();

  return <div>{state.value}</div>;
};
```

<br/>

For tests, issues, forks, go to repo,
[go here](https://github.com/chlbri/middleware-zustand-xstate-fsm.git)

<br/>
<br/>

Inspired by
[@biowaffeln](https://www.npmjs.com/package/zustand-middleware-xstate)

## Happy coding 😊❤️😊👨‍💻❤️✅!!
