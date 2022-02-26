import type { EventObject, StateMachine, Typestate } from '@xstate/fsm';
import { interpret } from '@xstate/fsm';
import type { SetState } from 'zustand';

type Machine<
  TC extends object,
  TE extends EventObject,
  TS extends Typestate<TC>,
> = StateMachine.Machine<TC, TE, TS>;

type Service<
  TC extends object,
  TE extends EventObject,
  TS extends Typestate<TC>,
> = StateMachine.Service<TC, TE, TS>;

export type Store<
  TC extends object,
  TE extends EventObject,
  TS extends Typestate<TC>,
> = {
  state: Service<TC, TE, TS>['state'];
  send: Service<TC, TE, TS>['send'];
  service: Service<TC, TE, TS>;
  unsubscribe: () => void;
};

export default function middleware<
  TC extends object,
  TE extends EventObject,
  TS extends Typestate<TC>,
>(machine: Machine<TC, TE, TS>) {
  return (set: SetState<Store<TC, TE, TS>>): Store<TC, TE, TS> => {
    const service = interpret(machine).start();
    const { unsubscribe } = service.subscribe(state => {
      const initialStateChanged = state.changed === undefined;
      if (state.changed || initialStateChanged) {
        set({ state });
      }
    });

    return {
      state: service.state,
      send: service.send,
      service,
      unsubscribe,
    } as Store<TC, TE, TS>;
  };
}
