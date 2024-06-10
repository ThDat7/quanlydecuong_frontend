import { useContext, useEffect, useState } from 'react'
import { authApis, endpoints } from '../../configs/Apis'
import UserContext from '../../contexts/UserContext'
import TeacherProfile from './TeacherProfile'
import StudentProfile from './StudentProfile'

const Profile = () => {
  const [user] = useContext(UserContext)
  const currentUserRole = user.role
  const [majors, setMajors] = useState([])
  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await authApis.get(endpoints['majors'])
        setMajors([{ id: null, name: '' }, ...response.data])
      } catch (e) {
        console.error('Fetch majors error: ' + e)
      }
    }

    fetchMajors()
  }, [])

  return (
    <>
      {majors.length > 0 && (
        <>
          {currentUserRole === 'TEACHER' && <TeacherProfile majors={majors} />}
          {currentUserRole === 'STUDENT' && <StudentProfile majors={majors} />}
        </>
      )}
    </>
  )
}

export default Profile
