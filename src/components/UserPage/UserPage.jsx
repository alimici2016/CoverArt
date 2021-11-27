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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' })
    dispatch({ type: 'FETCH_API_MOVIE' })
  }, []);


  return (
    <>
      <div>
        <h2>Welcome, {user.username}!</h2>
        <h4 className="title">This is your Movie Collection</h4>

        <div className="container">
          {films.map((film => (
            <Item key={film.id} film={film} />
          )))}
        </div>
        </div> 
        <LogOutButton className="btn" />
    </>
  )
};

export default UserPage;
