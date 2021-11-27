import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';
import  TextField from "@mui/material/TextField";

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
            <button onClick={fillIn}>Fill in </button>
            <Button onClick={handleBack}>Home</Button>
            <form onSubmit={addMovie}>
                <Input onChange={(event) => handleChange(event, 'date')}
                    type="date"
                    value={movie.date}
                />
                <TextField onChange={(event) => handleChange(event, 'title')}
                    placeholder='Title'
                    type="text"
                    value={movie.title}
                />
                
                <TextField onChange={(event) => handleChange(event, 'director')}
                    placeholder='Director'
                    sx={{ ml: 30 }}
                    type="text"
                    value={movie.director}
                />
                <TextField onChange={(event) => handleChange(event, 'image_url')}
                    multiline={true}
                    rows={3}
                    sx={{ mt: 20}}
                    placeholder='Image'
                    type="text"
                    value={movie.image_url}
                />
                <div className="box">
                <TextField onChange={(event) => handleChange(event, 'impressions')}
                    multiline={true}
                    rows={15}
                    sx={{ mt: 0, ml: 50, width: .4, height: 60}}
                    placeholder='Impression'
                    type="text"
                    value={movie.impressions}
                />
                </div>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                </InputLabel>
                <NativeSelect
                    onChange={(event) => handleChange(event, 'streaming_service')}>
                    <option value="">Choose Streaming Service</option>
                    <option value='Theater'>Theater</option>
                    <option value='Criterion'>Criterion</option>
                    <option value='Hbo Max'>HBO Max</option>
                    <option value='Netflix'>Netflix</option>
                    <option value='Hulu'>Hulu</option>
                    <option value='Disney Plus'>Disney Plus</option>
                    <option value='Amazon Prime'>Amazon Prime</option>
                </NativeSelect>
                <Box sx={{ minWidth: 1 }}>
                    <FormControl >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        </InputLabel>
                        <NativeSelect
                            onChange={(event) => handleChange(event, 'genre')}>
                            <option value="">Choose Genre</option>
                            <option value='Adventure'>Adventure</option>
                            <option value='Animated'>Animated</option>
                            <option value='Biographical'>Biographical</option>
                            <option value='Comedy'>Comedy</option>
                            <option value='Crime'>Crime</option>
                            <option value='Thriller'>Thriller</option>
                            <option value='Disaster'>Disaster</option>
                            <option value='Drama'>Drama</option>
                            <option value='Epic'>Epic</option>
                            <option value='Fantasy'>Fantasy</option>
                            <option value='Musical'>Musical</option>
                            <option value='Romantic'>Romantic</option>
                            <option value='Science Fiction'>Science Fiction</option>
                            <option value='Space-Opera'>Space-Opera</option>
                            <option value='Superhero'>Superhero</option>
                        </NativeSelect>
                        <button disabled={movie.impressions == '' || movie.title == ''} type="submit">Save</button>
                    </FormControl>
                </Box >
            </form>
        </>
    )
};

export default AddMovieForm;