import { createStore } from 'redux';

const initialState = {
  favorites:   [],
  advertisers: [],
};

const ADD_FAVORITES = 'ADD_FAVORITES';


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default createStore(rootReducer);
