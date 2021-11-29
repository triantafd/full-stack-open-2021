import React from 'react'
import { connect } from 'react-redux'
/* import { Link } from 'react-router-dom' */
import Blog from './Blog'
import { addLike, deleteBlog } from '../reducers/blogsReducer'




const BlogList = ({ blogs, user, addLike, deleteBlog }) => {
  const handleLike = async (post) => {
    addLike(post)
  }

  const handleDelete = async (post) => {
    deleteBlog(post)
  }

  if (!user) {
    return null
  }

  return (
    <div>
      {
        blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLikeFunc={handleLike}
            handleDeletionFunc={handleDelete}
            currentUser={user}
          />
        ))
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  const blogs = state.blogs
  const sortedblogs = [...blogs].sort((a, b) => b.likes - a.likes)
  //const sortedblogs = state.blogs.sort((a, b) => b.likes - a.likes)
  return {
    blogs: sortedblogs,
    user: state.user,
  }
}

const mapDispatchToProps = {
  addLike,
  deleteBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)
/* const connectedBlogList = connect(mapStateToProps)(BlogList)
export default connectedBlogList */