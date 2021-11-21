import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import {useParams} from 'react-router-dom';

function Detail() {

    const [newImpression, setNewImpression] = useState({
        date: '',
        impression: ''
    });

    const {movies_id} = useParams();

    const dispatch = useDispatch();

    const impressions = useSelector(store => store.SingleMovieImpression)

    const handleChange = (event, property) => {
        setNewImpression({ ...newImpression, [property]: event.target.value })
    };

    const addNewImpression = (event) => {
        event.preventDefault();
        dispatch({ type: "ADD_IMPRESSION", payload: {...newImpression, movies_id}})
    };

    return (
        <>
        <div>
        {impressions.map((impression => (
            <table border='1px' border-radius='10px' padding = '15px'>
                <thead >
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Director</th>
                        <th>Impressions</th>
                    </tr>
                   
                </thead>
                <tbody>
                    <tr key={impression.id}>
                        <td>{impression.date}</td>
                        <td>{impression.title}</td>
                        <td>{impression.director}</td>
                        <td>{impression.impressions}</td>
                        <button onClick={() => dispatch({ type: 'DELETE_IMPRESSION', payload: impression })}>DELETE Impression</button>
                    </tr>      
                </tbody>
            </table>
             )))}
            </div>
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