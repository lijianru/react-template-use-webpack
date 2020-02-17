import { Reducer } from 'redux'
import { Action, ExampleActionTypes } from '../actions/exampleAction'

export interface Example {
  id: string;
}

export interface ExampleState {
  readonly isLoading: boolean;
  readonly examples: Example[];
  readonly error?: Error;
}

const initialExampleState: ExampleState = {
  isLoading: false,
  examples: [],
}

export const exampleReducer: Reducer<ExampleState, Action> = (
  state = initialExampleState,
  action
) => {
  switch (action.type) {
    case ExampleActionTypes.SET_FETCHING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case ExampleActionTypes.SET_FETCHED:
      return {
        ...state,
        examples: action.examples
      }
    case ExampleActionTypes.SET_FETCH_ERROR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}
