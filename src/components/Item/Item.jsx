import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
// import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';


function Item({ film }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const [isLiked, setIsLiked] = useState(false)

    const handleFlip = () => {
       
    }

    const handleDelete = () => {
        dispatch({ type: 'DELETE_MOVIE', payload: film })
    }

    const handleClick = () => {
        dispatch({ type: 'FETCH_IMPRESSION', payload: film })
        history.push('/detail')
    }

    const handleLike = () => {
        dispatch({ type: 'ADD_LIKE', payload: film })
        setIsLiked(!isLiked);
    }

    return (
        <>
                <div>
                    <Card sx={{ width: 280, margin: 2, padding: 5 }}>
                        <h2> {film.title}</h2>
                        <h3> Director: {film.director}</h3>
                        <CardMedia
                            component="img"
                            height="200"
                            margin='15'
                            image={film.image_url}
                            onClick={handleFlip}
                        />
                        <CardActions>
                            <Button onClick={handleClick} size="small">Learn More</Button>
                            <Button onClick={handleDelete} size="small">Delete</Button>
                            <Button onClick={handleLike}>Like</Button>
                        </CardActions>
                    </Card>
                </div>
        </>
    )
}

export default Item;