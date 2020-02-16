import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './rootReducer'

const middleware = applyMiddleware(thunk, createLogger())

export default createStore(rootReducer, middleware)
