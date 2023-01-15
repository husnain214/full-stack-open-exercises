import { useState } from 'react'
import blogService from '../services/blogService'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const showWhenVisible = { display: detailsVisible ? '' : 'none' }
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const incrementLike = async () => {
    const newBlog = {
      ...blog,
      likes: likes + 1
    }

    await blogService.update(blog.id, newBlog)
 
    setLikes(likes + 1)
    setBlogs(blogs.sort((first, second) => second.likes - first.likes))
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}

      <div style={ showWhenVisible }>
        {blog.url} <br />

        likes {likes} 
        <button type='button' onClick={incrementLike}>like</button>
        <br />

        {blog.author} <br />
      </div>

      <button 
        type='button' 
        onClick={ () => setDetailsVisible(true) }
        style={ hideWhenVisible }
        >view</button>
      <button 
        type='button' 
        onClick={ () => setDetailsVisible(false) }
        style={ showWhenVisible }
      >hide</button>
    </div> 
  ) 
}

export default Blog