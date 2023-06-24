import { Link } from "react-router-dom"

const User = ({ user }) => {
  console.log(user)
  return (
    <>
      <h1>{user.username}</h1>
      <h2>added blogs</h2>

      <ul>
        {
          user.blogs.map( blog => {
            return (
              <li key={blog.id}>{blog.title}</li>
            )
          })
        }
      </ul>
    </>
  )
}

export default User