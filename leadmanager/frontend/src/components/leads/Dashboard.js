import React, { Component,Fragment } from 'react'
import {connect} from 'react-redux'
import {tokenRefresh} from '../../redux/'
import Forms from './Forms'
import Leads from './Leads'

class Dashboard extends Component {

    constructor(props) {
        super(props)

        const data = null
    
    }

    componentDidMount(){
        
        // var expireTime = new Date(this.props.auth.expires).getTime()
        
        // var currentTime = new Date().getTime()

            this.data = setInterval(() => {
                
                if(this.props.auth.user !== null && this.props.auth.isAuthenticate){               

                this.props.tokenRefresh()

                }
            }, 60000);
    }

    // componentDidUpdate(prevState){
    //     console.log(prevState.auth)
    //     if(prevState.auth.expires !== this.props.auth.expires){
    //         clearInterval(this.data)
    //     }
    // }

    // componentWillUnmount(){
    //     clearInterval(this.data)
    // }
    

    render() {
        return (
            <Fragment>
                <Forms/>
                <Leads/>
            </Fragment>
        )
    }
}

const mapStateToProps = state =>({
    auth:state.auth
  })

export default connect(mapStateToProps,{tokenRefresh})(Dashboard)
