import React, { Component,Fragment } from 'react'
import {withAlert} from 'react-alert'
import {connect} from 'react-redux'
class Alerts extends Component {

    componentDidUpdate(prevState){
        const {errors,messages,alert} = this.props

        if(errors !== prevState.erros){

            if(errors.msg.username)alert.show(`Useranme: ${errors.msg.username}`)
            if(errors.msg.name)alert.show(`Name: ${errors.msg.name}`)
            if(errors.msg.email)alert.show(`Email: ${errors.msg.email}`)
            if(errors.msg.failed)alert.show(`Login Failed: ${errors.msg.failed}`)
            if(errors.msg.password)alert.show(`Password: ${errors.msg.password}`)


        }

        if(messages !== prevState.messages){
            if(messages.msg.create)alert.show(`ITEM CREATE: ${messages.msg.create}`)
            if(messages.msg.delete)alert.show(`ITEM REMOVE: ${messages.msg.delete}`)
            if(messages.msg.success)alert.show(`Login Success: ${messages.msg.success}`)
            if(messages.msg.newUser)alert.show(`NEW USER: ${messages.msg.newUser}`)

        }
    }

    render() {
        return <Fragment/>        
    }
}
const mapStateToProps = state =>{
    return{
        errors:state.errors,
        messages:state.messages
    }
}

export default connect(mapStateToProps)(withAlert()(Alerts))
