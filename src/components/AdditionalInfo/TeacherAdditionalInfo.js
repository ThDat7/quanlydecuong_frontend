import { useEffect, useState } from 'react'
import { authApis, endpoints } from '../../configs/Apis'
import { useNavigate } from 'react-router'
import TeacherForm from '../Form/TeacherForm'

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

  async function handleSubmit(data) {
    try {
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

export default TeacherAdditionalInfo
