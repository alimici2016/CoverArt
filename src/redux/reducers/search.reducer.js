const searchMovieReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_SEARCH_MOVIES':
            return action.payload;
        default:
            return state;
    }
};

export default searchMovieReducer;