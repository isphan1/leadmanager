import {combineReducers} from 'redux'
import leadReducer from './leads/leadReducer'
import errorReducer from './alert/error'
import messageReducer from './alert/message'
import authReducer from './auth/authReducer'

const rootReducer = combineReducers({
    leads:leadReducer,
    errors:errorReducer,
    messages:messageReducer,
    auth:authReducer    
})

export default rootReducer