import { createStore, applyMiddleware, compose } from 'redux';
import { usersReducer } from './reducers/usersReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(usersReducer, composeEnhancers(applyMiddleware(thunk)));