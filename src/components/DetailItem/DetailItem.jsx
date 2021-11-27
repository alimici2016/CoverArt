import { useState } from 'react';
import { useDispatch } from "react-redux";
import { TextField } from '@mui/material/TextField';

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

    // console.log(impressions.movie_id)
    // console.log(impression.impression)

    return (
        <>

            <div>
                <form onSubmit={addImpression}>
                    <TextField 
                        multiline={true}
                        rows={10}
                        onChange={(event) => handleChange(event, 'date')}
                        type="date"
                        value={newImpression.date}
                    />
                    <TextField onChange={(event) => handleChange(event, 'impression')}
                        multiline={true}
                        rows={10}
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
                </td>
            </div>
        </>
    )
}
export default DetailItem;