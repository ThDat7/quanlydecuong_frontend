import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Apis, { endpoints } from '../../configs/Apis'
import { Link } from 'react-router-dom'
import Urls from '../../configs/Urls'
import TeacherRegister from './TeacherRegister'
import StudentRegister from './StudentRegister'

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

export default Register
