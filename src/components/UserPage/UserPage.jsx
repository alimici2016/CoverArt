import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Item from '../Item/Item';
import './UserPage.css';
import Wishlist from '../WishList/Wishlist';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const films = useSelector(store => store.MovieArrayReducer);
  const apiMovie = useSelector(store => store.apiReducer)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' })
    dispatch({ type: 'FETCH_API_MOVIE' })
  }, []);


  return (
    <>
      <div>
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>

        {/* <p>{JSON.stringify(apiMovie)}</p> */}
        <div className="container">
          {films.map((film => (
            <Item key={film.id} film={film} />
          )))}
        </div>

        <div>
          {apiMovie.map((movie => (
            // <Wishlist key={}/>
            <div key={movie.id}>
              <h5>{movie.title}</h5>
              <img src={movie.poster_path} />
              <p>{movie.overview}</p>
            </div>
          )))}

        </div>
        <LogOutButton className="btn" />
      </div >
    </>
  )
};

export default UserPage;
