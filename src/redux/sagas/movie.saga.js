import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';


function* addMovie(action) {
    try {
        console.log(action.payload)
        yield axios.post('/api/fetchMovies', action.payload)
        yield put({ type: 'FETCH_MOVIES' });
    } catch (error) {
        console.log('ERROR IN POST', error);
        yield put({ type: 'POST_ERROR' })
    }
};

function* fetchMovies() {
    try {
        const movies = yield axios.get('/api/fetchMovies');
        console.log('get all', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
};

function* addImpression(action) {
    let film = action.payload
    try {
        console.log('this is payload', film.movies_id)
        yield axios.post('/api/movies/details', film)
        yield put({ type: 'FETCH_IMPRESSION', payload: film.movies_id })
    } catch (error) {
        console.log('ERROR IN POST', error);
        yield put({ type: 'POST_ERROR' })
    }
};

function* fetchImpression(action) {
    const film = action.payload
    console.log(film)
    try {
        const movie = yield axios.get(`/api/movies/details?id=${film}`);
        console.log('get', movie.data);
        yield put({ type: 'SET_IMPRESSION', payload: movie.data });
    } catch {
        console.log('get all error');
    }
};

function* addLike(action) {
    try {
        console.log(action.payload.id)
        yield axios.put(`/api/movies/${action.payload.id}`)
        yield put({ type: 'FETCH_MOVIES' });
    } catch {
        yield put({ type: 'UPDATE_ERROR' })
    }
};

function* updateImpression(action) {
    try {
        console.log(action.payload.id)
        yield axios.put(`api/fetchMovies/${action.payload}`)
    } catch {
        yield put({ type: 'UPDATE_ERROR' })
    }
};

function* wishList(action) {
    console.log(action.payload)
    try {
        yield axios.post('/api/search', action.payload)
        console.log(response.data)
        yield put({ type: 'SET_SINGLE_SEARCH_MOVIE', payload: response.data })
    } catch {
        yield put({ type: 'SEARCH_ERROR' })
    }
};

function* addMovieHome() {
    try {
        const response = yield axios.get('/api/search')
        console.log('api response', response.data)
        yield put({ type: 'SET_SINGLE_API_MOVIE', payload: response.data })
    } catch {
        yield put({ type: 'SEARCH_ERROR_API' })
    }
}

function* searchMovie(action) {
    try {
        let search = action.payload
        console.log(search)
        const response = yield axios.get(`/api/search/${search}`)
        console.log(response.data.results)
        yield put({ type: 'SET_SEARCH_MOVIES', payload: response.data.results })
    } catch {
        yield put({ type: 'SEARCH_ERROR' })
    }
};

function* postApiMovie(action) {
    console.log(action.payload)
    try {
        yield axios.post('/api/search/details', action.payload)
        console.log(response.data)
        yield put({ type: 'FETCH_MOVIES' });
    } catch (error) {
        console.log('ERROR IN POST', error);
        yield put({ type: 'POST_ERROR' })
    }
};

function* movieHistory() {
    try {
       const response = yield axios.get('/api/history')
        console.log('history', response.data)
        yield put({type:'SET_HISTORY_MOVIE', payload: response.data})
    } catch {
        console.log('get movie history error');
        yield put({ type: 'HISTORY_ERROR' })
    }
};

function* MovieSaga() {
    yield takeLatest('FETCH_MOVIES', fetchMovies);
    yield takeLatest('ADD_MOVIE', addMovie);
    yield takeLatest('FETCH_IMPRESSION', fetchImpression)
    yield takeLatest('ADD_IMPRESSION', addImpression);
    yield takeLatest('ADD_LIKE', addLike);
    yield takeLatest('UPDATE_IMPRESSION', updateImpression)
    yield takeLatest('SEARCH_MOVIES', searchMovie)
    yield takeLatest('SET_WISHLIST', wishList)
    yield takeLatest('FETCH_API_MOVIE', addMovieHome)
    yield takeLatest('ADD_API_MOVIE_TO_DB', postApiMovie)
    yield takeLatest('FETCH_HISTORY', movieHistory)
};

export default MovieSaga;