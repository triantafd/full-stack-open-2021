import React from 'react'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'

const Blog = ({ blog, handleLikeFunc, handleDeletionFunc, currentUser }) => {
  console.log('In blog component blog is ', blog.user.username)
  console.log('In blog component, User is ', currentUser.username)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      <Togglable buttonLabel="details">
        {blog.url}
        <p className="likescount">{'Likes: ' + blog.likes}</p>
        <button className="likebutton" onClick={() => handleLikeFunc(blog)}>
          Like
        </button>
        {blog.user.username === currentUser.username ? (
          <button
            onClick={() => handleDeletionFunc(blog)}
            className="deletebutton"
          >
            Delete
          </button>
        ) : (
          ''
        )}
      </Togglable>
    </div>
  )
}

export default Blog