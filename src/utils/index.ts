import {useCallback, useReducer} from 'react';

export async function benchmark(
  label: string,
  fn: () => unknown | Promise<unknown>,
  callback: (text: string) => void,
): Promise<number> {
  const iterations = 1000;
  try {
    console.log(`Starting Benchmark "${label}"...`);
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
      const r = fn();
      if (r instanceof Promise) {
        await r;
      }
    }
    const end = performance.now();
    const diff = end - start;
    console.log(`Finished Benchmark "${label}"! Took ${diff.toFixed(4)}ms!`);
    callback(`${label}: ${diff.toFixed(4)}ms!`);
    return diff;
  } catch (e) {
    console.error(`Failed Benchmark "${label}"!`, e);
    return 0;
  }
}

export async function waitForGC(): Promise<void> {
  return new Promise(r => setTimeout(r, 500));
}

export const useState = <T>(initialState = {} as T) => {
  const reducer = useCallback(
    (state: T, payload: {[key in keyof T]?: T[key]}) => ({
      ...state,
      ...payload,
    }),
    [],
  );

  return useReducer(reducer, initialState);
};
