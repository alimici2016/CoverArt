import axios from "axios";
import { takeLatest, put } from 'redux-saga/effects';

function* deleteMovie (action) {
    try{
      console.log('delete', action.payload)
      yield axios.delete(`/api/fetchMovies/${action.payload.id}`)
      yield put({type:'FETCH_MOVIES'})
    }catch{
        yield put({type:'DELETE_ERROR'})
    }
};

function* deleteImpression (action) {
    try{
      console.log(action.payload)
      yield axios.delete(`/api/movies/${action.payload}`)
      yield put({type:'SET_IMPRESSIONS'})
    }catch{
        yield put ({type: 'DELETE_ERROR'})
    }
};

function* deleteSaga () {
   yield takeLatest('DELETE_MOVIE', deleteMovie)
   yield takeLatest('DELETE_IMPRESSION', deleteImpression)
}

export default deleteSaga;