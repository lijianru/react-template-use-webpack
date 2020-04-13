import { Reducer } from 'redux';
import { ExampleAction, ExampleActionTypes } from '../actions/exampleAction';

export interface Author {
  loginname: string;
  avatar_url: string;
}

export interface Example {
  id: string;
  author_id: string;
  tab: string;
  content: string;
  title: string;
  last_reply_at: string;
  good: boolean;
  top: boolean;
  reply_count: number;
  visit_count: number;
  create_at: string;
  author: Author;
}

export interface ExampleState {
  readonly isLoading: boolean;
  readonly examples: Example[];
  readonly error?: Error;
}

const initialExampleState: ExampleState = {
  isLoading: false,
  examples: [],
};

export const exampleReducer: Reducer<ExampleState, ExampleAction> = (
  state = initialExampleState,
  action
) => {
  switch (action.type) {
    case ExampleActionTypes.SET_FETCHING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case ExampleActionTypes.SET_FETCHED:
      return {
        ...state,
        examples: action.examples,
      };
    case ExampleActionTypes.SET_FETCH_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
