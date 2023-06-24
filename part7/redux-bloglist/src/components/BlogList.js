import { useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
const BlogList = ({ formVisible, addBlog, setFormVisible, user }) => {
  const blogs = useSelector(state => state.blogs)

  const blogStyle = {
    marginTop: 10,
    padding: '1em',
    display: 'block',
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <>
      <div>
        <button onClick={() => setFormVisible(true)}>new Blog</button>
      </div>
      <BlogForm
        formVisible={formVisible}
        setFormVisible={setFormVisible}
        createBlog={addBlog}
      />
      <div>
        {blogs.length === 0
          ? '...'
          : [...blogs]
              .sort((first, second) => second.likes - first.likes)
              .map((blog) => {
                return <Link key={blog.id} style={blogStyle} to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
              })
        }
      </div>
    </>
  )
}

export default BlogList