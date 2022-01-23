import React from "react";
import { NavLink } from "react-router-dom";

import '../css/pages/auth.css';

function Login() {
  return(
    <div className="body">
      <div className="div">
        <form action="#" method="post" className="form">
          <h2>Sign In</h2>
          <p className="text">First time visiting our site?
            <NavLink to="/register" className="navlink"> Click to register</NavLink>
          </p>
          <p>
            <label htmlFor="Email" className="floatLabel">Email</label>
            <input id="Email" name="Email" type="text"/>
          </p>
          <p>
            <label htmlFor="password" className="floatLabel">Password</label>
            <input id="password" name="password" type="password"/>
            <span>Enter a password longer than 8 characters</span>
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