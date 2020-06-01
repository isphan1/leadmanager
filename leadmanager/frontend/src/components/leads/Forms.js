import React, { Component,Fragment } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {newLead} from '../../redux/'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'

class Forms extends Component {

    // constructor(props) {
    //     super(props)
    
    //     this.state = {
    //          name:'',
    //          email:'',
    //          message:''
    //     }
    // }

    // static propTypes = {
    //     newLead:PropTypes.func.isRequired
    // }

    // onChangeHandel = e =>{
    //     this.setState({
    //         [e.target.name] : e.target.value
    //     })
    // }

    // createLead = e => {
    //     e.preventDefault();
    //     const {name,email,message} = this.state
    //     const lead = { name, email, message }
    //     this.props.newLead(lead)
    //     this.setState({
    //       name: '',
    //       email: '',
    //       message: '',
    //     })
    //     }

    initialValues = {
        name:'',
        email:'',
        message:''
    }

    validateSchema = Yup.object({
        name:Yup.string().required(),
        email:Yup.string().email('Invalid email').required(),
        message:Yup.string().required()
    })

    onSubmit = (values,{resetForm}) =>{   
        this.props.newLead(JSON.stringify(values))
        resetForm(this.initialValues)

    }
    
    btnFix = {
        padding:'.5rem 2.5rem .5rem 2.5rem',
        marginTop:'2.5rem',
        marginBottom:'2rem',
        marginLeft:'5rem', 
    }

    render() { 
        
        return (
                <Formik
                initialValues = {this.initialValues}
                validationSchema = {this.validateSchema}
                onSubmit = {this.onSubmit}
                >
                <Form>
                    <div className="row col-md-12">
                    <div className="form-group col-md-6">
                        <label htmlFor="name">Name</label>
                        <Field
                         type="text"
                          name="name" 
                          className="form-control" 
                          id="name"/>
                          <ErrorMessage name='name'/>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="email">Email address</label>
                        <Field 
                        type="email" 
                        name="email" 
                        className="form-control" 
                        id="email" 
                        />
                        <ErrorMessage name='email'/>
                    </div>
                    <div className="form-group col-md-8">
                        <label htmlFor="message">Message</label>
                        <Field
                        type="text" 
                        name="message" 
                        className="form-control"
                        id="message"/>
                        <ErrorMessage name='message'/>
                    </div>
                    <button type="submit" className="btn btn-primary" style={this.btnFix}>Submit</button>
                    </div>

                </Form>            
                </Formik>        
                )
    }
}

export default connect(null,{newLead})(Forms)
