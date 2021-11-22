import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Item from '../Item/Item';
import './UserPage.css';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const films = useSelector(store => store.MovieArrayReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' })
  }, []);


  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      <div className="container">
        {films.map((film => (
          <Item key={film.id} film={film} />
        )))}
      </div>

      <LogOutButton className="btn" />
    </div >
  )
};

export default UserPage;
