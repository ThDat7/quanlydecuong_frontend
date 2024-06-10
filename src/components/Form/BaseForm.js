import React, { useState } from 'react'
import { Button, Form, Image } from 'react-bootstrap'

const BaseForm = ({ formFields, initForm, handleSubmit }) => {
  const oldAvatar = initForm.image
  delete initForm.avatar
  const [form, setForm] = useState(initForm)

  const displayAvatar = form.avatar
    ? URL.createObjectURL(form.avatar)
    : form.avatar == null && oldAvatar
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
    await handleSubmit(data)
  }

  return (
    <>
      {formFields.map((_, i) => (
        <div key={i}>
          {_.type === 'select' && (
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
          )}

          {(_.type === 'text' ||
            _.type === 'number' ||
            _.type === 'password') && (
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

          {_.type === 'file' && _.field === 'avatar' && (
            <Form.Control
              className='mb-3'
              type='file'
              accept='.png,.jpg'
              onChange={(e) =>
                handleInputChange(_.type, _.field, e.target.files[0])
              }
            />
          )}
        </div>
      ))}

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

export default BaseForm
