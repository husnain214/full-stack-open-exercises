import { useEffect, useState } from 'react'
import userService from '../services/userService'
import { Link} from 'react-router-dom'

const UserList = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getUsers = async () => {
      const data = await userService.getAll()

      setUsers(data)
    } 

    getUsers()
  }, [])

  return (
    <>
      <h1>Users</h1>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>

        <tbody>
          {
            users.map(user => {
              return (
                <tr key={user.id}>
                  <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                  <td>{user.blogs.length}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default UserList