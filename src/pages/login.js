import React from "react";

import '../css/pages/auth.css';

import {validateForm} from '../components/functions';
import {validateInput} from '../components/functions';

function Login() {
  const loginUser = (e) => {
    validateForm(e);
  }
  return(
    <div className="body">
      <div className="div">
        <form action="#" method="post" className="form" onSubmit={(e) => loginUser(e)}>
          <h2>Sign In</h2>
          <p className="text">First time visiting our site?
            <a href="/register" className="navlink"> Click to register</a>
          </p>
          <p>
            <label htmlFor="email" className="floatLabel">Email</label>
            <input
              id="email" 
              name="email" 
              type="text"
              onInput={(e) => validateInput(e.target)} 
              required autoComplete="off"
            />
            <span className="alert-danger">Alert message</span>
          </p>
          <p>
            <label htmlFor="password" className="floatLabel">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              onInput={(e) => validateInput(e.target)} 
              required 
              autoComplete="off"
            />
            <span className="alert-danger">Alert message</span>
          </p>
          <p>
            <input type="submit" value="Sign In Account" id="submit"/>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;