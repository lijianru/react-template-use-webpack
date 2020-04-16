import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

// 导入 reducers and state type
import { exampleReducer, ExampleState } from './reducers/exampleReducer';
import { loginReducer, LoginState } from './reducers/loginReducer';

// 为App创建一个State type
export interface AppState {
  exampleState: ExampleState;
  loginState: LoginState;
}

// 创建 root reducer
const rootReducer = combineReducers<AppState>({
  exampleState: exampleReducer,
  loginState: loginReducer,
});

const composeEnhancers = composeWithDevTools({
  // 在这里指定名称，actionsBlacklist, actionsCreators和其他选项如果需要
});

// 创建store
export default function configureStore(): Store<AppState> {
  return createStore(
    rootReducer,
    undefined,
    composeEnhancers(applyMiddleware(thunk, createLogger()))
  );
}
