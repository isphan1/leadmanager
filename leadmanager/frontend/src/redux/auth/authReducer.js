import {AUTH_SUCCESS,AUTH_CLEAR,AUTH_REQUEST} from './authTypes'


const initialState = {
    token:null,
    isAuthenticate:false,
    isLoading:false,
    user:null,
    expires:null
}

const authReducer = (state=initialState,action)=>{

    switch(action.type){

        case AUTH_REQUEST:
            return {
                ...state,
                isLoading:true
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                isLoading:false,
                token:action.payload['token'],
                user:action.payload['user'],
                expires:action.payload['expires'],
                isAuthenticate:true

            }
        case AUTH_CLEAR:
            return {
                ...state,
                token:null,
                isAuthenticate:false,
                isLoading:false,
                user:null,
                expires:null
            }
        default:
            return state
    }
}

export default authReducer