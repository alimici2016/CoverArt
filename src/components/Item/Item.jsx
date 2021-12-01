import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CircleIcon from '@mui/icons-material/Circle';
import { purple, red } from '@mui/material/colors';
import { orange } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import './Item.css'
import { CardContent } from "@mui/material";


function Item({ film }) {

    const impressions = useSelector(store => store.SingleMovieImpression);

    const dispatch = useDispatch();

    const history = useHistory();

    const [isLiked, setIsLiked] = useState(false);

    const [isFlipped, setIsFlipped] = useState(false);

    const handleDelete = () => {
        if (confirm('Do you want to delete?')) {
            dispatch({ type: 'DELETE_MOVIE', payload: film })
           
        } else {
        }
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

    const prime = film.streaming_service === 'Amazon Prime' && <CircleIcon sx={{ color: blue[700] }} />
    const hboMax = film.streaming_service === 'Hbo Max' && <CircleIcon sx={{ color: purple[700] }} />
    const criterion = film.streaming_service === 'Criterion' && <CircleIcon color="disabled" />
    const hulu = film.streaming_service === 'Hulu' && <CircleIcon color="success" />
    const theater = film.streaming_service === 'Theater' && <CircleIcon sx={{ color: [500] }} />
    const netflix = film.streaming_service === 'Netflix' && <CircleIcon sx={{ color: red[700] }} />
    const disneyPlus = film.streaming_service == 'Disney Plus' && <CircleIcon sx={{ color: blue[900] }} />
    const nullMovie = film.streaming_service == 'null' && <CircleIcon sx={{ color: orange[700] }} />


    return (
        <>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div >
                    <Card sx={{ width: 350, margin: 2, padding: 5 }} onClick={handleFlip}>
                        <div>
                            <h6> {film.title}</h6>
                            <div className="card" >
                                <CardMedia
                                    component="img"
                                    height="500"
                                    margin='15'
                                    image={film.image_url}
                                />
                            </div>
                            <div className="image_overlay" onClick={handleFlip}>
                                <h5 className="image_description">{film.description}</h5>
                            </div>

                            <CardActions>
                                <Tooltip title="like">
                                    {film?.like ?
                                        <FavoriteIcon onClick={handleLike} color='error'>Like</FavoriteIcon> :
                                        <FavoriteBorderIcon onClick={handleLike}>Like</FavoriteBorderIcon>
                                    }
                                </Tooltip>
                            </CardActions>

                        </div>
                    </Card>
                </div>

                <Card sx={{ width: 280, margin: 2, padding: 5 }} className='card'>
                    <Tooltip title="STREAMING ON" >
                        <div className="movie-info" onClick={handleBack}>
                            {prime}{hboMax}{hulu}{netflix}{nullMovie}{theater}{criterion}{disneyPlus}
                            <h5> Director: {film.director}</h5>
                            <h5> Genre: {film.genre}</h5>
                        </div>
                    </Tooltip>
                    <CardContent></CardContent>
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