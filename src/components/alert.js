import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setError, setWarning, setSuccess } from '../.store/actions/setMessages';

import '../css/pages/alert.css';

function Alert({message, type}) {
  const [isFadeOut, setFadeOut] = useState(false);
  const [wasAlertLoaded, setAlertLoaded] = useState(false);
  const dispatch = useDispatch();

  let alertClass;

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);
    return () => {
      clearTimeout(fadeOutTimer);
      setAlertLoaded(true);
    };
  }, []);

  useEffect(() => {
    const closeTimer = setTimeout(() => {
      closeAlert(true);
    }, 4000);
    return () => clearTimeout(closeTimer);
  }, [wasAlertLoaded]);

  if(type === 'error') {
    alertClass = 'danger-alert';
  }
  else if(type === 'success') {
    alertClass = 'success-alert';
  }
  else if(type === 'warning') {
    alertClass = 'warning-alert';
  }

  const closeAlert = () => {
    dispatch(setError(''));
    dispatch(setWarning(''));
    dispatch(setSuccess(''));
  }

  return(
    <div className={`alert ${alertClass}` + (!isFadeOut ? ' fade-in' : '') + (isFadeOut ? ' fade-out' : '')}>
      <h3>{message}</h3>
      <button className="close-a" onClick={closeAlert}>&times;</button>
    </div> 
  )
}

export default Alert;