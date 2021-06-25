import React from 'react';

import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { rootReducer } from 'store/reducer';

import { WorkPage } from 'pages/WorkPage';

const store = createStore(
  rootReducer,
  composeWithDevTools()
);

function App() {
  return (
    <Provider store={store}>
      <WorkPage />
    </Provider>
  );
}

export default App;
