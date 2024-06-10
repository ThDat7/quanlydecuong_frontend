import React from 'react'
import BaseForm from './BaseForm'

const TeacherForm = ({ initForm, handleSubmit, majors }) => {
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
    <BaseForm
      formFields={formFields}
      initForm={initForm}
      handleSubmit={handleSubmit}
    />
  )
}

export default TeacherForm
