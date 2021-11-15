import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAllMovies() {
  try {
    const movies = yield axios.get('/api/movies');
    console.log('get all:', movies.data);
    yield put({ type: 'SET_MOVIES', payload: movies.data });

  } catch {
    console.log('get all error');
  }
};

function* MovieSaga() {
  yield takeLatest('FETCH_MOVIES', fetchAllMovies);
};

export default MovieSaga;