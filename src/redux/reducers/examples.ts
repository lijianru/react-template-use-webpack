import { LOADING, LOADED, ERROR } from '../actions/examples'

const INIT_STATE = {}

export function examples(state: any = INIT_STATE, action: any) {
  switch (action.type) {
    case LOADING:
      return state
    case LOADED:
      return state
    case ERROR:
      return state
    default:
      return state
  }
}
