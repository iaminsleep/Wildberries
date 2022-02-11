import React from "react";
import axios from "axios";

import '../css/pages/auth.css';

import Alert from '../components/alert';

import {validateInput} from '../components/functions';
import {validateForm} from '../components/functions';

function Register({App, API}) {
  let isFormValid = false;
  let error = App.state.error;
  let warning = App.state.warning;

  const registerUser = async function(e) {
    validateForm(e, isFormValid, App);
    
    const form = document.querySelector('.form[method="post"]');
    const formData = new FormData(form);

    let status;

    try {
      await axios.post(`${API}/users`, formData, 
      {validateStatus: function() {return true}})
      .then((res) => {
        status = res.status; 
        error = res.data.message;
        form.reset();
        if(status === 201) document.location.href = '/login';
        return App.setState({error: error});
      }).catch(() => {return App.setState({error: error});});
    } catch {
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
            <input 
              id="email" 
              name="email" 
              type="text" 
              onInput={(e) => validateInput(e.target, isFormValid)} 
              required 
              autoComplete="off"
            />
            <span className="alert-danger">Alert message</span>
          </p>
          <p>
            <label htmlFor="password" className="floatLabel">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              onInput={(e) => validateInput(e.target, isFormValid)} 
              required 
              autoComplete="off"
            />
            <span className="alert-danger">Alert message</span>
          </p>
          <p>
            <label htmlFor="confirm_password" className="floatLabel">Confirm Password</label>
            <input 
              id="confirm_password" 
              name="confirm_password" 
              onInput={(e) => validateInput(e.target, isFormValid)} 
              type="password" 
              required 
              autoComplete="off"
            />
            <span className="alert-danger">Alert message</span>
          </p>
          <input type="hidden" value="register" name="req"/>
          <p>
            <input type="submit" value="Create My Account" id="submit"/>
          </p>
        </form>
      </div>
  </div>
  )
}

export default Register;