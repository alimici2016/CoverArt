import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from 'react';
import WishlistItem from '../WishlistItem/WishlistItem'

function Wishlist() {

    useEffect(() => {
        dispatch({ type: 'FETCH_API_MOVIE' })
    }, []);
    const apiMovie = useSelector(store => store.apiReducer)
    // const apiMovie = useSelector(store => store.singleSearchMovie)

    const dispatch = useDispatch()

    return (
        <>
            <h3>Welcome to your Wishlist</h3>
            {apiMovie.map((movie => (
                <WishlistItem key={movie.id} movie={movie} />
            )))}
        </>
    )
}

export default Wishlist;