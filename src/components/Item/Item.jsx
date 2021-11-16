import { useDispatch } from "react-redux";

function Item ({film}) {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch({ type: 'DELETE_MOVIE', payload: film })
    }


    return(
        <>
        <p>{film.title}</p>
        <button onClick={handleDelete}>DELETE</button>
        <div>
                <button className="button" onClick={() => updateLike(film)}>Like</button>
                {film.like ? <p><span>{film.like}</span> people love this</p> : <p></p>}
            </div>
        </>
    )
}

export default Item;