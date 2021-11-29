import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
//import Style from './GenericStyles'

const UserList = ({ users }) => {
  console.log('USERSLISTS IS', users)
  return (
    <div>
      <h2 className="">Users</h2>
      <table>
        <thead>
          <tr>
            {/* <th>Blogs Created</th> */}
            <td></td>
            <td>Blogs Created</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} >
              <td>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length} Blogs</td>
            </tr>
          ))}
        </tbody>
      </table >
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}


export default connect(mapStateToProps)(UserList)
/* const ConnectedUserList = connect(mapStateToProps)(UserList)
export default ConnectedUserList */