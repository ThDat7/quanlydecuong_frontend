import { useEffect, useState } from 'react'
import Apis, { authApis, endpoints } from '../configs/Apis'
import { useNavigate } from 'react-router'
import { TeacherForm } from './Register'
import { Button, Form, Image } from 'react-bootstrap'

const AdditionalInfo = () => {
  const currentUserRole = 'teacher'

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
          {currentUserRole === 'teacher' && (
            <TeacherAdditionalInfo majors={majors} />
          )}
          {currentUserRole === 'student' && <StudentAdditionalInfo />}
        </>
      )}
    </>
  )
}

const TeacherAdditionalInfo = ({ majors }) => {
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

      await authApis.post(endpoints['teacher-add-info'], data, {
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
          <h3 className='text-center'>Bổ sung thông tin</h3>
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

const StudentAdditionalInfo = () => {
  const nav = useNavigate()
  const [avatar, setAvatar] = useState(null)
  const displayAvatar = avatar ? URL.createObjectURL(avatar) : null

  const handleSubmit = async () => {
    try {
      let data = new FormData()

      if (avatar) data.append('avatar', avatar)

      await authApis.post(endpoints['student-add-info'], data, {
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
      <h3 className='text-center'>Bổ sung thông tin</h3>

      <Form.Control
        className='mb-3'
        type='file'
        accept='.png,.jpg'
        onChange={(e) => setAvatar(e.target.files[0])}
      />
      {displayAvatar != null && (
        <Image
          className='mb-3'
          style={{ maxHeight: '40vh', display: 'block' }}
          src={displayAvatar}
        />
      )}

      <Button variant='success' onClick={handleSubmit}>
        Lưu
      </Button>
    </div>
  )
}

export default AdditionalInfo
