import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

function Detail() {

    const [newImpression, setNewImpression] = useState({
        date: '',
        impression: ''
    });

    const dispatch = useDispatch();

    const impressions = useSelector(store => store.SingleMovieImpression)

    let selectedMovieId = impressions.movies_id

    const handleChange = (event, property) => {
        setNewImpression({ ...newImpression, [property]: event.target.value })
    };

    const addNewImpression = (event) => {
        event.preventDefault();
        dispatch({ type: "ADD_IMPRESSION", payload: {...newImpression, selectedMovieId}})
    };


    return (
        <>
            <table border='1px' border-radius='10px' padding = '15px'>
            {/* <img src={impressions.image_url} /> */}
                <thead >
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Director</th>
                        <th>Impressions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={impressions.id}>
                        <td>{impressions.date}</td>
                        <td>{impressions.title}</td>
                        <td>{impressions.director}</td>
                        <td>{impressions.impressions}</td>
                    </tr>
                </tbody>
            </table>
            
            <button onClick={() => dispatch({ type: 'DELETE_IMPRESSION', payload: impressions.movies_id })}>DELETE Impression</button>
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