import axios from "axios";
import { takeLatest, put } from 'redux-saga/effects';

function* deleteMovie (action) {
    try{
      console.log('delete', action.payload)
      yield axios.delete(`/api/movies/${action.payload.id}`)
      yield put({type:'FETCH_MOVIES'})
    }catch{
        yield put({type:'DELETE_ERROR'})
    }
};

// function* deleteImpression (action) {
//     try{
//       console.log(action.payload.movies_id)
//       yield axios.delete(`/api/movies/${action.payload.movies_id}`)
//     }catch{
//         yield put ({type: 'DELETE_ERROR'})
//     }
// };

function* deleteSaga () {
   yield takeLatest('DELETE_MOVIE', deleteMovie)
   yield takeLatest('DELETE_IMPRESSION', deleteImpression)
}

export default deleteSaga;