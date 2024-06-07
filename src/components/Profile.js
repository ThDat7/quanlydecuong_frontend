import { useContext, useEffect, useState } from 'react'
import { TeacherForm } from './Register'
import { useNavigate } from 'react-router'
import Apis, { authApis, endpoints } from '../configs/Apis'
import UserContext from '../contexts/UserContext'

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
          {currentUserRole === 'STUDENT' && <StudentProfile />}
        </>
      )}
    </>
  )
}

const TeacherProfile = ({ majors }) => {
  const nav = useNavigate()
  const [teacherInfo, setTeacherInfo] = useState(null)

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await authApis.get(endpoints['teacher-profile'])
        setTeacherInfo(res.data)
      } catch (e) {
        console.error('Fetch teacher info error: ' + e)
      }
    }
    fetchInfo()
  }, [])

  async function handleSubmit(form, avatar) {
    try {
      let data = new FormData()
      for (let key in form) data.append(key, form[key])

      if (avatar) data.append('avatar', avatar)

      await authApis.post(endpoints['teacher-profile'], data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      nav('/')
    } catch (e) {
      console.error('Register error: ' + e)
    }
  }

  return (
    <div>
      {teacherInfo && (
        <>
          <h3 className='text-center'>Thông tin cá nhân</h3>
          <TeacherForm
            initForm={teacherInfo}
            handleSubmit={handleSubmit}
            majors={majors}
          />
        </>
      )}
    </div>
  )
}

const StudentProfile = () => {
  return <div>Student Profile</div>
}

export default Profile
