import React from 'react'
import {Link} from 'react-router-dom'


function NotFound() {
    let setPosition = {
        position:"absolute",
        top:"40%",
        left:"50%",
        textAlign:"center",
        transform:`translate(-50%,-50%)`
    }

    return (
        <div style={setPosition}>
            <h1>PAGE NOT FOUND</h1>
            <h3>There's nothing to see here  <Link to="/">GO BACK</Link></h3>
        </div>
    )
}

export default NotFound
