import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

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
            <Input onChange={(event) => handleChange(event, 'date')}
                type="date"
                value={movie.date}
            />
            <Input onChange={(event) => handleChange(event, 'title')}
                placeholder='title'
                type="text"
                value={movie.title}
            />
            <Input onChange={(event) => handleChange(event, 'image_url')}
                placeholder='image_url'
                type="text"
                value={movie.image_url}
            />

            <Input onChange={(event) => handleChange(event, 'director')}
                placeholder='director'
                type="text"
                value={movie.director}
            />
            <Input onChange={(event) => handleChange(event, 'impressions')}
                placeholder='impression'
                type="text"
                value={movie.impressions}
            />
            <Box sx={{ minWidth: 1 }}>
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    </InputLabel>
                    <NativeSelect
                        onChange={(event) => handleChange(event, 'genre')}>
                        <option value="">Choose Genre</option>
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
                    <button type="submit">Save</button>
                    </NativeSelect>
                </FormControl>
            </Box >
        </form>
    )
}

export default AddMovieForm;