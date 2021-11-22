import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
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


function Detail() {

    const [newImpression, setNewImpression] = useState({
        date: '',
        impression: ''
    });

    const { movies_id } = useParams();

    const dispatch = useDispatch();

    const impressions = useSelector(store => store.SingleMovieImpression)

    const handleChange = (event, property) => {
        setNewImpression({ ...newImpression, [property]: event.target.value })
    };

    const addNewImpression = (event) => {
        event.preventDefault();
        dispatch({ type: "ADD_IMPRESSION", payload: { ...newImpression, movies_id } })
        setNewImpression({ date: '',
        impression: ''})
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

    return (
        <>
            <Paper elevation={4}>
                <Table sx={{ 
                    minWidth: 100,
                    height: 100 }}>
                    <TableContainer border='1px' border-radius='10px' padding='15px'>
                        <TableHead >
                            <TableRow>
                                <StyledTableCell>Date</StyledTableCell>
                                <StyledTableCell>Impressions</StyledTableCell>
                                <StyledTableCell>Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {impressions.map((impression => (
                                <TableRow key={impression.id}>
                                    <TableCell>{impression.date.split('T')[0]}</TableCell>
                                    <TableCell>{impression.impressions}</TableCell>
                                    <DeleteIcon onClick={() => dispatch({ type: 'DELETE_IMPRESSION', payload: impression})}>Delete Impression</DeleteIcon>
                                </TableRow>
                            )))}
                        </TableBody>
                    </TableContainer>
                </Table>

                <div>
                    <form onSubmit={addNewImpression}>
                        <Input onChange={(event) => handleChange(event, 'date')}
                            type="date"
                            value={newImpression.date}
                        />
                        <Input onChange={(event) => handleChange(event, 'impression')}
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
}
export default Detail;