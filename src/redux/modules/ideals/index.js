import algoliasearch from 'algoliasearch';
import { getAsyncType } from '../../middlewares/promiseMiddleware';

// const algolia = algoliasearch('1SY0GAJSAN', '85c6b04ab9ad451f9802d37f5365305b');
// // console.log(algolia);
const algolia = algoliasearch('1SY0GAJSAN', '85c6b04ab9ad451f9802d37f5365305b').initIndex('idealsSolutions');

const initialState = {
  algolia: [],
};

const SEARCH = 'ideals-solutions/ideals/SEARCH';
const SUCCESS = '_SUCCESS';
// const REQUEST = '_REQUEST';
// const FAILURE = '_FAILURE';


export default function (state = initialState, action) {
  switch (action.type) {
    case getAsyncType(SEARCH, SUCCESS): {
      return Object.assign({}, state, { algolia: action.res.hits });
    }
    default: {
      return state;
    }
  }
}

export const search = payload => {
  return {
    type: SEARCH,
    promise: algolia.search(payload)
  };
};
