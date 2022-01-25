import React from "react";

import '../css/pages/auth.css';

function Register() {
  return(
    <div className="body">
      <div className="div">
        <form action="#" method="post" className="form">
          <h2>Sign Up</h2>
          <p className="text">Already have an account?
            <a href="/login" className="navlink"> Sign In</a>
          </p>
          <p>
            <label htmlFor="Email" className="floatLabel">Email</label>
            <input id="email" name="Email" type="text" required autoComplete="off"/>
            <span className="alert-danger">Alert message</span>
          </p>
          <p>
            <label htmlFor="password" className="floatLabel">Password</label>
            <input id="password" name="password" type="password" required autoComplete="off"/>
            <span className="alert-danger">Alert message</span>
          </p>
          <p>
            <label htmlFor="confirm_password" className="floatLabel">Confirm Password</label>
            <input id="confirm_password" name="confirm_password" type="password" required autoComplete="off"/>
            <span className="alert-danger">Alert message</span>
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