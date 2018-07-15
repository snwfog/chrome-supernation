import { createStore } from 'redux';

import faker from 'faker';
import _ from 'lodash';
import { FETCH_ADVERTISERS } from "./actions";

let advertisers = () => (_.times(20, () => {
  return {
    id:            faker.random.uuid(),
    email:         faker.internet.email(),
    fullName:      faker.fake('{{name.lastName}} {{name.firstName}}'),
    avatarUrl:     faker.image.avatar(),
    lastSuperTime: faker.date.recent(),
  }
}));

let favorites = () => (_.times(5, () => {
  return {
    id:            faker.random.uuid(),
    email:         faker.internet.email(),
    fullName:      faker.fake('{{name.lastName}} {{name.firstName}}'),
    avatarUrl:     faker.image.avatar(),
    lastSuperTime: faker.date.recent(),
  }
}));

const initialState = {
  favorites:   favorites(),
  advertisers: advertisers(),
};

const rootReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case FETCH_ADVERTISERS:
      console.log('fetching advertisers...');
      return {
        ...state,
        advertisers: [...state.advertisers, ...advertisers()]
      };
    default:
      return state;
  }
};

export default createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
