import ReactCardFlip from 'react-card-flip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useState } from 'react';

function WishlistItem({ movie }) {


    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };
    const apiMovieImage = movie.poster_path

    const movieImage =  'https://image.tmdb.org/t/p/w500' + apiMovieImage



    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div >
                <Card sx={{ width: 300, margin: 2, padding: 5 }} >
                    <div >
                        <h6> {JSON.stringify(movie.title)}</h6>
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
                    <h6>{movie.release_date}</h6>
                    <p> {movie.overview}</p>
                </div>
            </Card>
        </ReactCardFlip>
    )
}

export default WishlistItem;