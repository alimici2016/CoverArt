const singleSearchMovie = (state= {}, action) => {
    switch (action.type) {
        case 'SET_SINGLE_SEARCH_MOVIE':
            return action.payload;
        default:
            return state;
    }
};

export default singleSearchMovie;