import { useContext, useEffect, useState } from 'react'
import { BaseForm, TeacherForm } from './Register'
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
          {currentUserRole === 'STUDENT' && <StudentProfile majors={majors} />}
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

  async function handleSubmit(data) {
    try {
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

const StudentProfile = ({ majors }) => {
  const nav = useNavigate()
  const [studentInfo, setStudentInfo] = useState(null)

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await authApis.get(endpoints[''])
        setStudentInfo(res.data)
      } catch (e) {
        console.error('Fetch student info error: ' + e)
      }
    }
    fetchInfo()
  }, [])

  async function handleSubmit(data) {
    try {
      await authApis.post(endpoints[''], data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      nav('/')
    } catch (e) {
      console.error('Register error: ' + e)
    }
  }

  const formFields = [
    {
      label: 'Họ',
      field: 'lastName',
      type: 'text',
    },
    {
      label: 'Tên',
      field: 'firstName',
      type: 'text',
    },
    {
      label: 'Username',
      field: 'username',
      type: 'text',
    },
    {
      label: 'Mật khẩu',
      field: 'password',
      type: 'password',
    },
    {
      label: 'Niên khóa',
      field: 'schoolYear',
      type: 'number',
    },
    {
      label: 'Mã số sinh viên',
      field: 'studentCode',
      type: 'text',
    },
    {
      label: 'Email',
      field: 'email',
      type: 'text',
    },
    {
      label: 'Chuyên ngành',
      field: 'majorId',
      type: 'select',
      options: majors,
    },
    {
      label: 'Số điện thoại',
      field: 'phone',
      type: 'text',
    },
    {
      field: 'avatar',
    },
  ]

  return (
    <div>
      {studentInfo && (
        <>
          <h3 className='text-center'>Thông tin cá nhân</h3>
          <BaseForm
            formFields={formFields}
            initForm={studentInfo}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  )
}

export default Profile
