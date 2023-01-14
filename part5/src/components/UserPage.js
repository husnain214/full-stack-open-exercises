import { useState, useEffect } from "react"

import blogService from "../services/blogService"
import Notification from "./Notification"
import Blog from "./Blog"

const UserPage = ({ setUser, username }) => {
    const [blogs, setBlogs] = useState([])
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        blogService
          .getAll()
          .then(blogs => {
            setBlogs( blogs )
          }
        )  
      }, [])

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const createBlog = async event => {
        event.preventDefault()

        const newBlog = { title, author, url }

        await blogService.create(newBlog)
        setBlogs(blogs.concat(newBlog))

        setMessage(`a new blog ${title} by ${author} has been added`)

        setTimeout(() => {
            setMessage('')
        }, 3000)
    }

    return (
      (
        <div>
          <h2>blogs</h2>

          <Notification message = {message} />
    
          {username} logged in
    
          <button onClick={ handleLogout }>logout</button>

          <form onSubmit={ createBlog }>
            <div>
              <label htmlFor='title'>title:</label>
              <input 
                type='text' 
                name='title'
                onChange={ ({ target }) => setTitle(target.value) } 
              />
            </div>

            <div>
              <label htmlFor='author'>author:</label>
              <input 
                type='text' 
                name='author' 
                onChange={ ({ target }) => setAuthor(target.value) } 
              />
            </div>
            <div>
              <label htmlFor='url'>url:</label>
              <input 
                type='text' 
                name='url' 
                onChange={ ({ target }) => setUrl(target.value) } 
              />
            </div>

            <button type='submit'>create</button>
          </form>
    
          {blogs.length === 0 
            ? '...' 
            : blogs.map(blog => 
                <Blog key={blog.id} blog={blog} />
              )
          }
        </div>
      )
    )
}

export default UserPage