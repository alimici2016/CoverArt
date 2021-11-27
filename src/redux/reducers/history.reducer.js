const historyReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_HISTORY_MOVIE':
            return action.payload;
        default:
            return state;
    }
};
export default historyReducer;