import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";

import { setError, setWarning, setSuccess } from '../.store/actions/setMessages';

import '../css/pages/auth.css';

function Login({API, getCookie, setCookie, createFormData, checkAuth, getUserInfo}) {
  //React Hooks
  function useQuery () {
    return new URLSearchParams(location.search);
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();

  //Confirm Email Logic
  useEffect (() => {
    const vkeyParam = query.get('vkey');
    const validateEmail = async() => {
      const formObject = {
        vkey: vkeyParam,
      }
      const formData = createFormData(formObject);
      try {
        await axios.post(`${API}/users`, formData, {
          withCredentials: true, 
          validateStatus: function() { return true },
        }).then((res) => {
          let status = res.status;
          if(status === 200) {
            return dispatch(setSuccess(res.data.message));
          }
          else return dispatch(setError(res.data.message));
        }).catch((err) => {
          dispatch(setError('Internal Server ' + err));
        });
      } catch {
        return dispatch(setWarning("Something went wrong"));
      }
    };
    if(vkeyParam) {
      window.history.pushState('', 'Verified!', '/login');
      validateEmail();
    }
  }, [API, createFormData, dispatch, query]);

  //Login Logic
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const cart = useSelector(state => state.cart);

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
          if(cart.length > 0) {
            cart.forEach((cartItem) => {
              const accessToken = getCookie('accessToken');
              const formObject = {
                name: cartItem.name, quantity: cartItem.quantity,
                price: cartItem.price, img: cartItem.img,
                product_id: cartItem.id, req: 'add'
              };
              const formData = createFormData(formObject);
              try {
                axios.post(`${API}/cart_items`, formData, {
                  headers: { 'Authorization': 'Bearer ' + accessToken }
                }, { validateStatus: function() { return true; } }).catch(() => {});
              } catch {}
            });
          };
          navigate('/'); checkAuth(); getUserInfo();
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