import React, { Component } from 'react'
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { logoutUser } from '../../redux'

class Header extends Component {

  constructor(props) {
    super(props)
  
  }

  clearUser = () => {

    this.props.logoutUser()
    return <Redirect to="/login" />
  }
  
    render() {
    const {isAuthenticate,user} = this.props.auth

        const authLinks = (
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <span className="navbar-text mr-3">
              {user ? `Welcome ${user}`: ""}
            </span>
             <button onClick={this.clearUser} className="btn btn-small btn-primary">Logout</button>
            </ul>
)

          const guestLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            </ul>
          )

        return (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="/">Lead Managers</a>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            {isAuthenticate ? authLinks : guestLinks}
            </div>
            </div>
          </nav>
        )
    }
}

const mapStateToProps = state =>({
  auth:state.auth
})

export default connect(mapStateToProps,{logoutUser})(Header)
