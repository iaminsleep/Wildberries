const setModalVisibility = (statusBoolean) => {
  return {
    type: 'SET_MODAL_VISIBILITY',
    data: statusBoolean,
  }
}

export default setModalVisibility;