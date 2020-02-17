import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

// Import reducers and state type
import { characterReducer, CharacterState } from './reducers/characterReducer'
import { exampleReducer, ExampleState } from './reducers/exampleReducer'

// Create an interface for the application state
export interface AppState {
  characterState: CharacterState;
  exampleState: ExampleState;
}

// Create the root reducer
const rootReducer = combineReducers<AppState>({
  characterState: characterReducer,
  exampleState: exampleReducer,
})

// Create a configure store function of type `IAppState`
export default function configureStore(): Store<AppState, any> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk, createLogger()))
  return store
}
