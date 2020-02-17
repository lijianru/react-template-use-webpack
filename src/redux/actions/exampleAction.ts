import { ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import axios from 'axios'

import { Example, ExampleState } from '../reducers/exampleReducer'

// action type 的枚举
export enum ExampleActionTypes {
  SET_FETCHING = 'set fetching',
  SET_FETCHED = 'set fetched',
  SET_FETCH_ERROR = 'set fetch error'
}

// 各种Action的类型
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

// Action的类型
export type ExampleAction = SetFetchingAction | SetFetchedAction | SetFetchErrorAction

// 创建action
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
  Promise<void>,
  ExampleState,
  null,
  SetFetchedAction
  >> = () => {
    return async (dispatch: Dispatch): Promise<void> => {
      dispatch(setFetching(true))
      try {
        const response = await axios.get('https://cnodejs.org/api/v1/topics')
        dispatch(setFetched(response.data.data))
      } catch (err) {
        dispatch(setFetchError(err))
      }
    }
  }
