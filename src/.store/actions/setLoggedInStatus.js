const setLoggedInStatus = (statusBoolean) => {
  return {
    type: 'SET_LOGGED_STATUS',
    data: statusBoolean,
  }
}

export default setLoggedInStatus;