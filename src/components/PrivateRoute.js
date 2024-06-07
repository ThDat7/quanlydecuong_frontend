import { useContext, useReducer } from 'react'
import UserReducer from '../reducers/UserReducer'
import Urls from '../configs/Urls'
import { Navigate, Outlet } from 'react-router'
import UserContext from '../contexts/UserContext'

const PrivateRoute = ({ roles = [] }) => {
  const [user] = useContext(UserContext)
  const isLoggedIn = user
  const isCanAccess =
    isLoggedIn && (roles.length == 0 || roles.includes(user.role))

  if (!isLoggedIn) return <Navigate to={Urls['login']} />

  return isCanAccess ? <Outlet /> : <Navigate to={Urls['forbidden']} />
}

export default PrivateRoute
