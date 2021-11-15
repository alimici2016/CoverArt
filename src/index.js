import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { takeEvery, put } from 'redux-saga/effects';

import store from './redux/store';

import App from './components/App/App';

function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
}

function* fetchAllMovies() {
  try {
    const movies = yield axios.get('/api/movie');
    console.log('get all:', movies.data);
    yield put({ type: 'SET_MOVIES', payload: movies.data });

  } catch {
    console.log('get all error');
  }
};

const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({
    movies,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root'),
);
