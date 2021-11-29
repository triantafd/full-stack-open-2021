let timer = null


export const setNotificationMessage = (notification, sec = 3) => {
  if (timer !== null) {
    clearInterval(timer)
  }

  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification
    })
    timer = setTimeout(() => {
      dispatch(removeNotification())
    }, sec * 1000)
  }
}


export const removeNotification = () => {
  return { type: 'REMOVE_NOTIFICATION' }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}


export default notificationReducer