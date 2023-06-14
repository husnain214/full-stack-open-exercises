import { useState } from 'react'

const BlogForm = ({ formVisible, setFormVisible, createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const showWhenVisible = { display: formVisible ? '' : 'none' }

  const addBlog = async (event) => {
    event.preventDefault()

    await createBlog({ title, author, url })
  }

  return (
    <form onSubmit={addBlog} style={showWhenVisible}>
      <div>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
        <label htmlFor="author">author:</label>
        <input
          type="text"
          name="author"
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <input
          type="text"
          name="url"
          id="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <button type="submit" id="createBlogBtn">
        create
      </button>
      <button type="button" onClick={() => setFormVisible(false)}>
        cancel
      </button>
    </form>
  )
}

export default BlogForm
