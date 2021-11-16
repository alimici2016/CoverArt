import { useState } from "react";
import { useDispatch } from "react-redux";

function AddMovieForm() {

    const dispatch = useDispatch();

    const [movie, setMovie] = useState({
        date: '',
        title: '',
        genre: '',
        image_url: '',
        director: '',
        impressions: '',
    })

    const [like, updateLike] = useState()

    const handleChange = (event, property) => {
        setMovie({ ...movie, [property]: event.target.value })
    };

    const addMovie = (event) => {
        event.preventDefault();
        dispatch({ type: "ADD_MOVIE", payload: movie })
    };

    return (
        <form onSubmit={addMovie}>
            <input onChange={(event) => handleChange(event, 'date')}
                type="date"
                value={movie.date}
            />
            <input onChange={(event) => handleChange(event, 'title')}
                placeholder='title'
                type="text"
                value={movie.title}
            />
            {/* <input onChange={(event) => handleChange(event, 'genre')}
                placeholder='genre'
                type="text"
                value={movie.genre}
            /> */}
            <input onChange={(event) => handleChange(event, 'image_url')}
                placeholder='image_url'
                type="text"
                value={movie.image_url}
            />
           
            <input onChange={(event) => handleChange(event, 'director')}
                placeholder='director'
                type="text"
                value={movie.director}
            />
            <input onChange={(event) => handleChange(event, 'impressions')}
                placeholder='impression'
                type="text"
                value={movie.impressions}
            />
            <button type="submit">Save</button>
        </form>
    )
}

export default AddMovieForm;