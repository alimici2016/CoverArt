const MovieArrayReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_MOVIES':
        return action.payload;
      default:
        return state;
    }
  };

export default MovieArrayReducer;
  