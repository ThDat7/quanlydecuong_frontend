import React from 'react'
import Apis, { endpoints } from '../../configs/Apis'
import { useNavigate } from 'react-router'
import TeacherForm from '../Form/TeacherForm'

const TeacherRegister = ({ majors }) => {
  const intitForm = {
    lastName: '',
    firstName: '',
    username: '',
    password: '',
    email: '',
    majorId: null,
    phone: '',
    avatar: null,
  }

  const nav = useNavigate()

  async function handleSubmit(data) {
    try {
      await Apis.post(endpoints['teacher-register'], data, {
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
      <h3 className='text-center'>Đăng ký giảng viên</h3>
      <TeacherForm
        initForm={intitForm}
        handleSubmit={handleSubmit}
        majors={majors}
      />
    </div>
  )
}

export default TeacherRegister
