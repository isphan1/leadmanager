import React,{useState} from 'react'
import {connect} from 'react-redux'
import { authUser } from '../../redux'
import {Redirect} from 'react-router-dom'

function Login({loginUser,isAuthenticate}){

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const submitLogin = e =>{
        e.preventDefault();
        loginUser({'username':username,'password':password})
    }

    
    if(isAuthenticate){
           return  <Redirect to="/" />
        }

    return (       
        <div>
            <h3 className="form-group col-md-6 offset-md-3">Login</h3>

            <form onSubmit={submitLogin}>
                <div className="form-group col-md-6 offset-md-3">
                    <label htmlFor="name">Username</label>
                    <input type="text"  value={username} onChange={e => setUsername(e.target.value)} className="form-control" id="name"/>
                </div>
                <div className="form-group col-md-6 offset-md-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp"/>
                </div>
                <div className="form-group col-md-6 offset-md-3">
                <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form> 
        </div>
    )
}


const mapStateToProps = state =>({
    isAuthenticate:state.auth.isAuthenticate
})

const mapDispatchToProps = dispatch =>({
    loginUser: (user) => dispatch(authUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(Login)
