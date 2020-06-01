import {ERROR_ALERT,CLEAR_ALERT} from './alertTypes'

const initialState = {
    msg: {},
    status:null
}

const errorReducer = (state=initialState,action) =>{

    switch (action.type) {
        case ERROR_ALERT:
            return{
                msg:action.payload.msg,
                status:action.payload.status
            }    
        case CLEAR_ALERT:
            return{
                msg:{},
                status:null
            } 
        default:
            return state;
    }
}

export default errorReducer