import { ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { characterService } from '../../utils/service/api'

// action type 的枚举
import { Character, CharacterState } from '../reducers/characterReducer'

// Create Action Constants
export enum CharacterActionTypes {
  SET_FETCHING = 'set fetching',
  SET_FETCHED = 'set fetched',
  SET_FETCH_ERROR = 'set fetch error',
}

// 各种Action的类型
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

// Action的类型
export type CharacterAction = CharacterGettingAction | CharacterGetAllAction | CharacterGetErrorAction

// 创建action
const fetching = (isLoading: boolean): CharacterGettingAction => ({
  type: CharacterActionTypes.SET_FETCHING,
  isLoading,
})

const fetchedData = (characters: Character[]): CharacterGetAllAction => ({
  characters,
  type: CharacterActionTypes.SET_FETCHED,
})

const fetchedError = (error: Error): CharacterGetErrorAction => ({
  error,
  type: CharacterActionTypes.SET_FETCH_ERROR,
})

export const getAllCharacters: ActionCreator<ThunkAction<
  Promise<void>,
  CharacterState,
  null,
  CharacterGetAllAction
>> = () => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(fetching(true))
    try {
      const response = await characterService()
      dispatch(fetchedData(response.results))
    } catch (err) {
      dispatch(fetchedError(err))
    }
  }
}
