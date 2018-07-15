import { createStore } from 'redux';

import faker from 'faker';
import _ from 'lodash';
import {
  ADVERTISERS_FETCH,
  ADVERTISERS_SEARCH,
  FAVORITES_ADD
} from "./actions";

let advertisers = () => (_.times(20, () => {
  return {
    id:            faker.random.uuid(),
    email:         faker.internet.email(),
    fullName:      faker.fake('{{name.lastName}} {{name.firstName}}'),
    avatarUrl:     faker.image.avatar(),
    lastSuperTime: faker.date.recent(),
  }
}));

let favorites = () => (_.times(0, () => {
  return {
    id:            faker.random.uuid(),
    email:         faker.internet.email(),
    fullName:      faker.fake('{{name.lastName}} {{name.firstName}}'),
    avatarUrl:     faker.image.avatar(),
    lastSuperTime: faker.date.recent(),
  }
}));

const initialState = {
  advertiserSearch: null,
  favorites:        favorites(),
  advertisers:      advertisers(),
};

const rootReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case ADVERTISERS_FETCH:
      return {
        ...state,
        advertisers: [...state.advertisers, ...advertisers()]
      };
    case ADVERTISERS_SEARCH:
      return {
        ...state,
        advertiserSearchName: action.advertiserSearchName
      };

    case FAVORITES_ADD:

    default:
      return state;
  }
};

export default createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
