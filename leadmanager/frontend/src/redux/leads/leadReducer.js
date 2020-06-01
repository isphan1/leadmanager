import {GET_LEADS,GET_REQUEST,GET_ERRORS,DELETE_LEAD,UPDATE_LEAD,CREATE_LEAD} from './leadTypes'

const initialState = {
    loading:false,
    leads:[],
    error:''
}

const leadReducer = (state=initialState , action) =>{
    switch(action.type){

        case GET_REQUEST:
            return{
                ...state,
                loading:true
            }

        case GET_LEADS:
            return {
                loading:false,
                leads:action.payload,
                error:''
            }

        case GET_ERRORS:
            return{
                loading:false,
                leads:[],
                error:action.payload
            }
        case DELETE_LEAD:
            return{
                loading:false,
                leads:state.leads.filter(lead => lead.id !== action.payload),
                error:""
            }
        case CREATE_LEAD:
            return{
                loading:false,
                leads:[...state.leads,action.payload],
                error:action.payload
            }

        default:
            return state
    }
}

export default leadReducer