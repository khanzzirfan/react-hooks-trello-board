import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import lists from './lists'

const rootReducer = history =>
  combineReducers({
    lists,
    router: connectRouter(history)
  })

export default rootReducer
