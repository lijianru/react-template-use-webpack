import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

// 导入 reducers and state type
import { characterReducer, CharacterState } from './reducers/characterReducer'
import { exampleReducer, ExampleState } from './reducers/exampleReducer'

// 为App创建一个State type
export interface AppState {
  characterState: CharacterState;
  exampleState: ExampleState;
}

// 创建 root reducer
const rootReducer = combineReducers<AppState>({
  characterState: characterReducer,
  exampleState: exampleReducer,
})

// 创建store
export default function configureStore(): Store<AppState> {
  return createStore(rootReducer, undefined, applyMiddleware(thunk, createLogger()))
}
