import React, { Component } from 'react'
import {Link } from "react-router-dom"
import Input from "../general/Input"
import {connect} from "react-redux";
import {message} from 'antd';
import { login } from '../../actions/authActions';
 class Login extends Component {
    constructor(){
        super()
        this.state={

            email:"",
            password2:"",
       }
       this.onChange = this.onChange.bind(this);
       this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
      console.log(nextProps)
      if (nextProps  && nextProps.errors && nextProps.errors.length > 0){
        nextProps.auth.errors.forEach(error=>{
            message.error(error.msg); 
        })
    }

    if (nextProps.isAuthenticated === true){
        message.success("Thank you for signing up");
        const { navigate } = this.props;
        console.log(this.state);
        setTimeout(()=>this.props.navigate('/'), 3000);
      }
    }
    onChange(e){
      this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
      const {email, password} = this.state;
      const user = {
        email, password
      };
      this.props.login(user);
      console.log(this.props)
    }
  render() {
    return (
      <div className='container'> 
        <h1 className='large text-primary'>Sign in</h1>
        <p className='lead'>
            <i className='fas fa-user'></i> Sign Into Your Account
        </p>

        <div className='form'>
            <Input type="email"
                  name="email"
                placeholder="Enter Email"
                value = {this.state.email}
                onChange={this.onChange}>
             </Input>
        </div>

        <div className='form'>
            <Input type="password"
                name = "password"
                placeholder="Enter Password" 
                value = {this.state.password} 
                onChange={this.onChange}>
            </Input>
        </div>


        <button className='btn btn-primary' onClick={this.onSubmit}>Sign In </button>
        <p className='my-1'> Don't Have an account? <Link to='/register'>Sign Up</Link></p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { login})(Login);