import React, { useState } from 'react';
import './Login.css'
import {Link} from "react-router-dom";


function Login() {

const [email, setEmail] = useState ('');
const [password, setPassword] = useState ('');
const signIn = e => {
  e.preventDefault()
}

const register = e => {
  e.preventDefault()
}

  return (
    <div className = 'login'>
      <Link to = '/'> 
      <img className = 'login_logo' src = 'https://thumbs.dreamstime.com/b/amazon-logo-amazon-logo-white-background-vector-format-avaliable-124289859.jpg' />
      </Link>

      <div className = 'login_container'> 
        <h1> Sign-in</h1>
        <form> 
          <h5>E-mail</h5>
          <input type = 'text' value = {email} onChange = {e => setEmail(e.target.value)}/>
          <h5>Password</h5>
          <input type = 'password'/>

          <button type = 'submit' onClick = {register} className = 'login_registerButton' value = {password} onChange = {e => setPassword(e.target.value)}> 
            Sign In
          </button>
          </form>
          <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please see our Privacy Notice,
            Cookies Notice and our Interest-Based Ads Notice.
          </p>

          <button type = 'submit' onClick = {signIn} className ='login_signInButton'>Create your Amazon Account</button>
      </div>
    </div>
  )
}

export default Login