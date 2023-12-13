import React, { Component } from "react";
import { connect } from "react-redux";
import {} from "react-router-dom";
import Input from "../general/Input";
import { register } from "../../actions/authActions";

class Register extends Component { 
    constructor() {
        super()
        this.state={
            name:"",
            email:"",
            password:"",
            password2:"",
        }
    }
    onChange = (e) => {
        console.log(e);
    }
    render() {
        const {name, password, password2, email} = this.state
        return (
          <div className="container">
            <h1 className="large text-primary">Register</h1>
            <p className="lead">
                <i className="fas fa-user"></i>Create Your Account
            </p>
            <div className="form">
                <input
                    name="name"
                    type="text"
                    placeholder="Enter
                    Name" value={name}
                    onChange={this.onChange}
                />
            </div>
            <div className="form">
                <input 
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.onChange}
                />
            </div>
            <div className="form">
                <input 
                    name="passward"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={this.onChange}
                />
            </div>
            <div className="form">
                <input 
                    name="password2"
                    type="password"
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={this.onChange}
                />
            </div>
            <button className="btn btn-primary">Register</button>
        </div>
        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { register })(
    (Register)
    );