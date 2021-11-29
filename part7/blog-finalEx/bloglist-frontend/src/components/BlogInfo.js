import React from 'react'
import {
  useParams
} from 'react-router-dom'
import { useSelector } from 'react-redux'
/* import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText' */


const BlogInfo = () => {
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  console.log('blogssss', blog)

  return (
    <div>
      <h2>{blog.title}</h2>
    </div>
  )
}


export default BlogInfo