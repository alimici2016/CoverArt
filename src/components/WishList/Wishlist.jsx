import { useDispatch, useSelector } from "react-redux";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

function Wishlist() {

    // const apiMovie = useSelector(store => store.apiReducer)
    const apiMovie = useSelector(store => store.singleSearchMovie)

    const dispatch = useDispatch()

    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };    

    
    return (

        <>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div >

                    <Card sx={{ width: 300, margin: 2, padding: 5 }} >
                        <div >
                            <h6> {apiMovie.title}</h6>
                            <CardMedia
                                className="card"
                                component="img"
                                height="225"
                                margin='15'
                                image={apiMovie.poster_path}
                                onClick={handleFlip}
                            />
                        </div>
                    </Card>
                </div>

                <Card sx={{ width: 280, margin: 2, padding: 5 }} className='card'>
                    <div className="movie-info">
                        <h5> {apiMovie.title}</h5>
                        <h6>{apiMovie.release_date}</h6>
                        <p> {apiMovie.overview}</p>
                    </div>
                </Card>
            </ReactCardFlip>
        </>
    )
}

export default Wishlist;