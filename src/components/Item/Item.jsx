import { useDispatch } from "react-redux";

function Item ({film}) {

    const dispatch = useDispatch();
    
    

    const handleDelete = () => {
        dispatch({ type: 'DELETE_MOVIE', payload: film })
    }

    // const deleteImpression = () => {
    //     dispatch({type: 'DELETE_IMPRESSION', payload: film.impression})
    // }
    
    return(
        <>
        <p>{film.title}</p>
        <p>{film.impressions}</p>
        {/* <p>{film.impression}</p> */}
        {/* <p>{JSON.stringify(film)}</p> */}

        <button onClick={handleDelete}>DELETE</button>
        <div>
                <button className="button" onClick={() => updateLike(film)}>Like</button>
                {film.like ? <p><span>{film.like}</span> people love this</p> : <p>no likes yet</p>}
            </div>
        </>
    )
}

export default Item;