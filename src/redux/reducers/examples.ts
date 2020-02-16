import { Action, SET_FETCHING, SET_FETCHED, SET_FETCH_ERROR } from '../actions/examples'
// States' definition
export interface FetchDataType {
  isFetching: boolean;
  payload?: string;
  error?: Error;
}
export interface State {
  accessToken: FetchDataType;
}

export const accessToken = (state: FetchDataType = { isFetching: false }, action: Action): FetchDataType => {
  switch (action.type) {
    case SET_FETCHING:
      return { ...state, isFetching: action.isFetching }
    case SET_FETCHED:
      return { ...state, payload: action.payload }
    case SET_FETCH_ERROR:
      return { ...state, error: action.error }
    default:
      return state
  }
}
