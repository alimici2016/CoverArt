import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Input from '@mui/material/Input';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SendIcon from '@mui/icons-material/Send';

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
    };

    return (
        <>
                <TableContainer border='1px' border-radius='10px' padding='15px'>
                    <TableHead >
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Director</TableCell>
                            <TableCell>Impressions</TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {impressions.map((impression => (
                            <TableRow key={impression.id}>
                                <TableCell>{impression.date}</TableCell>
                                <TableCell>{impression.title}</TableCell>
                                <TableCell>{impression.director}</TableCell>
                                <TableCell>{impression.impressions}</TableCell>
                                <DeleteIcon onClick={() => dispatch({ type: 'DELETE_IMPRESSION', payload: impression })}>Delete Impression</DeleteIcon>
                            </TableRow>
                        )))}
                    </TableBody>
                </TableContainer>
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
                    <SendIcon type="submit">Save</SendIcon>
                </form>
            </div>
        </>
    )
}
export default Detail;