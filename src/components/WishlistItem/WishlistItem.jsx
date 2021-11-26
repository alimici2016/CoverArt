import ReactCardFlip from 'react-card-flip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import './WishlistItem.css'

function WishlistItem({ movie }) {

    const history = useHistory();

    const dispatch = useDispatch()

    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };
    const apiMovieImage = movie.poster_path

    const movieImage = 'https://image.tmdb.org/t/p/w500' + apiMovieImage

    const movieTitle = movie.title

    const postApiMovie = () => {
        dispatch({ type: 'ADD_API_MOVIE_TO_DB', payload: { movieImage, movieTitle } })
        history.push('/home')
    }

    return (

        <>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div>
                    <Card sx={{ width: 300, margin: 2, padding: 5 }} className='card'>
                        <div >
                            <CardMedia
                                className="card"
                                component="img"
                                height="225"
                                margin='15'
                                image={movieImage}
                                onClick={handleFlip}
                            />
                        </div>
                    </Card>
                </div>

                <Card sx={{ width: 280, margin: 2, padding: 5 }} className='card'>
                    <div className="movie-info">
                        <h5> {movie.title}</h5>
                        <h6>{movie.release_date.split('T')[0]}</h6>
                        <p> {movie.overview}</p>
                    </div>
                    <CardActions className="buttons">
                        <Button onClick={postApiMovie} size="small" align='center'>Watched</Button>
                    </CardActions>
                </Card>
            </ReactCardFlip>
        </>
    )
}

export default WishlistItem;