import axios from "axios";
import { takeLatest, put } from 'redux-saga/effects';

function* deleteMovie(action) {
  try {
    console.log('delete', action.payload)
    yield axios.delete(`/api/fetchMovies/${action.payload.id}`)
    yield put({ type: 'FETCH_MOVIES' })
  } catch {
    yield put({ type: 'DELETE_ERROR' })
  }
};

function* deleteImpression(action) {
  console.log(action.payload.id)
  try {
    console.log(action.payload.id)
    yield axios.delete(`/api/movies/${action.payload.id}`)
    yield put({type:'FETCH_IMPRESSION', payload: action.payload.movies_id})
  } catch {
    yield put({ type: 'DELETE_ERROR', })
  }
};

// function* deleteApiMovie(action) {
//   console.log(action.payload)
//   try {
//       yield axios.delete('/api/search/details', action.payload)
//       console.log(response.data)
//       yield put({ type: 'FETCH_API_MOVIES' });
//   } catch (error) {
//       console.log('ERROR IN POST', error);
//       yield put({ type: 'POST_ERROR' })
//   }
// };

function* deleteSaga() {
  yield takeLatest('DELETE_MOVIE', deleteMovie)
  yield takeLatest('DELETE_IMPRESSION', deleteImpression)
  // yield takeLatest ('DELETE_API_MOVIE', deleteApiMovie)
};

export default deleteSaga;