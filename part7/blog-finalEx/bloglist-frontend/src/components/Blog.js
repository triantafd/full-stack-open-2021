import React from 'react'
import Togglable from './Togglable'


const Blog = ({ blog, handleLikeFunc, handleDeletionFunc, currentUser }) => {
  console.log('blog user ', blog, blog.user.username)
  console.log('cur user', currentUser, currentUser.username)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
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