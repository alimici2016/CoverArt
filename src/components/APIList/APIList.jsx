import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';


function APIList ({movie}) {

    const dispatch = useDispatch();

    const history = useHistory();
    
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleClick = () => {
        console.log('clicked')
        dispatch({type: 'SET_WISHLIST' , payload: movie})
        dispatch({type: 'SET_SINGLE_SEARCH_MOVIE' , payload: movie})
        history.push('/wishlist')
    }

    return(
        <>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div >
            <Card sx={{ width: 300, margin: 2, padding: 5 }} >
                <div >
                <h6> {movie.title}</h6>
                <CardMedia
                    className="card"
                    component="img"
                    height="225"
                    margin='15'
                    image={movie.poster_path}
                    onClick={handleFlip}
                />
                </div>
            </Card>
        </div>

        <Card sx={{ width: 280, margin: 2, padding: 5 }} className='card'>
            <div className="movie-info">
            <h5> {movie.title}</h5>
            <h6>{movie.release_date}</h6>
            <p> {movie.overview}</p>
            </div>
            <CardActions className="buttons">
                 <Button onClick={handleClick} size="small" align='center'>Add to Wishlist</Button>
            </CardActions>
        </Card>
    </ReactCardFlip>
    </>
    )
};

export default APIList;