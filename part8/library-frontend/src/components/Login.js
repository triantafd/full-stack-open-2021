import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../services/queries'

const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    /*  onError: (error) => {
       setError(error.graphQLErrors[0].message)
     } */
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      setPage('authors')
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  /* const submit = async (event) => {
    try {
      event.preventDefault()
      console.log("login")
      const result = await login({ variables: { username, password } })
      setToken(result.data.login.value)
      localStorage.setItem('user-token', result.data.login.value)
    } catch (e) {
      console.log(e)
    }
  } */

  if (!show) {
    return null
  }

  return (
    <form onSubmit={submit}>
      <div>
        <span>username</span>
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          type="text"
        />
      </div>
      <div>
        <span>password</span>
        <input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login