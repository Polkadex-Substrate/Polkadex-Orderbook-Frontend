import { applyMiddleware, createStore, Store } from "redux";
import createSagaMiddleware, { Task } from "redux-saga";
import { Context, createWrapper } from "next-redux-wrapper";

import { rootReducer, rootSaga, RootState } from "@polkadex/orderbook-modules";

// Redux DevTools Bind
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};
export interface SagaStore extends Store<RootState> {
  sagaRootTask: Task;
}
export const store = createStore(rootReducer);

const makeStore = (context: Context) => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();

  // 2: Add an extra parameter for applying middleware:
  const initialStore = createStore(rootReducer, bindMiddleware([sagaMiddleware]));

  // 3: Run your sagas on server
  (initialStore as SagaStore).sagaRootTask = sagaMiddleware.run(rootSaga);

  // 4: now return the store:
  return initialStore;
};

export const wrapper = createWrapper(makeStore, {
  debug: false,
});
