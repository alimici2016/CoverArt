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

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.lavender,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 25,
        },
    }));

    const handleBack = () => {
        history.push('/home')
    }

    return (
        <>

        <Button onClick={handleBack}>Home</Button>
            <Paper elevation={4} 
            sx={{
                mt: 10,
                ml:40,
                width: 800,
                height: 1500
                
            }}>
                <Table >
                    <TableContainer sx={{ mt: 5, ml: 37}}>
                        <TableHead >
                            <TableRow>
                                <StyledTableCell>Date</StyledTableCell>
                                <StyledTableCell>Impressions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {impressions.map((impression => (
                                <TableRow key={impression.id}>
                                    <TableCell>{impression.date?.split('T')[0]}</TableCell>
                                    <TableCell>{impression.impressions}</TableCell>
                                    <DeleteIcon sx={{mb:1}}fontSize='small' onClick={() => dispatch({ type: 'DELETE_IMPRESSION', payload: impression })}>Delete Impression</DeleteIcon>
                                    {/* <button onClick={handleClickOpen}>
                                    </button> */}
                                </TableRow>
                            )))}
                            <div>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Edit Your Impression</DialogTitle>
                                    <DialogContent>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="impression"
                                            type="email"
                                            fullWidth
                                            variant="standard"
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button>Submit</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </TableBody>
                    </TableContainer>
                </Table>

                <div>
                    <form onSubmit={addNewImpression}>
                        <Input onChange={(event) => handleChange(event, 'date') }
                            sx={{ mt: 9, ml: 36, width: .3 }}
                            type="date"
                            value={newImpression.date}
                        />
                        <TextField onChange={(event) => handleChange(event, 'impression')}
                            multiline={true}
                            rows={14}
                            sx={{ mt: 1, ml: 16, width: .7, height: 100}}
                            placeholder='impression'
                            type="text"
                            value={newImpression.impression}
                        />
                        <Button disabled={newImpression.impression.length < 1 || newImpression.impression == ''} type="submit">Save</Button>
                    </form>
                </div>
            </Paper>
        </>
    )
};
export default Detail;