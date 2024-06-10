import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, Form, Image, Tab, Tabs } from 'react-bootstrap'
import Apis, { endpoints } from '../configs/Apis'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Urls from '../configs/Urls'

const Register = () => {
  const [majors, setMajors] = useState([])
  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await Apis.get(endpoints['majors'])
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
          <Tabs fill justify defaultActiveKey='student' className='mb-3'>
            <Tab eventKey='student' title='Học sinh'>
              <StudentRegister majors={majors} />
            </Tab>
            <Tab eventKey='teacher' title='Giảng viên'>
              <TeacherRegister majors={majors} />
            </Tab>
          </Tabs>

          <div className='mt-3'>
            <Link to={Urls['login']}>Đăng nhập</Link>
          </div>
        </>
      )}
    </>
  )
}

const StudentRegister = ({ majors }) => {
  const nav = useNavigate()
  const initForm = {
    lastName: '',
    firstName: '',
    email: '',
    studentCode: '',
    majorId: null,
    schoolYear: '',
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
      label: 'schoolYear',
      field: 'Niên khóa',
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

const TeacherRegister = ({ majors }) => {
  const intitForm = {
    lastName: '',
    firstName: '',
    username: '',
    password: '',
    email: '',
    majorId: null,
    phone: '',
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

const BaseForm = ({ formFields, initForm, handleSubmit }) => {
  const oldAvatar = initForm.image
  delete initForm.avatar
  const [form, setForm] = useState(initForm)
  const [avatar, setAvatar] = useState(null)

  const displayAvatar = avatar
    ? URL.createObjectURL(avatar)
    : avatar == null && oldAvatar
    ? oldAvatar
    : null

  function handleInputChange(type, field, value) {
    const newForm = { ...form }
    newForm[field] = value
    setForm(newForm)
  }

  const handleSaveButtonClick = async () => {
    let data = new FormData()
    for (let key in form) data.append(key, form[key])

    if (formFields.some((_) => _.field === 'avatar') && avatar)
      data.append('avatar', avatar)

    await handleSubmit(data)
  }

  return (
    <>
      {formFields.map((_, i) => (
        <div key={i}>
          {_.type === 'select' ? (
            <Form.Select
              className='mb-3'
              onChange={(e) =>
                handleInputChange(_.type, _.field, e.target.value)
              }
              disabled={initForm[_.field] != null}
              value={form[_.field] ? form[_.field] : ''}
            >
              {_.options.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </Form.Select>
          ) : (
            <Form.Control
              className='mb-3'
              type={_.type}
              placeholder={_.label}
              value={form[_.field]}
              onChange={(e) =>
                handleInputChange(_.type, _.field, e.target.value)
              }
            />
          )}
        </div>
      ))}
      {formFields.some((_) => _.field === 'avatar') && (
        <Form.Control
          className='mb-3'
          type='file'
          accept='.png,.jpg'
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      )}
      {displayAvatar != null && (
        <Image
          className='mb-3'
          style={{ maxHeight: '40vh', display: 'block' }}
          src={displayAvatar}
        />
      )}
      <Button variant='success' onClick={handleSaveButtonClick}>
        Lưu
      </Button>
    </>
  )
}

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

export { TeacherForm, BaseForm }

export default Register
