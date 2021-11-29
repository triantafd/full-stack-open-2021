import React from 'react'
import { connect } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const NavMenu = ({ removeUser, user }) => {
  const handleLogout = (event) => {
    event.preventDefault()
    removeUser()
  }

  return (
    <div>
      <Link  /* className={''}  */ to="/blogs">
        Blogs
      </Link>
      <Link  /* className={''}  */ to="/users">
        Users
      </Link>
      {user && (
        <button /* className={''}  */ onClick={handleLogout}>
          Log Out
        </button>
      )}
      {user && <div >{user.name} is logged in.</div>}
      <div >Blogs App</div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = { removeUser }


export default connect(mapStateToProps, mapDispatchToProps)(NavMenu)