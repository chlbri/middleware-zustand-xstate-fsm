import middleware from './index';
import { renderHook, act } from '@testing-library/react-hooks/pure';
import { createMachine } from '@xstate/fsm';
import create from 'zustand';

// #region Configuration
const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } },
  },
});

function useHookTest() {
  const useStore = create(middleware(toggleMachine));
  const { result } = renderHook(() => useStore());
  return result;
}
// #endregion

describe('Acceptance', () => {
  it.concurrent('The function exists', () => {
    expect(middleware).toBeDefined();
  });

  it.concurrent('The function create all elements', () => {
    const result = useHookTest();
    expect(result.current.send).toBeFunction();
    expect(result.current.state).toBeDefined();
    expect(result.current.service).toBeDefined();
  });
});

describe('Working tests', () => {
  it.concurrent('inactive => TOGGLE => active', () => {
    const result = useHookTest();
    act(() => {
      result.current.send('TOGGLE');
    });
    expect(result.current.state.matches('active')).toBeTrue();
  });

  it.concurrent(
    'inactive => TOGGLE => active => TOGGLE => inactive',
    () => {
      const result = useHookTest();

      act(() => {
        result.current.send('TOGGLE');
      });
      expect(result.current.state.matches('active')).toBeTrue();

      act(() => {
        result.current.send('TOGGLE');
      });
      expect(result.current.state.matches('inactive')).toBeTrue();
    },
  );
  it.concurrent("It's unsubscribes properly", () => {
    const result = useHookTest();
    act(() => {
      result.current.send('TOGGLE');
    });
    expect(result.current.state.matches('active')).toBeTrue();
    act(() => {
      result.current.unsubscribe();
    });

    act(() => {
      result.current.send('TOGGLE');
    });
    expect(result.current.state.matches('inactive')).not.toBeTrue();
  });
});
