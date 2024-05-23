import { useEffect, useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import Apis, { endpoints } from '../configs/Apis'
import { Link, redirect, useNavigate, useParams } from 'react-router-dom'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'

const CourseOutlineDetail = () => {
  const [courseOutline, setcourseOutline] = useState(null)
  const { assignId } = useParams()
  const [richTextContent, setRichTextContent] = useState('')
  const [status, setStatus] = useState('')
  const [courseAssessments, setCourseAssessments] = useState([])
  const nav = useNavigate()

  useEffect(() => {
    const fetchCourseOutline = async () => {
      const res = await Apis.get(endpoints['course-outline'](assignId))
      setcourseOutline(res.data)
      setRichTextContent(res.data.content)
      setStatus(res.data.status)
      setCourseAssessments(res.data.courseAssessments)
    }

    fetchCourseOutline()
  }, [])

  async function updateCourseOutline() {
    const data = {
      content: richTextContent,
      status: status,
      courseAssessments: courseAssessments,
    }
    const id = courseOutline.id
    try {
      await Apis.post(endpoints['course-outline'](id), data)
      nav('/assign-outlines')
    } catch (error) {
      console.log(error)
    }
  }

  const handleTypeChange = (index, e) => {
    const newCourseAssessments = [...courseAssessments]
    newCourseAssessments[index].type = e.target.value
    setCourseAssessments(newCourseAssessments)
  }

  const handleMethodChange = (index, e) => {
    const newCourseAssessments = [...courseAssessments]
    newCourseAssessments[index].method = e.target.value
    setCourseAssessments(newCourseAssessments)
  }

  const handleTimeChange = (index, e) => {
    const newCourseAssessments = [...courseAssessments]
    newCourseAssessments[index].time = e.target.value
    setCourseAssessments(newCourseAssessments)
  }

  const handleClosChange = (index, e) => {
    const newCourseAssessments = [...courseAssessments]
    newCourseAssessments[index].clos = e.target.value
    setCourseAssessments(newCourseAssessments)
  }

  const handleWeightChange = (index, e) => {
    const newCourseAssessments = [...courseAssessments]
    newCourseAssessments[index].weightPercent = e.target.value
    setCourseAssessments(newCourseAssessments)
  }

  const addCourseAssessment = () => {
    const newCourseAssessments = [...courseAssessments]
    newCourseAssessments.push({
      type: '',
      method: '',
      time: '',
      clos: '',
      weightPercent: '',
    })
    setCourseAssessments(newCourseAssessments)
  }

  const removeCourseAssessment = (index) => {
    const newCourseAssessments = [...courseAssessments]
    newCourseAssessments.splice(index, 1)
    setCourseAssessments(newCourseAssessments)
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value)
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

      <div style={{ marginBottom: '30px' }}>
        <h3>Các tiêu chí đánh giá</h3>
        <button
          style={{ marginBottom: '10px' }}
          className='btn btn-info'
          onClick={addCourseAssessment}
        >
          Thêm tiêu chí
        </button>

        {courseAssessments.map((courseAssessment, index) => (
          <div key={index} className='border p-3'>
            <InputGroup className='mb-3'>
              <InputGroup.Text id='type'>Loại</InputGroup.Text>
              <Form.Control
                value={courseAssessment.type}
                placeholder='Loại đánh giá'
                aria-describedby='type'
                className='me-2'
                onChange={(e) => handleTypeChange(index, e)}
              />
              <InputGroup.Text id='method'>Cách thức</InputGroup.Text>
              <Form.Control
                value={courseAssessment.method}
                placeholder='Cách thức đánh giá'
                aria-describedby='method'
                onChange={(e) => handleMethodChange(index, e)}
              />
            </InputGroup>
            <InputGroup className='mb-3'>
              <InputGroup.Text id='time'>Thời điểm</InputGroup.Text>
              <Form.Control
                value={courseAssessment.time}
                placeholder='Thời điểm đánh giá'
                aria-describedby='time'
                className='me-2'
                onChange={(e) => handleTimeChange(index, e)}
              />
              <InputGroup.Text id='clos'>CLOS</InputGroup.Text>
              <Form.Control
                value={courseAssessment.clos}
                placeholder='CLOS'
                aria-describedby='clos'
                className='me-2'
                onChange={(e) => handleClosChange(index, e)}
              />
              <InputGroup.Text id='weightPercent'>Tỷ lệ %</InputGroup.Text>
              <Form.Control
                value={courseAssessment.weightPercent}
                placeholder='Tỷ lệ %'
                aria-describedby='weightPercent'
                onChange={(e) => handleWeightChange(index, e)}
              />
            </InputGroup>
            <button
              className='btn btn-danger'
              onClick={() => removeCourseAssessment(index)}
            >
              Xóa tiêu chí
            </button>
          </div>
        ))}
      </div>

      <CKEditor
        editor={ClassicEditor}
        data={richTextContent}
        onChange={(event, editor) => {
          const data = editor.getData()
          setRichTextContent(data)
        }}
      />
      <button className='btn btn-success' onClick={updateCourseOutline}>
        Lưu
      </button>
    </>
  )
}

export default CourseOutlineDetail
