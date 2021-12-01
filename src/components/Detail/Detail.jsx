import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Input from '@mui/material/Input';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


import './Detail.css'


function Detail() {

    const history = useHistory();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [newImpression, setNewImpression] = useState({
        date: '',
        impression: ''
    });

    const { movies_id } = useParams();

    const dispatch = useDispatch();

    const impressions = useSelector(store => store.SingleMovieImpression);

    const handleChange = (event, property) => {
        setNewImpression({ ...newImpression, [property]: event.target.value })
    };

    const addNewImpression = (event) => {
        event.preventDefault();
        dispatch({ type: "ADD_IMPRESSION", payload: { ...newImpression, movies_id } })
        setNewImpression({
            date: '',
            impression: ''
        })
    };

    const handleBack = () => {
        history.push('/home')
    }

    const handlePresentation = () => {
        setNewImpression({
            impression: 'Second watch rivals the first what an incredible way to stick your finger at folks who are so quick to through away lives for a false sense of pride! This is definitely top 5 all time! '
        })
    }

    return (
        <>

            <h2 className="title" onClick={handlePresentation}>Movie Impressions</h2>
            <Button onClick={handleBack}>Home</Button>

            {impressions.map((impression => (
                <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1, mb: 5 }}>
                    <Grid container spacing={2} key={impression.id}>
                        <Grid item>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" component="div">
                                        <h4>Impression:</h4>{impression.impressions}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    </Typography>
                                </Grid>
                                <Grid item>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" component="div">
                                    Date: {impression.date.split('T')[0]}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button sx={{ mr: 5 }} fontSize='small' onClick={() => dispatch({ type: 'DELETE_IMPRESSION', payload: impression })}>Delete Impression</Button>
                </Paper>
            )))}

            <div>
                <form onSubmit={addNewImpression}>
                    <Grid>
                        <Input onChange={(event) => handleChange(event, 'date')}
                            sx={{ mb: 5, mt: 0, ml: 78, width: .1 }}
                            type="date"
                            value={newImpression.date}
                        />

                    </Grid>
                    <Grid>
                        <TextField onChange={(event) => handleChange(event, 'impression')}
                            multiline={true}
                            rows={5}
                            sx={{ ml: 65, mb: 80, mt: 0, width: .3, height: 100 }}
                            placeholder='impression'
                            type="text"
                            value={newImpression.impression}
                        />
                        <Button disabled={newImpression.impression.length < 1 || newImpression.impression == ''} type="submit">Save</Button>
                    </Grid>
                </form>
            </div>
        </>
    )
};
export default Detail;