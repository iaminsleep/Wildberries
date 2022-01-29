import React from "react";

import '../css/pages/auth.css';
import '../css/pages/alert.css';

function Register({App, API}) {
  let error = App.state.error;

  const closeAlert = () => {
    App.setState({error: ''});
  }

  const registerUser = async function(e) {
    e.preventDefault();
    let status;

    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let confirmPassword = document.querySelector('#confirm_password').value;

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirm_password', confirmPassword);

    try {
      await fetch(`${API}/users`, {
      method: 'POST',
      body: formData,
      }).then((res) => {
        status = res.status;
        return res.text();
      }).then(data => {
        if(status === 201) {
          email = '';
          password = '';
          confirmPassword = '';
          document.location.href = '/login';
        }   
        else {
          error = data;
          return App.setState({error: error});
        }
      })
    }
    catch {
      alert("Something went wrong. Try again!");
    }
  }

  return(
    <div className="body">
      {error !== '' ? 
        <div className="alert danger-alert">
          <h3>{error}</h3>
          <button className="close-a" onClick={closeAlert}>&times;</button>
        </div> : ''
      }
      <div className="div">
        <form action="#" method="post" className="form" onSubmit={(e) => registerUser(e)}>
          <h2>Sign Up</h2>
          <p className="text">Already have an account?
            <a href="/login" className="navlink"> Sign In</a>
          </p>
          <p>
            <label htmlFor="email" className="floatLabel">Email</label>
            <input id="email" name="email" type="text" required autoComplete="off"/>
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