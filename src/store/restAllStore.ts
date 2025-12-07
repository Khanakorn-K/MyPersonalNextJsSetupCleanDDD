import { create as actualCreate, type StateCreator } from "zustand";

const storeResetFns = new Set<() => void>();

export const resetAllStores = () => {
  storeResetFns.forEach((resetFn) => {
    resetFn();
  });
};

const createStoreWithReset = <T>(stateCreator: StateCreator<T>) => {
  const store = actualCreate(stateCreator);
  const initialState = store.getState();

  storeResetFns.add(() => {
    store.setState(initialState, true);
  });

  return store;
};

export const create = (<T>(stateCreator?: StateCreator<T>) => {
  if (stateCreator) {
    return createStoreWithReset(stateCreator);
  }

  return (curriedStateCreator: StateCreator<T>) => {
    return createStoreWithReset(curriedStateCreator);
  };
}) as typeof actualCreate;
