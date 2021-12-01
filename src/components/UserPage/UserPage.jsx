import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Item from '../Item/Item';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';


import './UserPage.css';
import { Tooltip } from '@mui/material';


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
    comparisonHistory();
  }, []);

  // const useMountedEffect = ((taco) => useEffect(taco, []))

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
    historyDate = historyDate.split('2002-')[1]
    movieHistoryObject = movieHistory
  }
  console.log(historyDate)

  let reversedHistory = historyDate.split('/').reverse().join('/')
  console.log('HISTORY', reversedHistory)

  console.log(movieHistoryObject)

  let comparison = {}

  const comparisonHistory = () => {
    if (todayDateFlipped === reversedHistory) {
      console.log(movieHistoryObject)
      comparison = movieHistoryObject
      return comparison
    } else {
      console.log('nothing working')
      return null;
    }
  };

  comparisonHistory();

  console.log('history of movie data', comparison)

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    )
  }
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <Tooltip title="Mystery">
        <Button variant="contained" onClick={handleClickOpen}>
          ⏱
        </Button>
        </Tooltip>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <h4>Have you seen?</h4>
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
     
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              <img src={comparison.image_url} />
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button autoFocus onClick={handleClose}>
             Add to Collection
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>

      <div>
        {/* {useMountedEffect(handleClickOpen)} */}
        <p>{JSON.stringify(comparisonHistory)}</p>
        <h2>Welcome, {user.username}!</h2>
        <h4 className="title">{date}</h4>
        <h3 className="title">Movie Collection</h3>

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
