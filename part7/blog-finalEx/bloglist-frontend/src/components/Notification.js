import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <h2 id="importantMessage">{message}</h2>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)
/* const connectedNotification = connect(mapStateToProps)(Notification)
export default connectedNotification */