import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import ideals from './ideals';
// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  ideals,
  routing,
});

export default rootReducer;
