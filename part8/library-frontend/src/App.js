
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'
//import { useApolloClient } from '@apollo/client';

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  console.log('TOKEN IS', token)
  //const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    //client.resetStore()
  }

  useEffect(() => {
    const localToken = localStorage.getItem('library-user-token')
    if (localToken) {
      setToken(localToken)
    }
  }, /* [setToken] */)

  const renderLoginState = () => {
    if (token) {
      return (
        <React.Fragment>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('rec')}>Recommended</button>
          <button onClick={logout}>Log out</button>
        </React.Fragment>)
    } else {
      return <button onClick={() => setPage('login')}>login</button>
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {renderLoginState()}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <Recommended
        show={page === 'rec'}
      />
      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'} setToken={setToken} setPage={setPage}
      />
    </div>
  )
}

export default App