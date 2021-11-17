import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

function Detail() {

    const dispatch = useDispatch();

    const movie = useSelector(store => store.SingleMovieReducer)
    const impressions = useSelector(store => store.SingleMovieImpression)


        // const deleteImpression = () => {
        //     dispatch({type: 'DELETE_IMPRESSION', payload: impressions})
        // }

    return (
        <>
            <p>{JSON.stringify(impressions)}</p>
            <button onClick={deleteImpression}>DELETE Impression</button>
            {/* <div>
                <button className="button" onClick={() => updateLike(film)}>Like</button>
                {film.like ? <p><span>{film.like}</span> people love this</p> : <p>no likes yet</p>}
            </div> */}
        </>
    )
}
export default Detail;