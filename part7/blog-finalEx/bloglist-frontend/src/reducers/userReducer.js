import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotificationMessage } from './notificationReducer'

const userReducer = (state = null, action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'REMOVE_USER':
      window.localStorage.removeItem('loggedappUser')
      return null
    default:
      return state
  }
}

export const removeUser = () => {
  return { type: 'REMOVE_USER' }
}

export const setUser = (user) => {
  return { type: 'SET_USER', data: user }
}

export const login = (data) => {
  return async dispatch => {
    try {
      const { username, password } = data
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedappUser', JSON.stringify(user))
      dispatch(setUser(user))
      dispatch(setNotificationMessage(`User ${user.username} logged in`, 5))
    } catch (e) {
      /*
      console.log(e)
      if (e.message.includes('401')) {
        handleMessage('Failed to authorize. Wrong login and/or password')
      }
      */
      dispatch(setNotificationMessage(`${e.response.data.error}`, 5))
    }
  }
}


export default userReducer