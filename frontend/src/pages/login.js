import React from "react";
import axios from "axios";

import '../css/pages/auth.css';

import Alert from '../components/alert';

import {validateForm} from '../components/functions';
import {validateInput} from '../components/functions';

function Login({App, API}) {
  let isFormValid = false;
  let error = App.state.error;
  let warning = App.state.warning;

  const loginUser = async function(e) {
    validateForm(e, isFormValid, App);

    const form = document.querySelector('.form[method="post"]');
    const formData = new FormData(form);

    let status;

    try {
      await axios.post(`${API}/users`, formData, {
        withCredentials: true, 
        validateStatus: function() {return true},
      }).then((res) => {
        console.log(res);
        status = res.status; error = res.data.message;
        form.reset();
        if(status === 201) document.location.href = '/';
        return App.setState({error: error});
      }).catch((err) => {return App.setState({error: err});});
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
              onInput={(e) => validateInput(e.target, isFormValid)} 
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
              onInput={(e) => validateInput(e.target, isFormValid)} 
              required 
              autoComplete="off"
            />
            <span className="alert-danger">Alert message</span>
          </p>
          <input type="hidden" value="login" name="req"/>
          <p>
            <input type="submit" value="Sign In Account" id="submit"/>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;