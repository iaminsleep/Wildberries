import React from "react";

import '../css/pages/auth.css';

function Login() {
  return(
    <div className="body">
      <div className="div">
        <form action="#" method="post" className="form">
          <h2>Sign In</h2>
          <p className="text">First time visiting our site?
            <a href="/register" className="navlink"> Click to register</a>
          </p>
          <p>
            <label htmlFor="Email" className="floatLabel">Email or Phone</label>
            <input id="Email" name="Email" type="text" required autoComplete="off"/>
            <span className="alert-danger">Alert message</span>
          </p>
          <p>
            <label htmlFor="password" className="floatLabel">Password</label>
            <input id="password" name="password" type="password" required autoComplete="off"/>
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