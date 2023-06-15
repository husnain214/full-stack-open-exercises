import { useState } from 'react'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [detailsVisible, setDetailsVisible] = useState(false)

  const showWhenVisible = { display: detailsVisible ? '' : 'none' }
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const removeBtnVisible = { display: userAndBlogIDMatch() ? '' : 'none' }

  function userAndBlogIDMatch() {
    return blog.user.username === user.username
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const incrementLike = async () => { 
    dispatch(likeBlog(blog))
  }

  const deleteBlog = async () => {
    const deleteConfirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    if (!deleteConfirm) return

    dispatch(removeBlog(blog.id))
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <div style={showWhenVisible} className="blog-details">
        {blog.url} <br />
        likes <span id="numOfLikes">{blog.likes}</span>
        <button type="button" className="like-btn" onClick={incrementLike}>
          like
        </button>
        <br />
        {blog.author} <br />
      </div>
      <button
        onClick={() => setDetailsVisible(true)}
        style={hideWhenVisible}
        className="show-btn"
        id="show-btn"
      >
        view
      </button>
      <button
        onClick={() => setDetailsVisible(false)}
        style={showWhenVisible}
        className="hide-btn"
        id="hide-btn"
      >
        hide
      </button>
      <button onClick={deleteBlog} style={removeBtnVisible}>
        remove
      </button>
    </div>
  )
}

export default Blog
