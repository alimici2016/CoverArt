const apiReducer = (state= [], action) => {
    switch (action.type) {
        case 'SET_SINGLE_API_MOVIE':
            return action.payload;
        default:
            return state;
    }
};

export default apiReducer;