import React, { Component } from 'react'
import Input from '../general/Input';
import {connect} from "react-redux";
import {message} from 'antd';
import {withRouter} from "react-router-dom";
import { register } from '../../actions/authActions';


 class Register extends Component {
    constructor(){
        super()
        this.state={
            name:"",
            email:"",
            password:"",
            password2:"",
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps  && nextProps.auth.errors && nextProps.auth.errors.length > 0){
            nextProps.auth.errors.forEach(error=>{
                message.error(error.msg); 
            })
        }

        if (nextProps.auth.isAuthenticated === true){
            message.success("Thank you for signing up");
            const { navigate } = this.props;
            console.log(nextProps);
            setTimeout(()=>navigate('/'), 3000);
            

            // Example: Navigate to a new route after 3000 milliseconds
            // setTimeout(() => navigate('/new-route'), 3000);
        }
          
    }
    onChange(e){
        // console.log(e.target);
        this.setState({[e.target.name]: e.target.value});
        // console.log(this.props)
    }

    onSubmit(){
        let role = this.props.location.search.split("?role=");
        role = role[role.length - 1];
        console.log(this.props)
        const {name, email, password} = this.state;
        const newUser = {
            name,
            email,
            password,
            role,
        }
        // console.log(state)

        if (password === this.state.password2){
            this.props.register(newUser);
        }
        else{
           message.error("passwords must match")
        }
    }
  render() {
    const {name, password, password2, email} =  this.state
    return (
      <div className='container'>
        <h1 className='large text-primary'>Register</h1>
        <p className='lead'><i className='fas fa-user'></i>Create Your Account</p>
        <div className='form'>
            <Input
                name="name" 
                type="text"
                placeholder="Enter Name"
                value={name} 
                onChange={this.onChange}
                >
            </Input>
        </div>

        <div className='form'>
            <Input 
                name="email"
                type="email" 
                placeholder="Enter Email" 
                value={email} 
                onChange={this.onChange}> 
            </Input>
        </div>
        <div className='form'>
            <Input
                name="password" 
                type="password" 
                placeholder="Enter Password" 
                value={password} 
                onChange={this.onChange}> 
            </Input>
        </div>
        <div className='form'>
            <Input
                name="password2" 
                type="password" 
                placeholder="Confirm Password" 
                value={password2} 
                onChange={this.onChange}>
            </Input>
        </div>

        <button className='btn btn-primary' onClick={this.onSubmit}>Register</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default connect(mapStateToProps, { register})(Register);
  