import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from "axios";

import { setError, setWarning, setSuccess } from '../.store/actions/setMessages';

import '../css/pages/auth.css';

function Login({API, setCookie, createFormData, checkAuth}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async function(e) {
    e.preventDefault();
    if(email === '' || password === '' || email.length < 5 || !email.indexOf('@')) {
      return false;
    } else {
      dispatch(setError('')); dispatch(setWarning('')); dispatch(setSuccess(''));
    }

    const formObject = {
      email: email,
      password: password,
    }
    const formData = createFormData(formObject);

    try {
      await axios.post(`${API}/users`, formData, {
        withCredentials: true, 
        validateStatus: function() { return true },
      }).then((res) => {
        let status = res.status;
        setEmail(''); setPassword('');
        if(status === 200) {
          setCookie('accessToken', res.data.token);
          navigate('/'); checkAuth();
          return dispatch(setSuccess("You've been successfully logged in."));
        }
        else return dispatch(setError(res.data.message));
      }).catch((err) => {
        dispatch(setError('Internal Server ' + err));
      });
    } catch {
      return dispatch(setWarning("Something went wrong. Try again!"));
    }
  }

  return(
    <React.Fragment>
      <div className="body">
        <div className="div">
          <form action="#" method="post" className="form" onSubmit={(e) => loginUser(e)}>
            <h2>Sign In</h2>
            <p className="text">First time visiting our site?
              <NavLink to="/register" className="navlink"> Click to register</NavLink>
            </p>
            <p>
              <label htmlFor="email" className="floatLabel">Email</label>
              <input id="email" name="email" type="text" value={email}
                onChange={(e) => setEmail(e.target.value)} required autoComplete="off"
              />
            </p>
            <p>
              <label htmlFor="password" className="floatLabel">Password</label>
              <input id="password" name="password" type="password" value={password}
                onChange={(e) => setPassword(e.target.value)} required autoComplete="off"
              />
            </p>
            <p>
              <input type="submit" value="Sign In Account" id="submit"/>
            </p>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;