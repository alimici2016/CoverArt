import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";



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
        streaming_service: '',
        description: '',
    });

    const handleChange = (event, property) => {
        setMovie({ ...movie, [property]: event.target.value })
    };

    const addMovie = (event) => {
        event.preventDefault();
        dispatch({ type: "ADD_MOVIE", payload: movie })
        setMovie('')
        history.push('/')
    };

    const wishlistMovie = (event) => {
        event.preventDefault();
        dispatch({ type: 'SET_WISHLIST', payload: movie })
        setMovie('')
        history.push('/wishlist')
    };

    const handleBack = () => {
        history.push('/home')
    }

    const fillIn = () => {
        setMovie({
            title: 'Inside Out',
            genre: 'Family',
            image_url: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Inside_Out_%282015_film%29_poster.jpg',
            director: 'Pete Docter',
            impressions: 'Great',
            description: 'Riley (Kaitlyn Dias) is a happy, hockey-loving 11-year-old Midwestern girl, but her world turns upside-down when she and her parents move to San Francisco. Rileys emotions -- led by Joy (Amy Poehler) -- try to guide her through this difficult, life-changing event. However, the stress of the move brings Sadness (Phyllis Smith) to the forefront. When Joy and Sadness are inadvertently swept into the far reaches of Rileys mind, the only emotions left in Headquarters are Anger, Fear and Disgust.',
            like: 'false'
        })
    };

    return (
        <>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '30vh' }}
            >
                <Button onClick={handleBack}>Home</Button>
                <h2  onClick={fillIn}>ADD MOVIE</h2>
                <form onSubmit={addMovie}>
                    <FormControl
                        sx={{width: '45ch'}}
                        >
                    <TextField onChange={(event) => handleChange(event, 'date')}
                        sx={{ m: 1 }}
                        type="date"
                        value={movie.date}
                    />
                    <TextField onChange={(event) => handleChange(event, 'title')}
                        sx={{ m: 1 }}
                        id="contained-basic"
                        label='Title'
                        type="text"
                        value={movie.title}
                    />

                    <TextField onChange={(event) => handleChange(event, 'director')}
                        id="contained-basic"
                        label='Director'
                        sx={{ m: 1 }}
                        type="text"
                        value={movie.director}
                    />
                    <TextField onChange={(event) => handleChange(event, 'image_url')}
                        id="contained-basic"
                        helperText="(URL here)"
                        sx={{ m: 1 }}
                        label='Image'
                        type="text"
                        value={movie.image_url}
                    />
                        <TextField onChange={(event) => handleChange(event, 'impressions')}
                            id ="contained-basic"
                            multiline rows={10}
                            sx={{ m: 1 }}
                            label='Impression'
                            type="text"
                            value={movie.impressions}
                        />
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    <Select  id ="outlined-basic" sx={{ m: 1, mr: 5 }}
                        onChange={(event) => handleChange(event, 'streaming_service')}>
                        <MenuItem value="">Choose Streaming Service</MenuItem>
                        <MenuItem value='Theater'>Theater</MenuItem>
                        <MenuItem value='Criterion'>Criterion</MenuItem>
                        <MenuItem value='Hbo Max'>HBO Max</MenuItem>
                        <MenuItem value='Netflix'>Netflix</MenuItem>
                        <MenuItem value='Hulu'>Hulu</MenuItem>
                        <MenuItem value='Disney Plus'>Disney Plus</MenuItem>
                        <MenuItem value='Amazon Prime'>Amazon Prime</MenuItem>
                        </Select>
                        </InputLabel>
                   
                        <FormControl >
                            <InputLabel  id="Genre" variant="standard" htmlFor="uncontrolled-native">
                                Genre
                            </InputLabel>
                                <Select labelId="Genre"
                                onChange={(event) => handleChange(event, 'genre')}>
                                <MenuItem value="">Choose Genre</MenuItem>
                                <MenuItem value='Adventure'>Adventure</MenuItem>
                                <MenuItem value='Animated'>Animated</MenuItem>
                                <MenuItem value='Biographical'>Biographical</MenuItem>
                                <MenuItem value='Comedy'>Comedy</MenuItem>
                                <MenuItem value='Crime'>Crime</MenuItem>
                                <MenuItem value='Thriller'>Thriller</MenuItem>
                                <MenuItem value='Disaster'>Disaster</MenuItem>
                                <MenuItem value='Drama'>Drama</MenuItem>
                                <MenuItem value='Epic'>Epic</MenuItem>
                                <MenuItem value='Fantasy'>Fantasy</MenuItem>
                                <MenuItem value='Musical'>Musical</MenuItem>
                                <MenuItem value='Romantic'>Romantic</MenuItem>
                                <MenuItem value='Science Fiction'>Science Fiction</MenuItem>
                                <MenuItem value='Space-Opera'>Space-Opera</MenuItem>
                                <MenuItem value='Superhero'>Superhero</MenuItem>
                                </Select>
                            <Button variant="contained" disabled={movie.impressions == '' || movie.title == ''} type="submit">Save</Button>
                            <Button  disabled={movie.title == ''} onClick={wishlistMovie}>Add Wishlist</Button>
                        </FormControl>
                    </FormControl>
                </form>
            </Grid>
        </>
    )
};

export default AddMovieForm;