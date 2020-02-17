// Import redux types
import { ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import axios from 'axios'

// Import Character Typing
import { Character, CharacterState } from '../reducers/characterReducer'

// Create Action Constants
export enum CharacterActionTypes {
  SET_FETCHING = 'set fetching',
  SET_FETCHED = 'set fetched',
  SET_FETCH_ERROR = 'set fetch error',
}

// Interface for Get All Action Type
export interface CharacterGettingAction {
  type: CharacterActionTypes.SET_FETCHING;
  isLoading: boolean;
}

export interface CharacterGetAllAction {
  type: CharacterActionTypes.SET_FETCHED;
  characters: Character[];
}

export interface CharacterGetErrorAction {
  type: CharacterActionTypes.SET_FETCH_ERROR;
  error: Error;
}

export type CharacterAction = CharacterGettingAction | CharacterGetAllAction | CharacterGetErrorAction

const fetching = (isLoading: boolean) => ({
  type: CharacterActionTypes.SET_FETCHING,
  isLoading,
})

const fetchedData = (characters: CharacterState) => ({
  characters,
  type: CharacterActionTypes.SET_FETCHED,
})

const fetchedError = (error: Error) => ({
  error,
  type: CharacterActionTypes.SET_FETCH_ERROR,
})

export const getAllCharacters: ActionCreator<ThunkAction<
  Promise<any>,
  CharacterState,
  null,
  CharacterGetAllAction
>> = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetching(true))
    try {
      const response = await axios.get('https://swapi.co/api/people/')
      dispatch(fetchedData(response.data.results))
    } catch (err) {
      dispatch(fetchedError(err))
    }
  }
}
