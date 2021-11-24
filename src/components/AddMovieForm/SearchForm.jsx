import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import APIList from "../APIList/APIList";

function SearchForm() {

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
        // history.push('/wishlist')
    };
    return (
        <>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchMovie}
                    onChange={handleChange}
                />
                <button type="submit">Search</button>
            </form>

            <div>
                {film.map((movie => (
                  <APIList key={movie.id} movie={movie}/>
                )))}
            </div>
        </>
    );
}
export default SearchForm;