import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { setError, setWarning, setSuccess } from '../.store/actions/setMessages';

import '../css/pages/auth.css';

function Register({API, createFormData}) {

  const [isFormValid, setValidForm] = useState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailAlertMessage, setEmailAlert] = useState('');
  const [passwordAlertMessage, setPasswordAlert] = useState('');
  const [confirmPasswordAlertMessage, setConfirmPasswordAlert] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const validateEmail = () => {
      const emailTemplate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if(email.match(emailTemplate)) {
        setValidForm(true);
        setEmailAlert('');
      } else if(email === '') {
        setEmailAlert('');
      } else {
        setValidForm(false);
        setEmailAlert("Incorrect email address!");
      }
    }
    validateEmail();
  }, [email]);

  useEffect(() => {
    const validatePassword = () => {
      const passwordTemplate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (password.match(passwordTemplate)) {
        setValidForm(true);
        setPasswordAlert('');
      } else if(password === '') {
        setPasswordAlert('');
      } else {
        setValidForm(false);
        setPasswordAlert("The password must be from 6 to 20 characters, contain at least one digit, one uppercase and one lowercase letter");
      }
    }
    validatePassword();
  }, [password]);

  useEffect(() => {
    const validateConfirmPassword = () => {
      if(password !== confirmPassword) {
        setValidForm(false);
        setConfirmPasswordAlert("Passwords don't match!");
      } else if(confirmPassword === '') {
        setConfirmPasswordAlert('');
      } else {
        setValidForm(true);
        setConfirmPasswordAlert('');
      }
    }
    validateConfirmPassword();
  }, [confirmPassword, password]);

  const registerUser = async function(e) {
    e.preventDefault();   
    if(isFormValid === false) {
      return false;
    }
    else {
      dispatch(setError('')); dispatch(setWarning('')); dispatch(setSuccess(''));
    }

    const formObject = {
      email: email,
      password: password,
      confirm_password: confirmPassword,
    }
    const formData = createFormData(formObject);

    try {
      await axios.post(`${API}/users`, formData, 
      { validateStatus: function() { return true; } })
      .then((res) => {
        let status = res.status; 
        let error = res.data.message;
        setEmail(''); setPassword(''); setConfirmPassword('');
        if(status === 201) {
          navigate('/login');
          const successMsg = 'Congratulations! You can log in now.';
          return dispatch(setSuccess(successMsg));
        }
        else 
          return dispatch(setError(error));
      }).catch((err) => {
        return dispatch(setError('Internal Server ' + err));
      });
    } catch {
      const warning = "Something went wrong. Try again!";
      return dispatch(setWarning(warning));
    }
  }

  return(
    <div className="body">
      <div className="div">
        <form action="#" method="post" className="form" onSubmit={(e) => registerUser(e)}>
          <h2>Sign Up</h2>
          <p className="text">Already have an account?
            <NavLink to="/login" className="navlink"> Sign In</NavLink>
          </p>
          <p>
            <label htmlFor="email" className="floatLabel">Email</label>
            <input id="email" name="email" type="text" autoComplete="off" value={email}
              onChange={(e) => setEmail(e.target.value)} required
            />
            { emailAlertMessage
              ? <span className="alert-danger alert-visible">{emailAlertMessage}</span> 
              : ''}
          </p>
          <p>
            <label htmlFor="password" className="floatLabel">Password</label>
            <input id="password" name="password" type="password" autoComplete="off"
              onChange={(e) => setPassword(e.target.value)} required value={password}
            />
            { passwordAlertMessage
              ? <span className="alert-danger alert-visible">{passwordAlertMessage}</span> 
              : ''}
          </p>
          <p>
            <label htmlFor="confirm_password" className="floatLabel">Confirm Password</label>
            <input id="confirm_password" name="confirm_password" type="password" autoComplete="off" 
              onChange={(e) => setConfirmPassword(e.target.value)} required value={confirmPassword}
            />
            { confirmPasswordAlertMessage
              ? <span className="alert-danger alert-visible">{confirmPasswordAlertMessage}</span> 
              : '' }
          </p>
          <p>
            <input type="submit" value="Create My Account" id="submit" disabled={!isFormValid}/>
          </p>
        </form>
      </div>
  </div>
  )
}

export default Register;