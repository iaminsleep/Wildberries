import React from "react";
import { NavLink } from "react-router-dom";

import '../css/pages/auth/auth.css';

function Register() {
  return(
    <div className="body">
      <div className="div">
        <form action="#" method="post" className="form">
          <h2>Sign Up</h2>
          <p className="text">Already have an account?
            <NavLink to="/login" className="navlink"> Sign In</NavLink>
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
            <label htmlFor="confirm_password" className="floatLabel">Confirm Password</label>
            <input id="confirm_password" name="confirm_password" type="password"/>
            <span>Your passwords do not match</span>
          </p>
          <p>
            <input type="submit" value="Create My Account" id="submit"/>
          </p>
        </form>
      </div>
  </div>
  )
}

export default Register;