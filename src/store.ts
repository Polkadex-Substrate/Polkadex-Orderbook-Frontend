import { applyMiddleware, createStore, Store } from "redux";
import createSagaMiddleware, { Task } from "redux-saga";
import { Context, createWrapper } from "next-redux-wrapper";

import { rangerSagas } from "./modules/public/ranger";

import { rootReducer, rootSaga, RootState } from "src/modules";

const sagaMiddleware = createSagaMiddleware();

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
  sagaRangerTask: Task;
}
export const store = createStore(rootReducer);

const makeStore = (context: Context) => {
  const initialStore = createStore(
    rootReducer,
    bindMiddleware([sagaMiddleware])
  );
  (initialStore as SagaStore).sagaRootTask = sagaMiddleware.run(rootSaga);
  (initialStore as SagaStore).sagaRangerTask = sagaMiddleware.run(rangerSagas);

  return initialStore;
};

export const wrapper = createWrapper(makeStore, {
  debug: true,
});
