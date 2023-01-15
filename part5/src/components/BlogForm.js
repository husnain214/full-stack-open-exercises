import { useState } from "react"
import blogService from "../services/blogService"

const BlogForm = ({ 
    formVisible, 
    setFormVisible, 
    setBlogs, 
    setMessage, 
    blogs} ) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const showWhenVisible = { display: formVisible ? '' : 'none' }

    const createBlog = async event => {
        event.preventDefault()

        const newBlog = { title, author, url }

        await blogService.create(newBlog)
        setBlogs(blogs.concat(newBlog))

        setMessage(`a new blog ${title} by ${author} has been added`)

        setTimeout(() => {
            setMessage('')
        }, 3000)

        setFormVisible(false)
    }

    return (
        <form onSubmit={ createBlog } style={ showWhenVisible }>
            <div>
            <label htmlFor='title'>title:</label>
            <input 
                type='text' 
                name='title'
                value={ title }
                onChange={ ({ target }) => setTitle(target.value) } 
            />
            </div>

            <div>
            <label htmlFor='author'>author:</label>
            <input 
                type='text' 
                name='author' 
                value={ author }
                onChange={ ({ target }) => setAuthor(target.value) } 
            />
            </div>
            <div>
            <label htmlFor='url'>url:</label>
            <input 
                type='text' 
                name='url' 
                value={ url }
                onChange={ ({ target }) => setUrl(target.value) } 
            />
            </div>

            <button type='submit'>create</button>
            <button type='button' onClick={ () => setFormVisible(false) }>cancel</button>
        </form>
    )
}

export default BlogForm