import React from 'react'
import Apis, { endpoints } from '../../configs/Apis'
import { useNavigate } from 'react-router'
import BaseForm from '../Form/BaseForm'

const StudentRegister = ({ majors }) => {
  const nav = useNavigate()
  const initForm = {
    lastName: '',
    firstName: '',
    email: '',
    studentCode: '',
    majorId: null,
    schoolYear: null,
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
      label: 'Email',
      field: 'email',
      type: 'text',
    },
    {
      label: 'Mã số sinh viên',
      field: 'studentCode',
      type: 'text',
    },
    {
      label: 'Chuyên ngành',
      field: 'majorId',
      type: 'select',
      options: majors,
    },
    {
      label: 'Niên khóa',
      field: 'schoolYear',
      type: 'number',
    },
  ]

  async function handleSubmit(data) {
    try {
      await Apis.post(endpoints['student-register'], data)
      nav('/')
    } catch (e) {
      console.error('Register error: ' + e)
    }
  }

  return (
    <div>
      <h3 className='text-center'>Đăng ký học sinh</h3>
      <BaseForm
        formFields={formFields}
        initForm={initForm}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default StudentRegister
