import { combineReducers } from 'redux'
import { State, accessToken } from './reducers/examples'

export default combineReducers<State>({
  accessToken,
})
