import React,{useState} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { registerUser } from '../../redux'

function Register({createUser,isAuthenticate}) {

    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirm_password,setConfirmPassword] = useState('')

    const submitRegister = e =>{
        e.preventDefault();
        
        const user = {username,email,password,confirm_password}
        const user_obj = createUser(user)
    }


    if(isAuthenticate){
        return <Redirect to="/" />
    }

    return (
        <div>
            <h3 className="form-group col-md-6 offset-md-3">Register</h3>

            <form onSubmit={submitRegister}>
                    <div className="form-group col-md-6 offset-md-3">
                        <label htmlFor="name">username</label>
                        <input type="text" value={username}  onChange={e => setUsername(e.target.value)}  className="form-control" id="name"/>
                    </div>
                    <div className="form-group col-md-6 offset-md-3">
                        <label htmlFor="email">Email address</label>
                        <input type="email" value={email}  onChange={e => setEmail(e.target.value)}  className="form-control" id="email" aria-describedby="emailHelp"/>
                    </div>
                    <div className="form-group col-md-6 offset-md-3">
                        <label htmlFor="password">Password</label>
                        <input type="password"  value={password}  onChange={e => setPassword(e.target.value)}  className="form-control" id="password" aria-describedby="emailHelp"/>
                    </div>
                    <div className="form-group col-md-6 offset-md-3">
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input type="password" value={confirm_password}  onChange={e => setConfirmPassword(e.target.value)}  className="form-control" id="confirm_password" aria-describedby="emailHelp"/>
                    </div>
                    <div className="form-group col-md-6 offset-md-3">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>       
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticate:state.auth.isAuthenticate
})

const mapDispatchToProprs = dispatch =>({
    createUser : (user) => dispatch(registerUser(user))
})

export default connect(mapStateToProps,mapDispatchToProprs)(Register)
