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
        </>
    )
}

export default Item;