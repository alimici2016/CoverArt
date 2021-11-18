import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

function Detail() {

    const [newImpression, setNewImpression] = useState({
        date:'',
        impression:''
    });

    const dispatch = useDispatch();

    const impressions = useSelector(store => store.SingleMovieImpression)

        const handleChange = (event, property) => {
            setNewImpression({ ...newImpression, [property]: event.target.value })
        };
    
        const addNewImpression = (event) => {
            event.preventDefault();
            dispatch({ type: "ADD_IMPRESSION", payload: newImpression })
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
            {/* <button onClick={() => dispatch({type: 'DELETE_IMPRESSION', payload: impression.movies_id})}>DELETE Impression</button> */}
            <button onClick={() => dispatch({type: 'ADD_IMPRESSION', payload: impression.movies_id, newImpression})}>New Impression</button>
        </td>
        )))}
        </tr>
        
            <div>
            <form onSubmit={addNewImpression}>
            <input onChange={(event) => handleChange(event, 'date')}
                type="date"
                value={newImpression.date}
            />
            <input onChange={(event) => handleChange(event, 'impression')}
                placeholder='impression'
                type="text"
                value={newImpression.impression}
            />
            <button type="submit">Save</button>
            </form>
            </div>
        </>
    )
}
export default Detail;