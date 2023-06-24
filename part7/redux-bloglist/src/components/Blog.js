import { useEffect, useState } from 'react'
import { removeBlog, likeBlog, createComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [commentVisible, setCommentVisible] = useState(false)
  const [comment, setComment] = useState('')

  const [isPageValid, setIsPageValid] = useState(false)

  useEffect(() => {
    if(!blog) {  
      navigate('/')
    }

    setIsPageValid(true)
  }, [blog, navigate])

  if (!isPageValid) return

  const incrementLike = () => { 
    dispatch(likeBlog(blog))
  }

  const addComment = event => {
    event.preventDefault()
    const newBlog = { ...blog, comments: blog.comments.concat(comment) }

    console.log('newBlog', newBlog)
    dispatch(createComment(newBlog))

    setComment('')
  }

  const deleteBlog = async () => {
    const deleteConfirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    if (!deleteConfirm) return

    dispatch(removeBlog(blog.id))
  }

  return (
    <div className="blog">
      <h1>{blog.title}</h1>
      <a href={blog.info}>{blog.info}</a>
      <span>{blog.likes} likes</span>
      <button onClick={incrementLike}>like</button>
      <p>added by {blog.author}</p>

      <button onClick={() => setCommentVisible(true)}>add a comment</button>

      <form onSubmit={addComment} style={{
        display: commentVisible ? '' : 'none'
      }}>
        <input 
          type='text' 
          placeholder='add comment' 
          onChange = { ({ target }) => setComment(target.value) } 
          value = {comment} />
          <button>submit</button>
          <button onClick={() => setCommentVisible(false)}>cancel</button>
      </form>

      <h2>comments</h2>

      <ul>
        {
          blog.comments.map( (comment, index) => <li key={index}>{comment}</li> )
        }
      </ul>
    </div>
  )
}

export default Blog
