import { useState } from 'react'
import { authApis, endpoints } from '../../configs/Apis'
import { useNavigate } from 'react-router'
import { Button, Form, Image } from 'react-bootstrap'

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

export default StudentAdditionalInfo
