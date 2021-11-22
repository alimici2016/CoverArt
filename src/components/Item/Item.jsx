import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';


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

    return (
        <>

            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div>
                    <Card sx={{ width: 300, margin: 2, padding: 5 }}>
                        <h6> {film.title}</h6>
                        <CardMedia
                            component="img"
                            height="225"
                            margin='15'
                            image={film.image_url}
                            onClick={handleFlip}
                        />
                        <CardActions>
                            <FavoriteIcon onClick={handleLike}>Like</FavoriteIcon>
                        </CardActions>
                    </Card>
                </div>

                <Card sx={{ width: 280, margin: 2, padding: 5 }}>
                    <h3> {film.title}</h3>
                    <h5> Director: {film.director}</h5>
                    <h5> Genre: {film.genre}</h5>
                    <CardActions>
                        <Button onClick={handleClick} size="small" align='center'>Previous</Button>
                        <Button onClick={handleDelete} size="small" align='center'>Delete</Button>
                    </CardActions>
                </Card>
            </ReactCardFlip>
        </>
    )
};

export default Item;