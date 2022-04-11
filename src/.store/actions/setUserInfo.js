const setUserInfo = (userInfoData) => {
  return {
    type: 'SET_USER_INFO',
    data: userInfoData,
  }
}

export default setUserInfo;