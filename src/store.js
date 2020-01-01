import { createStore } from 'redux';

import faker from 'faker';
import { get, isEmpty, toLower, includes, filter, times, remove } from 'lodash';
import advertisersJSON from './advertisers_json'


import { Map, List, OrderedSet } from 'immutable';

import {
  ADVERTISERS_FETCH,
  ADVERTISERS_SEARCH,
  FAVORITE_TOGGLE, FAVORITES_REMOVE
} from "./actions";

// let advertisersFetch = () => (times(20, () => {
//   return Map({
//     id:            faker.random.uuid(),
//     email:         faker.internet.email(),
//     fullName:      faker.fake('{{name.lastName}} {{name.firstName}}'),
//     avatarUrl:     faker.image.avatar(),
//     lastSuperTime: null,
//   })
// }));

let favoritesFetch = () => (times(2, () => {
  return Map({
    id:            faker.random.uuid(),
    email:         faker.internet.email(),
    fullName:      faker.fake('{{name.lastName}} {{name.firstName}}'),
    avatarUrl:     faker.image.avatar(),
    isFavorite:    true,
    lastSuperTime: faker.date.recent(),
  })
}));

let allAdvertisers = _.map(JSON.parse(advertisersJSON), ad => ({
  ...ad,
  favorite: _.get(ad, 'favorite', false),
}));

const initialState = {
  q:           '',
  // favorites:            OrderedSet.of(...favoritesFetch()),
  advertisers: allAdvertisers,
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
      if (isEmpty(action.payload.searchTerm)) {
        return {
          ...state,
          q:           searchTerm,
          advertisers: allAdvertisers,
        }
      } else {
        return {
          ...state,
          q:           searchTerm,
          advertisers: filter(allAdvertisers, advertiser =>
            // console.log('filtering', advertiser);
            includes(toLower(get(advertiser, 'email')), searchTerm) ||
            includes(toLower(get(advertiser, 'full_name')), searchTerm))
        };
      }
    case FAVORITE_TOGGLE:
      let { advertiser }  = action.payload;
      let { advertisers } = state;
      advertiser.favorite = !get(advertiser, 'favorite', false);
      remove(advertisers, ad => ad.id === advertiser.id);
      return {
        ...state,
        advertisers: [
          advertiser,
          ...advertisers,
        ],
      };
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
