import React from 'react';

import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { rootReducer } from 'store/reducer';

import { LocalStorageService } from 'core/services/localStorage';

import { WorkPage } from 'pages/WorkPage';
import { initialState } from 'store/store';

const localStorageService = new LocalStorageService();

const persistedState = localStorageService.loadState();

const store = createStore(rootReducer, persistedState ? persistedState : initialState, composeWithDevTools());

// при изменении состояния, оно сохраняется в localStorage
store.subscribe(() => {
  return localStorageService.saveStore(store.getState());
});

function App() {
  return (
    <Provider store={store}>
      <WorkPage />
    </Provider>
  );
}

export default App;
