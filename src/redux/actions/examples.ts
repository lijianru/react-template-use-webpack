import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import axios, { AxiosResponse } from 'axios'

export const SET_FETCHING = 'set fetching'
export const SET_FETCHED = 'set fetched'
export const SET_FETCH_ERROR = 'set fetch error'

// Action Definition
export interface SetFetching {
  type: typeof SET_FETCHING;
  isFetching: boolean;
}
export interface SetFetched {
  type: typeof SET_FETCHED;
  payload: string;
}
export interface SetFetchError {
  type: typeof SET_FETCH_ERROR;
  error: Error;
}

// Union Action Types
export type Action = SetFetching | SetFetched | SetFetchError

// Action Creators
export const setFetching = (isFetching: boolean): SetFetching => {
  return { type: SET_FETCHING, isFetching }
}
export const setFetched = (payload: string): SetFetched => {
  return { type: SET_FETCHED, payload }
}
export const setFetchError = (error: Error): SetFetchError => {
  return { type: SET_FETCH_ERROR, error }
}

export const fetchData = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
  dispatch(setFetching(true))

  try {
    const data: AxiosResponse<string> = await axios.get('https://cnodejs.org/api/v1/topics')
    dispatch(setFetched(data.data))
  } catch (err) {
    dispatch(setFetchError(err))
  }
}
