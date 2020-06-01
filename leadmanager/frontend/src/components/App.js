import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Header from './layout/Header';
import Dashboard from './leads/Dashboard';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import {Provider,connect} from 'react-redux'
import {store} from '../redux/store'
import {persistor} from '../redux/store'

import Alerts from './layout/Alerts';
import Login from './accounts/Login';
import Register from './accounts/Register';
import PropTypes from 'prop-types';
import PrivateRoute from './common/PrivateRoute';
import { PersistGate } from 'redux-persist/integration/react'
import NotFound from './common/NotFound';


const options = {
    timeout:3000,
    position:"top right"
}

class App extends Component {
    
    render(){
        return(
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                <AlertProvider template={AlertTemplate}{...options}>
                    <Router>
                        <Fragment>
                            <Header/>
                                <Alerts/>
                                <div className="container">
                                <Switch>
                                    <PrivateRoute exact path="/" component={Dashboard} />
                                    <Route exact path="/register" component={Register} />
                                    <Route exact path="/login" component={Login} />
                                    {/* <Route component={NotFound}/> */}
                                </Switch>
                                </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
                </PersistGate>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

