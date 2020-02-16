import { combineReducers } from 'redux'
import { State, example } from './reducers/examples'

export default combineReducers<State>({
  example,
})
