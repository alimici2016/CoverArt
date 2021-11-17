import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Item({ film }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = () => {
        dispatch({ type: 'DELETE_MOVIE', payload: film })
    }

    const handleClick = () => {
        // console.log()
        dispatch({ type: 'FETCH_IMPRESSION', payload: film })
        history.push('/detail')
    }


    return (
        <>
            <p>{film.title}</p>
            <p>{film.image_url}</p>

            <button onClick={handleDelete}>DELETE </button>
            <button onClick={handleClick}>More</button>
        </>
    )
}

export default Item;