import React from "react";

import '../css/pages/auth.css';

function Register({API}) {

  const registerUser = async function(e) {
    e.preventDefault();

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
      }).then(() => {
        email = '';
        password = '';
        confirmPassword = '';
        document.location.href = '/login';
      })
    }
    catch(err) {
      alert('Возникла ошибка при попытке регистрации!');
    }
  }

  return(
    <div className="body">
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