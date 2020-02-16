import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './rootReducer'
import { State as ExampleState } from './reducers/examples'

export type RootState = ExampleState

const middleware = applyMiddleware(thunk, createLogger())

export default createStore(rootReducer, middleware)
