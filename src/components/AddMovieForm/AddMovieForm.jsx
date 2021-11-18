import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function AddMovieForm() {

    const history = useHistory();

    const dispatch = useDispatch();

    const [movie, setMovie] = useState({
        date: '',
        title: '',
        genre: '',
        image_url: '',
        director: '',
        impressions: '',
    })

    const handleChange = (event, property) => {
        setMovie({ ...movie, [property]: event.target.value })
    };

    const addMovie = (event) => {
        event.preventDefault();
        dispatch({ type: "ADD_MOVIE", payload: movie })
        setMovie('')
        history.push('/')
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
             <select
            onChange={(event) => handleChange(event, 'genre')}>
             <option value="">Choose a category</option>
             <option value='Adventure'>Adventure</option>
             <option value='Animated'>Animated</option>
             <option value='Biographical'>Biographical</option>
             <option value='Comedy'>Comedy</option>
             <option value='Disaster'>Disaster</option>
             <option value='Drama'>Drama</option>
             <option value={7}>Epic</option>
             <option value={8}>Fantasy</option>
             <option value={9}>Musical</option>
             <option value={10}>Romantic</option>
             <option value={11}>Science Fiction</option>
             <option value={12}>Space-Opera</option>
             <option value={13}>Superhero</option>
              </select>
            <button type="submit">Save</button>
        </form>
    )
}

export default AddMovieForm;