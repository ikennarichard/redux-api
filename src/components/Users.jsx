import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux/users/usersSlice";
import { useEffect } from "react";

export default function Users() {
  const { users, isLoading, error } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const loading = isLoading && <p>Loading...</p>
  const errorStatus = error && <p>{error}</p>


  return (
    <>
    <h1>Users</h1>
    <ul style={{ listStyle:'none'}}>
    {users.map((user) => (
      <li key={crypto.randomUUID()}>
        <div>FistName: {user.first}</div>
        <div>Lastname: {user.last}</div>
      </li>
    ))}
    </ul>
    {loading}
    {errorStatus}
    </>
  )
}