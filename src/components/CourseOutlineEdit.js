import React, { useEffect, useState } from 'react'
import { Form, InputGroup, Table } from 'react-bootstrap'
import Apis, { endpoints } from '../configs/Apis'
import { useNavigate, useParams } from 'react-router-dom'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Urls from '../configs/Urls'

const CourseOutlineEdit = () => {
  const [courseOutline, setcourseOutline] = useState(null)
  const { assignId } = useParams()
  const [richTextContent, setRichTextContent] = useState('')
  const [status, setStatus] = useState('')
  const [courseAssessments, setCourseAssessments] = useState([])
  const nav = useNavigate()

  const assessmentMethodFields = [
    {
      label: 'Bài đánh giá',
      field: 'method',
      type: 'text',
    },
    {
      label: 'Thời điểm',
      field: 'time',
      type: 'text',
    },
    {
      label: 'CDR môn học',
      field: 'clos',
      type: 'text',
    },
    {
      label: 'Tỷ lệ %',
      field: 'weightPercent',
      type: 'number',
    },
  ]

  useEffect(() => {
    const fetchCourseOutline = async () => {
      const res = await Apis.get(endpoints['course-outline'](assignId))
      setcourseOutline(res.data)
      setRichTextContent(res.data.content)
      setStatus(res.data.status)
      setCourseAssessments(res.data.courseAssessments)
    }

    fetchCourseOutline()
  }, [assignId])

  async function handleSubmit() {
    const data = {
      content: richTextContent,
      status: status,
      courseAssessments: courseAssessments,
    }
    const id = courseOutline.id
    try {
      await Apis.post(endpoints['update-course-outline'](id), data)
      nav(Urls['assign-outlines'])
    } catch (error) {
      console.log('Error: ' + error)
    }
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value)
  }

  const handleAddComponent = () => {
    setCourseAssessments([
      ...courseAssessments,
      { type: '', assessmentMethods: [] },
    ])
  }

  const handleRemoveComponent = (index) => {
    const updatedComponents = courseAssessments.filter((_, i) => i !== index)
    setCourseAssessments(updatedComponents)
  }

  const handleAddMethod = (index) => {
    const updatedComponents = [...courseAssessments]
    updatedComponents[index].assessmentMethods.push({
      method: '',
      time: '',
      clos: '',
      weightPercent: '',
    })
    setCourseAssessments(updatedComponents)
  }

  const handleRemoveMethod = (componentIndex, methodIndex) => {
    const updatedComponents = [...courseAssessments]
    updatedComponents[componentIndex].assessmentMethods = updatedComponents[
      componentIndex
    ].assessmentMethods.filter((_, i) => i !== methodIndex)
    setCourseAssessments(updatedComponents)
  }

  const handleInputChange = (componentIndex, methodIndex, field, value) => {
    const updatedComponents = [...courseAssessments]
    if (methodIndex !== null) {
      updatedComponents[componentIndex].assessmentMethods[methodIndex][field] =
        value
    } else {
      updatedComponents[componentIndex][field] = value
    }
    setCourseAssessments(updatedComponents)
  }

  return (
    <>
      <Form.Select
        onChange={handleStatusChange}
        value={status}
        style={{ marginBottom: '30px' }}
      >
        <option value='DOING'>Đang thực hiện</option>
        <option value='COMPLETED'>Đã biên soạn xong</option>
      </Form.Select>

      <Table hover bordered striped className='mb-3'>
        <thead>
          <tr>
            <th>Thành phần đánh giá</th>
            <th>Bài đánh giá</th>
            <th>Thời điểm</th>
            <th>CDR môn học</th>
            <th>Tỷ lệ %</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <button className='btn btn-primary' onClick={handleAddComponent}>
                Thêm thành phần đánh giá
              </button>
            </td>
            <td colspan='5'></td>
          </tr>
          {courseAssessments.map((component, componentIndex) => (
            <React.Fragment key={componentIndex}>
              <tr>
                <td rowspan={component.assessmentMethods.length + 1}>
                  <Form.Control
                    type='text'
                    placeholder='Thành phần đánh giá'
                    value={component.type}
                    onChange={(e) =>
                      handleInputChange(
                        componentIndex,
                        null,
                        'type',
                        e.target.value
                      )
                    }
                  />
                </td>
                <td colspan='2'>
                  <button
                    className='btn btn-success'
                    onClick={() => handleAddMethod(componentIndex)}
                  >
                    Thêm method đánh giá
                  </button>
                </td>
                <td colspan='3'>
                  <button
                    className='btn btn-danger'
                    onClick={() => handleRemoveComponent(componentIndex)}
                  >
                    Xóa thành phần đánh giá
                  </button>
                </td>
              </tr>

              {component.assessmentMethods.map((method, methodIndex) => (
                <tr key={methodIndex}>
                  {assessmentMethodFields.map((_) => (
                    <td>
                      <Form.Control
                        type={_.type}
                        placeholder={_.label}
                        value={method[_.field]}
                        onChange={(e) =>
                          handleInputChange(
                            componentIndex,
                            methodIndex,
                            _.field,
                            e.target.value
                          )
                        }
                      />
                    </td>
                  ))}
                  <td>
                    <button
                      className='btn btn-danger'
                      onClick={() =>
                        handleRemoveMethod(componentIndex, methodIndex)
                      }
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>

      <CKEditor
        editor={ClassicEditor}
        data={richTextContent}
        onChange={(event, editor) => {
          const data = editor.getData()
          setRichTextContent(data)
        }}
      />
      <button className='btn btn-success' onClick={handleSubmit}>
        Lưu
      </button>
    </>
  )
}

export default CourseOutlineEdit
