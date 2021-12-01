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

    let movieImage = ''

    const movieTitle = movie.title

    const postApiMovie = () => {
        dispatch({ type: 'ADD_API_MOVIE_TO_DB', payload: { movieImage, movieTitle } })
        dispatch({ type: 'DELETE_API_MOVIE', payload: movie.id })
        history.push('/home')
    }

    const movieDate = () => {
        if (movie.release_date === null) {
            return null
        } else if (movie.release_date) {
            movie.release_date.split('T')[0]
        }
    };

    const posterFunction = () => {
        if (apiMovieImage.length !== 32) {
            movieImage = apiMovieImage
            return movieImage
        } else if (apiMovieImage.length === 32) {
            movieImage = 'https://image.tmdb.org/t/p/w500' + apiMovieImage
            return movieImage
        }
    }

    posterFunction();

    console.log(typeof apiMovieImage)
    return (

        <>
            <div className="container">
                <Card sx={{ width: 350, margin: 2, padding: 5 }} className='card'>
                    <div>
                        <h5>{movieTitle}</h5>
                        <CardMedia
                            className="card"
                            component="img"
                            height="500"
                            margin='15'
                            image={movieImage}
                            onClick={handleFlip}
                        />
                    </div>
                </Card>

                <Card sx={{ height: 500, width: 280, margin: 2, padding: 5 }} className='card'>
                    <div className="movie-info">
                        <h5> {movie.title}</h5>
                        <h6>{movieDate}</h6>
                        <p> {movie.overview}</p>
                    </div>
                    <CardActions className="buttons">
                        <Button onClick={postApiMovie} size="small" align='center'>Watched</Button>
                    </CardActions>
                </Card>
            </div>
        </>
    )
}

export default WishlistItem;