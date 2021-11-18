import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

function Detail() {

    const [impression, setImpression] = useState({
        date:'',
        impression:''
    });

    const dispatch = useDispatch();

    const impressions = useSelector(store => store.SingleMovieImpression)

        const deleteImpression = () => {
            dispatch({type: 'DELETE_IMPRESSION', payload: impressions})
        }

        const handleChange = (event, property) => {
            setImpression({ ...impression, [property]: event.target.value })
        };
    
        const addImpression = (event) => {
            event.preventDefault();
            dispatch({ type: "ADD_IMPRESSION", payload: impression })
        };
    

    return (
        <>
            <p>{JSON.stringify(impressions)}</p>
            <button onClick={deleteImpression}>DELETE Impression</button>

            <div>
            <form onSubmit={addImpression}>
            <input onChange={(event) => handleChange(event, 'date')}
                type="date"
                value={impression.date}
            />
            <input onChange={(event) => handleChange(event, 'impression')}
                placeholder='impression'
                type="text"
                value={impression.impression}
            />
            <button type="submit">Save</button>
            </form>
            </div>
        </>
    )
}
export default Detail;