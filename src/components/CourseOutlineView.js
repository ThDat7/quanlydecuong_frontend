import { useEffect, useState } from 'react'
import Apis, { endpoints } from '../configs/Apis'
import { useNavigate, useParams } from 'react-router-dom'

const CourseOutlineView = () => {
  const [courseOutline, setcourseOutline] = useState(null)
  const { assignId } = useParams()
  const [richTextContent, setRichTextContent] = useState('')
  const [status, setStatus] = useState('')
  const [courseAssessments, setCourseAssessments] = useState([])
  const nav = useNavigate()

  useEffect(() => {
    const fetchCourseOutline = async () => {
      const res = await Apis.get(endpoints[''](assignId))
      setcourseOutline(res.data)
      setRichTextContent(res.data.content)
      setStatus(res.data.status)
      setCourseAssessments(res.data.courseAssessments)
    }

    fetchCourseOutline()
  }, [assignId])

  return <></>
}

export default CourseOutlineView
