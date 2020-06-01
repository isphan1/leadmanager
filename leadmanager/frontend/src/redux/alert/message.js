import {MESSAGE_ALERT,CLEAR_MESSAGE} from './alertTypes'

const initialState = {
    msg: {},
    status:null
}

const messageReducer = (state=initialState,action) =>{

    switch (action.type) {
        case MESSAGE_ALERT:
            return{
                msg:action.payload.msg,
                status:action.payload.status
            }
        case MESSAGE_ALERT:
            return{
                msg:{},
                status:null
                }      
        default:
            return state;
    }
}

export default messageReducer