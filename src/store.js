import {createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';
import reducer from './reducers'

//installize middleware with redux
const middleware = applyMiddleware(reduxThunk);

//redux devtools integrate
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancer(middleware)

export default createStore(reducer, enhancer)

