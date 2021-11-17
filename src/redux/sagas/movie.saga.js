import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';


function* addMovie(action) {
    try {
        console.log(action.payload)
        yield axios.post('/api/fetchMovies', action.payload)
    } catch (error) {
        console.log('ERROR IN POST', error);
        yield put({ type: 'POST_ERROR' })
    }
}

function* fetchAllMovies() {
    try {
        const movies = yield axios.get('/api/fetchMovies');
        console.log('get all', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
};

function* MovieSaga() {
    yield takeLatest('FETCH_MOVIES', fetchAllMovies);
    yield takeLatest('ADD_MOVIE', addMovie);
};

export default MovieSaga;