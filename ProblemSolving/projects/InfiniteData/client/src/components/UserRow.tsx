import type { Data } from '../types/data'

const UserRow = (user: Data) => {
  return (
    <div>
       <div> {user.first_name} {user.last_name}</div>
       <div>{user.email}</div>
    </div>
  )
}

export default UserRow