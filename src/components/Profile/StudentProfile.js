import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { authApis, endpoints } from '../../configs/Apis'
import BaseForm from '../Form/BaseForm'

const StudentProfile = ({ majors }) => {
  const nav = useNavigate()
  const [studentInfo, setStudentInfo] = useState(null)

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await authApis.get(endpoints['student-profile'])
        setStudentInfo(res.data)
      } catch (e) {
        console.error('Fetch student info error: ' + e)
      }
    }
    fetchInfo()
  }, [])

  async function handleSubmit(data) {
    try {
      await authApis.post(endpoints['student-profile'], data, {
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
      type: 'file',
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

export default StudentProfile
