import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, createBlog } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { login, setUser } from './reducers/userReducer'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import User from './components/User'
import Notification from './components/Notification'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import BlogList from './components/BlogList'
import BlogInfo from './components/BlogInfo'
import NavMenu from './components/NavMenu'

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
  //console.log('User', user, ' logged in')
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedappUser')
    console.log('Only the first time enters here')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login({ username, password }))
    setUsername('')
    setPassword('')
  }



  const handleCreateBlog = async (entry) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(entry))
  }


  const loginForm = () => {
    return (
      <Togglable buttonLabel="Login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
    )
  }

  return (
    <Router>
      <div>
        <NavMenu />
        <Notification />
        {user === null ? (
          loginForm()
        ) : (
          <div>
            {blogForm()}
            <Switch>
              <Route path="/blogs/:id">
                <BlogInfo />
              </Route>
              <Route path="/blogs">
                <BlogList />
              </Route>
              <Route path="/users/:id">
                <User />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
            </Switch>
          </div>
        )}
      </div>
    </Router>
  )
}

export default App