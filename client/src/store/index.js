import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userContentReducer from './reducers/userContent'
import userCommentReducer from './reducers/userComment'

const rootReducer = combineReducers({
  userContentReducer,
  userCommentReducer
})

let store = createStore(rootReducer, applyMiddleware(thunk))

export default store