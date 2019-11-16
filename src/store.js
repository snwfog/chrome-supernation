import { createStore } from 'redux';

import faker from 'faker';
import _ from 'lodash';
import advertisersJSON from './advertisers_json'

import { Map, List, OrderedSet } from 'immutable';

import {
  ADVERTISERS_FETCH,
  ADVERTISERS_SEARCH,
  FAVORITES_ADD, FAVORITES_REMOVE
} from "./actions";

// let advertisersFetch = () => (_.times(20, () => {
//   return Map({
//     id:            faker.random.uuid(),
//     email:         faker.internet.email(),
//     fullName:      faker.fake('{{name.lastName}} {{name.firstName}}'),
//     avatarUrl:     faker.image.avatar(),
//     lastSuperTime: null,
//   })
// }));

let favoritesFetch = () => (_.times(2, () => {
  return Map({
    id:            faker.random.uuid(),
    email:         faker.internet.email(),
    fullName:      faker.fake('{{name.lastName}} {{name.firstName}}'),
    avatarUrl:     faker.image.avatar(),
    isFavorite:    true,
    lastSuperTime: faker.date.recent(),
  })
}));

let allAdvertisers = JSON.parse(advertisersJSON);
const initialState = {
  advertiserSearchName: '',
  // favorites:            OrderedSet.of(...favoritesFetch()),
  advertisers:          allAdvertisers,
};

const rootReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case ADVERTISERS_FETCH:
      console.log("fetching advertisers");
      return {
        ...state,
        advertisers: allAdvertisers,
      };
    case ADVERTISERS_SEARCH:
      let { searchTerm } = action.payload;
      if (_.isEmpty(action.payload.searchTerm)) {
        return {
          ...state,
          q:           searchTerm,
          advertisers: allAdvertisers,
        }
      } else {
        return {
          ...state,
          q:           searchTerm,
          advertisers: _.filter(allAdvertisers, advertiser =>
            // console.log('filtering', advertiser);
            _.includes(_.toLower(_.get(advertiser, 'email')), searchTerm) ||
            _.includes(_.toLower(_.get(advertiser, 'full_name')), searchTerm))
        };
      }
    case FAVORITES_ADD:
      let favorite = action.payload.advertiser.set('isFavorite', true);
      state        = state.update('favorites', favorites => favorites.add(favorite));
      state        = state.updateIn(['advertisers', action.payload.index],
        advertiser => advertiser.set('isFavorite', true));
      return state;
    case FAVORITES_REMOVE:
      return state.updateIn(['favorites'],
        favorites => favorites.delete(action.payload.favorite));
    default:
      return state;
  }
};

export default createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
