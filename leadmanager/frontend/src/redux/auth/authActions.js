import {AUTH_SUCCESS,AUTH_CLEAR,AUTH_REQUEST} from './authTypes'
import {ERROR_ALERT,MESSAGE_ALERT,CLEAR_MESSAGE,CLEAR_ALERT} from "../alert/alertTypes"
import axios from 'axios'
import getCookie from '../../components/common/cookie'
import { tokenConfig } from '../../components/common/tokenConfig'

export const authUser = (user) => dispatch =>{

    dispatch({
        type:AUTH_REQUEST,
    })

    dispatch({
        type:CLEAR_ALERT
    })

    dispatch({
        type:CLEAR_MESSAGE
    })


    axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/login/',
        data: user,
        headers: {
          "content-type": "application/json",
        }
    })
    .then(res=>{        
        dispatch({
            type:AUTH_SUCCESS,
            payload:res.data
        })

        dispatch({
            type:MESSAGE_ALERT,
            payload:{'msg':{'success':'You successfully logged in'},status:200}
        })
    })
    .catch(error=>{

        dispatch({
            type:ERROR_ALERT,
            payload:error.response.data
        })

        dispatch({
            type:AUTH_CLEAR
        })
    
    })
}

export const logoutUser = () => dispatch =>{
    localStorage.removeItem('token')
        dispatch({
        type:AUTH_CLEAR
    })

    dispatch({
        type:MESSAGE_ALERT,
        payload:{'msg':{'logout':'You successfully logout'},status:200}
    })    

 }


export const registerUser = (user) => dispatch =>{

    dispatch({
        type:CLEAR_ALERT
    })

    dispatch({
        type:CLEAR_MESSAGE
    })

    dispatch({
        type:AUTH_REQUEST,
    })
    
    axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/register/',
        data: user,
        headers: {
          "content-type": "application/json",
        }
    })
    .then(res=>{

        const data = res.data['token_response']

        dispatch({
            type:AUTH_SUCCESS,
            payload:data
        })

        dispatch({
            type:MESSAGE_ALERT,
            payload:{'msg':{'newUser':'User creation successful'},status:200}
        })
    })
    .catch(error=>{

        dispatch({
            type:ERROR_ALERT,
            payload:{'msg':error.response.data}
        })
        
        dispatch({
            type:AUTH_CLEAR
        })
    })
}


export const tokenRefresh = () => (dispatch,getState) =>{

    var token =  tokenConfig(getState)

        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/jwt/refresh',
            data: {token},
            headers: {
            "content-type": "application/json",
            }
        })
        .then(res=>{
            dispatch({
                type:AUTH_SUCCESS,
                payload:res.data
            })
        })
        .catch(error=>{
            dispatch({
            type:AUTH_CLEAR
        })
    })
 } 
 
