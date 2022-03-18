import React from 'react';
import '../css/pages/alert.css';

function Alert({message, App, type}) {
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
    App.setState({error: '', warning: '', success: ''});
  }

  return(
    <div className={`fade-in alert ${alertClass}`}>
      <h3>{message}</h3>
      <button className="close-a" onClick={closeAlert}>&times;</button>
    </div> 
  )
}

export default Alert;