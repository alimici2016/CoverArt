import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';


function* addMovie(action) {
    try {
        console.log(action.payload)
        yield axios.post('/api/fetchMovies', action.payload)
         yield put({ type: 'SET_MOVIES', payload: movies.data });
    } catch (error) {
        console.log('ERROR IN POST', error);
        yield put({ type: 'POST_ERROR' })
    }
}

function* fetchMovies() {
    try {
        const movies = yield axios.get('/api/fetchMovies');
        console.log('get all', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
};

function* fetchImpression (action) {
    const film = action.payload
    try{
        const movie = yield axios.get(`/api/movies/details?id=${film.id}`);
        console.log('get', movie.data);
        yield put({ type: 'SET_IMPRESSION', payload: movie.data[0] });
    }catch {
        console.log('get all error');
    }
}

function* addImpression (action) {
    try {
        console.log('this is payload', action.payload.movies_id)
        yield axios.post(`/api/movies/${action.payload.movies_id}` )
    } catch (error) {
        console.log('ERROR IN POST', error);
        yield put({ type: 'POST_ERROR' })
    }
}

function* addLike (action) {
    try{
        yield axios.put(`/api/movies/${action.payload.movies_id}`)
    }catch{
        yield put({ type: 'UPDATE_ERROR' })
    }
}

function* MovieSaga() {
    yield takeLatest('FETCH_MOVIES', fetchMovies);
    yield takeLatest('ADD_MOVIE', addMovie);
    yield takeLatest('FETCH_IMPRESSION', fetchImpression)
    yield takeLatest('ADD_IMPRESSION', addImpression);
    yield takeLatest('ADD_LIKE', addLike);
};

export default MovieSaga;