import { createStore } from 'redux';

import faker from 'faker';
import _ from 'lodash';

import { Map, List, OrderedSet } from 'immutable';

import {
  ADVERTISERS_FETCH,
  ADVERTISERS_SEARCH,
  FAVORITES_ADD, FAVORITES_REMOVE
} from "./actions";

let advertisers = () => (_.times(20, () => {
  return Map({
    id:            faker.random.uuid(),
    email:         faker.internet.email(),
    fullName:      faker.fake('{{name.lastName}} {{name.firstName}}'),
    avatarUrl:     faker.image.avatar(),
    lastSuperTime: null,
  })
}));

let favorites = () => (_.times(2, () => {
  return Map({
    id:            faker.random.uuid(),
    email:         faker.internet.email(),
    fullName:      faker.fake('{{name.lastName}} {{name.firstName}}'),
    avatarUrl:     faker.image.avatar(),
    isFavorite:    true,
    lastSuperTime: faker.date.recent(),
  })
}));

const initialState = Map({
  advertiserSearch: null,
  favorites:        OrderedSet.of(...favorites()),
  advertisers:      List.of(...advertisers()),
});

const rootReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case ADVERTISERS_FETCH:
      return state.set('advertisers', state.get('advertisers').concat(advertisers()));
    case ADVERTISERS_SEARCH:
      if (_.isEmpty(action.advertiserSearchName)) {
        return state.set('advertisers', OrderedSet().concat(advertisers()))
      } else {
        return state.merge(Map({
          'advertiserSearchName': action.advertiserSearchName,
          'advertisers':          state.get('advertisers').filter((advertiser) => {
            // console.log('filtering', advertiser);
            return _.includes(_.toLower(advertiser['email']), action.advertiserSearchName) ||
              _.includes(_.toLower(advertiser['fullName']), action.advertiserSearchName)
          })
        }));
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
