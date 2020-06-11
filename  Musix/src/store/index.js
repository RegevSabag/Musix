import {createStore, combineReducers, applyMiddleware} from 'redux';
// Reducers
import musicReducer from './reducers/music';
// Middleware
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const middleware = [thunk];

const rootReducer = combineReducers({musicReducer});

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);
