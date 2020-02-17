import { ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import axios from 'axios'

import { Example, ExampleState } from '../reducers/exampleReducer'

export enum ExampleActionTypes {
  SET_FETCHING = 'set fetching',
  SET_FETCHED = 'set fetched',
  SET_FETCH_ERROR = 'set fetch error'
}

// Action Definition
export interface SetFetchingAction {
  type: ExampleActionTypes.SET_FETCHING;
  isLoading: boolean;
}
export interface SetFetchedAction {
  type: ExampleActionTypes.SET_FETCHED;
  examples: Example[];
}
export interface SetFetchErrorAction {
  type: ExampleActionTypes.SET_FETCH_ERROR;
  error: Error;
}

// Union Action Types
export type Action = SetFetchingAction | SetFetchedAction | SetFetchErrorAction

// Action Creators
export const setFetching = (isLoading: boolean): SetFetchingAction => {
  return {
    type: ExampleActionTypes.SET_FETCHING,
    isLoading
  }
}
export const setFetched = (examples: Example[]): SetFetchedAction => {
  return {
    type: ExampleActionTypes.SET_FETCHED,
    examples
  }
}
export const setFetchError = (error: Error): SetFetchErrorAction => {
  return {
    type: ExampleActionTypes.SET_FETCH_ERROR,
    error
  }
}

export const getAllExamples: ActionCreator<ThunkAction<
  Promise<any>,
  ExampleState,
  null,
  SetFetchedAction
  >> = () => {
    return async (dispatch: Dispatch) => {
      dispatch(setFetching(true))
      try {
        const response = await axios.get('https://cnodejs.org/api/v1/topics')
        dispatch(setFetched(response.data.data))
      } catch (err) {
        dispatch(setFetchError(err))
      }
    }
  }
