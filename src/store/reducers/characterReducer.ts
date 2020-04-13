import { Reducer } from 'redux';
import { CharacterAction, CharacterActionTypes } from '../actions/characterAction';

export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface CharacterState {
  readonly isLoading: boolean;
  readonly characters: Character[];
  readonly error?: Error;
}

const initialCharacterState: CharacterState = {
  isLoading: false,
  characters: [],
};

export const characterReducer: Reducer<CharacterState, CharacterAction> = (
  state = initialCharacterState,
  action
) => {
  switch (action.type) {
    case CharacterActionTypes.SET_FETCHING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case CharacterActionTypes.SET_FETCHED: {
      return {
        ...state,
        characters: action.characters,
      };
    }
    case CharacterActionTypes.SET_FETCH_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
};
