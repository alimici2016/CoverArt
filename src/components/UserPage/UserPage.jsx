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
  const history = useSelector(store => store.historyReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' })
    dispatch({ type: 'FETCH_API_MOVIE' })
    dispatch({ type: 'FETCH_HISTORY' })
  }, []);

  const current = new Date();

  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  let todayDate = date.split('/2021')[0]
  let todayDateFlipped = todayDate.split('/').reverse().join('-')
  console.log('today date', todayDateFlipped)

  let historyDate = '';
  let movieHistoryObject = {};

  for (let movieHistory of history) {
    console.log(movieHistory)
    historyDate = movieHistory.date.split('T')[0]
    historyDate = historyDate.split('1990-')[1]
    movieHistoryObject = movieHistory
  }
  console.log(historyDate)

  let reversedHistory = historyDate.split('/').reverse().join('/')
  console.log('HISTORY', reversedHistory)

  const comparisonHistory = () => {
    if (todayDateFlipped == reversedHistory) {
      console.log(movieHistoryObject)
      return movieHistoryObject
    };
  }
  console.log('history of movie data', movieHistoryObject)

  return (
    <>
      <div>
        <p>{JSON.stringify(movieHistoryObject)}</p>
        <h2>Welcome, {user.username}!</h2>
        <h4 className="title">{date}</h4>
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
