import {GET_LEADS,GET_ERRORS,GET_REQUEST,DELETE_LEAD,UPDATE_LEAD, CREATE_LEAD} from './leadTypes'
import axios from 'axios'
import {ERROR_ALERT,MESSAGE_ALERT,CLEAR_MESSAGE,CLEAR_ALERT} from "../alert/alertTypes"
import { tokenConfig } from '../../components/common/tokenConfig'

export const getRequest = () =>{
    return{
        type:GET_REQUEST,
    }
}

export const getLeads = leads =>{
    return{
        type:GET_LEADS,
        payload:leads
    }
}

export const createLead = leads =>{
    return{
        type:CREATE_LEAD,
        payload:leads
    }
}

export const getErros = error =>{
    return{
        type:GET_ERRORS,
        payload:error
    }
}


export const deleteLead = id =>{
    return{
        type:DELETE_LEAD,
        payload:id
    }
    
}


export const fetchLead = (dispatch,getState) =>{

    dispatch(getRequest())
    
    const token = tokenConfig(getState)
    
    axios({
        method:"get",
        url:"http://127.0.0.1:8000/api/lead/",
        headers:{
            "content-type": "application/json",
            "Authorization": "JWT "+ token
        }

        })
    .then(res=>{
        dispatch(getLeads(res.data))
    })
    .catch(err=>{
        dispatch(getErros("Something went wrong."))
    })
}

export const destroyLead = (id) => (dispatch,getState) =>{
    
    const token = tokenConfig(getState)


    dispatch({
        type:CLEAR_ALERT
    })

    dispatch({
        type:CLEAR_MESSAGE
    })

    setTimeout(function(){ 
        axios({
            method: 'delete',
            url: `http://127.0.0.1:8000/api/lead/${id}`,
            headers: {
            "content-type": "application/json",
            "Authorization": "JWT "+ token
            }
        })
        .then(res=>{

            dispatch(deleteLead(id))
            
            const message ={
                msg:{'delete':"lead successfully removed."},
                status:res.status
            }
            
            dispatch({
                type:MESSAGE_ALERT,
                payload:message
            })
        })

        .catch(err=>{
            console.log(err.message)
        })      

     }, 100);

      
}

export const newLead = (lead) => (dispatch,getState) =>{
    
    const token = tokenConfig(getState)

    dispatch({
        type:CLEAR_ALERT
    })

    dispatch({
        type:CLEAR_MESSAGE
    })


    axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/lead/',
        data: lead,
        headers: {
          "content-type": "application/json",
          "Authorization": "JWT "+ token
        }
      })
    .then(res=>{

        const message ={
            msg:{'create':"lead successfully created."},
            status:res.status
        }
        
        dispatch({
            type:MESSAGE_ALERT,
            payload:message
        })

        dispatch(createLead(res.data))

    })
    .catch(err=>{

        const errors ={
            msg:err.response.data,
            status:err.response.status
        }

        dispatch({
            type:ERROR_ALERT,
            payload:errors
        })
    })
}


