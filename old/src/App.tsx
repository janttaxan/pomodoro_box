import React from 'react';

import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { rootReducer } from 'store/reducer';
import { initialState } from 'store/store';

import { LocalStorageService } from 'core/services/LocalStorageService';

import { Layout } from 'components/Layout';
import { WorkPage } from 'pages/WorkPage';

const localStorageService = new LocalStorageService();

const persistedState = localStorageService.loadState();

const store = createStore(
  rootReducer,
  persistedState ? persistedState : initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

// при изменении состояния, оно сохраняется в localStorage
store.subscribe(() => {
  return localStorageService.saveStore(store.getState());
});

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <WorkPage />
      </Layout>
    </Provider>
  );
}

export default App;
