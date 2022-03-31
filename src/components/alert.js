import React from 'react';
import { useDispatch } from 'react-redux';

import { setError, setWarning, setSuccess } from '../.store/actions/setMessages';

import '../css/pages/alert.css';

function Alert({message, type}) {
  const dispatch = useDispatch();
  
  let alertClass;

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
    <div className={`fade-in alert ${alertClass}`}>
      <h3>{message}</h3>
      <button className="close-a" onClick={closeAlert}>&times;</button>
    </div> 
  )
}

export default Alert;