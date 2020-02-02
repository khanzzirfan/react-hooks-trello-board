import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import counterReducer from './counter'
import lists from './lists'

const rootReducer = history =>
  combineReducers({
    counter: counterReducer,
    lists,
    router: connectRouter(history)
  })

export default rootReducer
