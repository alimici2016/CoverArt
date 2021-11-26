import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CircleIcon from '@mui/icons-material/Circle';
import { red } from '@mui/material/colors';
import { orange } from '@mui/material/colors';
import './Item.css'


function Item({ film }) {

    const dispatch = useDispatch();

    const history = useHistory();

    const [isLiked, setIsLiked] = useState(false);

    const [isFlipped, setIsFlipped] = useState(false);

    const handleDelete = () => {
        dispatch({ type: 'DELETE_MOVIE', payload: film })
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleClick = () => {
        dispatch({ type: 'FETCH_IMPRESSION', payload: film.id })
        history.push(`/detail/${film.id}`)
    };

    const handleLike = () => {
        dispatch({ type: 'ADD_LIKE', payload: film })
        setIsLiked(!isLiked);
    };

    const handleBack = () => {
        history.push('/home')
    }

    return (
        <>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div >
                    <Card sx={{ width: 300, margin: 2, padding: 5 }} >
                        <div>
                            <h6> {film.title}</h6>
                            <div className="card" >
                                <CardMedia
                                    className="image"
                                    component="img"
                                    height="225"
                                    margin='15'
                                    image={film.image_url}
                                    onClick={handleFlip}
                                />
                            </div>
                            <div className="image_overlay">
                                <h5 className="image_title">Hi</h5>
                            </div>
                            <p>image description</p>
                            <CardActions> {film?.like ?
                                <FavoriteIcon onClick={handleLike} color='error'>Like</FavoriteIcon> :
                                <FavoriteBorderIcon onClick={handleLike}>Like</FavoriteBorderIcon>
                            }
                            </CardActions>
                        </div>
                    </Card>
                </div>

                <Card sx={{ width: 280, margin: 2, padding: 5 }} className='card'>
                    <div className="movie-info" onClick={handleBack}>
                        {film.streaming_service === 'Amazon Prime' && <CircleIcon color="primary" />}
                        {film.streaming_service === 'Hbo Max' && <CircleIcon color="secondary" />}
                        {film.streaming_service === 'Criterion' && <CircleIcon color="disabled" />}
                        {film.streaming_service === 'Hulu' && <CircleIcon color="success" />}
                        {film.streaming_service === 'Theater' && <CircleIcon sx={{ color: [500] }} />}
                        {film.streaming_service === 'Netflix' && <CircleIcon sx={{ color: red[700] }} />}
                        {film.streaming_service === 'null' && <CircleIcon sx={{ color: orange[700] }} />}
                        <h3> {film.title}</h3>
                        <h5> Director: {film.director}</h5>
                        <h5> Genre: {film.genre}</h5>
                    </div>
                    <CardActions className="buttons">
                        <Button onClick={handleClick} size="small" align='center'>Impressions</Button>
                        <Button onClick={handleDelete} size="small" align='center'>Delete</Button>
                    </CardActions>
                </Card>
            </ReactCardFlip>
        </>
    )
}

export default Item;