import React from "react";

import '../css/pages/auth.css';

import Alert from '../components/alert';

function Register({App, API}) {
  let error = App.state.error;
  let warning = App.state.warning;

  const registerUser = async function(e) {
    e.preventDefault();
    App.setState({error: '', warning: '', success: ''});
    let status;

    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    let confirmPassword = document.querySelector('#confirm_password');

    const formData = new FormData();
    formData.append('email', email.value);
    formData.append('password', password.value);
    formData.append('confirm_password', confirmPassword.value);

    try {
      await fetch(`${API}/users`, {
        method: 'POST',
        body: formData,
      }).then((res) => {
        status = res.status;
        return res.text();
      }).then(data => {
        if(status === 201) {
          document.location.href = '/login';
          email.value = '';
          password.value = '';
          confirmPassword.value = '';
        }   
        else {
          error = data;
          return App.setState({error: error});
        }
      })
    }
    catch {
      warning = "Something went wrong. Try again!";
      return App.setState({warning: warning});
    }
  }

  return(
    <div className="body">
      {error !== '' ? <Alert message={error} App={App} type={'error'}/> : ''}
      {warning !== '' ? <Alert message={warning} App={App} type={'warning'}/> : ''}
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