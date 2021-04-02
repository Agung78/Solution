import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userContentReducer from './reducers/userContent'

const rootReducer = combineReducers({
  userContentReducer
})

let store = createStore(rootReducer, applyMiddleware(thunk))

export default store