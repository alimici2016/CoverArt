import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function SearchForm() {

    const film = useSelector(store => store.searchMovieReducer)

    const dispatch = useDispatch();

    const [searchMovie, setSearchMovie] = useState("");

    const history = useHistory();

    const handleChange = (e) => {
        setSearchMovie(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(`Searching`);
        dispatch({ type: "SEARCH_MOVIES", payload: searchMovie });

        setSearchMovie("");
        // history.push('/list')
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
                {JSON.stringify(film)}
                {/* {film.map((movie => (
                    <h2>{movie.original_title}</h2>
                )))} */}
            </div>
        </>
    );
}
export default SearchForm;