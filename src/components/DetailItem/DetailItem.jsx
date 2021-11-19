import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

function DetailItem({ impression }) {


    const [newImpression, setNewImpression] = useState({
        date: '',
        impression: ''
    });

    const dispatch = useDispatch();


    const addImpression = (event) => {
        event.preventDefault();
        dispatch({ type: "ADD_IMPRESSION", payload:  impression.movies_id, newImpression })
    };

    const handleChange = (event, property) => {
        setNewImpression({ ...newImpression, [property]: event.target.value })
    };

    console.log(impressions.movie_id)
    console.log(impression.impression)

    return (
        <>

            <div>
                <form onSubmit={addImpression}>
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
            <div>
                <td>
                    {impression.date}
                    {impression.title}
                    {impression.director}
                    {impression.impression}
                    <button onClick={() => dispatch({ type: 'DELETE_IMPRESSION', payload: impression.impression})}>DELETE Impression</button>
                    {/* <button onClick={() => dispatch({ type: 'ADD_IMPRESSION', payload: impression.movies_id, newImpression })}> Impression</button> */}
                </td>
            </div>
        </>
    )
}
export default DetailItem;