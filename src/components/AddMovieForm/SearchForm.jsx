import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import APIList from "../APIList/APIList";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button'

function SearchForm() {

    const history = useHistory();

    const film = useSelector(store => store.searchMovieReducer)

    const dispatch = useDispatch();

    const [searchMovie, setSearchMovie] = useState("");

    const handleChange = (e) => {
        setSearchMovie(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(`Searching`);
        dispatch({ type: "SEARCH_MOVIES", payload: searchMovie });
        setSearchMovie("");
    };


    return (
        <>
            <form onSubmit={handleSearch}>
                <TextField onChange={handleChange}
                    sx={{ m: 1 }}
                    id="outlined-basic"
                    label="Search"
                    type="text"
                    value={searchMovie}
                />
                <Button type="submit">Search</Button>
            </form>

            <div className="container">
                {film.map((movie => (
                    <APIList key={movie.id} movie={movie} />
                )))}
            </div>
        </>
    );
}
export default SearchForm;