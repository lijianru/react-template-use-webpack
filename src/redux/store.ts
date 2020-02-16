import { createLogger } from 'redux-logger'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import example from './rootReducer'
import { State as ExampleState } from './reducers/examples'

export interface RootState {
  example: ExampleState;
}
export default createStore(combineReducers<RootState>({
  example,
}), applyMiddleware(thunk, createLogger()))
