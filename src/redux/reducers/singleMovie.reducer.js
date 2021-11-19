const SingleMovieImpression = (state = {}, action) => {
    switch (action.type) {
      case 'SET_IMPRESSION':
        return action.payload;
      default:
        return state;
    }
  };

export default SingleMovieImpression;
