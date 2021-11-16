import axios from "axios";
import { takeLatest } from 'redux-saga/effects';

function* deleteMovie (action) {
    try{
      console.log(action.payload)
      yield axios.delete(`/api/movies/${action.payload.id}`)
    }catch{
        yield put ({type: 'DELETE_ERROR'})
    }
};

function* deleteSaga () {
   yield takeLatest('DELETE_MOVIE', deleteMovie)
}

export default deleteSaga;