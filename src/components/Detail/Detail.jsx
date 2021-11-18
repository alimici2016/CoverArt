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

        console.log(impressions)

        const handleChange = (event, property) => {
            setImpression({ ...impression, [property]: event.target.value })
        };
    
        const addImpression = (event) => {
            event.preventDefault();
            dispatch({ type: "ADD_IMPRESSION", payload: impression })
        };
    

    return (
        <>
        <tr>
        {impressions.map((impression => (
        <td key={impression.id}>
            {impression.date}
            {impression.title}
            {impression.director}
            {impression.impression}
            <button onClick={() => dispatch({type: 'DELETE_IMPRESSION', payload: impression.movies_id})}>DELETE Impression</button>
        </td>
        )))}
        </tr>
        
        
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