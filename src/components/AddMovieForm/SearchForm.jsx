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
        <div>
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
                <p>{JSON.stringify(film)}</p>
                {/* <h1>{film.Title}</h1>
                <h2>{film.Director}</h2>
                <p>{film.Genre}</p>
                <img src={film.Poster} */}
                {/* >

                </img> */}
            </div>
        </div>
    );
}
export default SearchForm;