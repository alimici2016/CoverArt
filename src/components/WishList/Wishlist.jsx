import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import React, { useEffect } from 'react';
import WishlistItem from '../WishlistItem/WishlistItem'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from "@mui/material/Tooltip";

function Wishlist() {

    useEffect(() => {
        dispatch({ type: 'FETCH_API_MOVIE' })
    }, []);
    const apiMovie = useSelector(store => store.apiReducer)
    // const apiMovie = useSelector(store => store.singleSearchMovie)

    const [open, setOpen] = useState(false);

    const randomNumber = () => {
        return Math.floor(Math.random() * apiMovie.length - 1);
    }

    let randomMovie = {};

    const findMovie = () => {
        let randomIndex = randomNumber(1);
        console.log(randomIndex)
        randomMovie = apiMovie[randomIndex]
        console.log(randomMovie)
        return randomMovie
    }

    console.log(randomMovie)

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

    const handleClickOpen = () => {
        setOpen(true);
        console.log(randomMovie)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch()

    findMovie();

    const apiMovieImage = randomMovie?.poster_path

    let movieImage = '';

    const posterFunction = () => {
        if (apiMovieImage?.length !== 32) {
            movieImage = apiMovieImage
            return movieImage
        } else if (apiMovieImage?.length === 32) {
            movieImage = 'https://image.tmdb.org/t/p/w500' + apiMovieImage
            return movieImage
        }
    };

    posterFunction();

    return (
        <>
            <div>
                <Tooltip title="Want a suggestion">
                <Button helperText="Want a suggestion" variant="contained" onClick={handleClickOpen}>
                    Random Movie
                </Button>
                </Tooltip>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <h5>{apiMovie.title}</h5>
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            <img src={movieImage} />
                        </Typography>
                    </DialogContent>

                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Make an Impression
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </div>

            <h3>Welcome to your Wishlist</h3>
            <div className="container">
            {apiMovie.map((movie => (
                <WishlistItem key={movie.id} movie={movie} />
            )))}
            </div>
        </>
    )
}

export default Wishlist;