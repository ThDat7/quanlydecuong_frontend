import React, { useEffect, useState } from 'react'
import Apis, { endpoints } from '../configs/Apis'
import { useNavigate, useParams } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Table } from 'react-bootstrap'

const CourseOutlineView = () => {
  const [courseOutline, setcourseOutline] = useState(null)
  const [comment, setComment] = useState('')
  const { id } = useParams()

  useEffect(() => {
    const fetchCourseOutline = async () => {
      const res = await Apis.get(endpoints['course-outline-view'](id))
      console.log(res.data)
      setcourseOutline(res.data)
    }

    fetchCourseOutline()
  }, [id])

  async function handleCommentButtonClick(e, idCmt = null) {
    console.log({
      id: idCmt,
      cmt: comment,
    })
    try {
      await Apis.post(endpoints['do-comment'](id), {
        id: idCmt,
        cmt: comment,
      })
    } catch (e) {
      console.error('Error when commenting: ' + e)
    }
  }

  return (
    <>
      {courseOutline && (
        <>
          <h1>{courseOutline.courseName}</h1>

          <div className='d-flex justify-content-between mb-3 mt-3'>
            <span>Giảng viên: {courseOutline.teacherName}</span>
            <span>Năm học: {[...new Set(courseOutline.years)].join(', ')}</span>
          </div>

          <div>
            <h3>Đánh giá môn học</h3>
            <Table hover bordered striped className='mb-3'>
              <thead>
                <tr>
                  <th>Thành phần đánh giá</th>
                  <th>Bài đánh giá</th>
                  <th>Thời điểm</th>
                  <th>CDR môn học</th>
                  <th>Tỷ lệ %</th>
                </tr>
              </thead>
              <tbody>
                {courseOutline.courseAssessments.map(
                  (component, componentIndex) => (
                    <React.Fragment key={componentIndex}>
                      <tr>
                        <td rowSpan={component.assessmentMethods.length + 1}>
                          <span>{component.type}</span>
                        </td>
                      </tr>

                      {component.assessmentMethods.map((_, methodIndex) => (
                        <tr key={methodIndex}>
                          <td>
                            <span>{_.method}</span>
                          </td>
                          <td>
                            <span>{_.time}</span>
                          </td>
                          <td>
                            <span>{_.clos}</span>
                          </td>
                          <td>
                            <span>{_.weightPercent}</span>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  )
                )}
              </tbody>
            </Table>
          </div>
          <CKEditor
            data={courseOutline.content}
            editor={ClassicEditor}
            disabled={true}
            config={{
              toolbar: [],
            }}
          />

          <div className='mt-3'>
            <h4>Bình luận</h4>
            <div className='mb-3'>
              <textarea
                className='form-control'
                placeholder='Nhập bình luận'
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button
                className='btn btn-primary'
                onClick={handleCommentButtonClick}
              >
                Gửi
              </button>
            </div>

            {courseOutline.comments.length > 0 && (
              <div>
                {courseOutline.comments.map((comment, index) => (
                  <div
                    key={index}
                    style={{
                      border: '2px solid',
                      padding: '20px',
                      marginBottom: '20px',
                      height: '80px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                    }}
                  >
                    <img
                      src='https://lh3.googleusercontent.com/ogw/AF2bZyiWtSmLCH8-zKcudietzR1e-7YTMCn4fe2RNcoxibDaaIc=s32-c-mo'
                      alt=''
                    />
                    <div>
                      <span className='d-flex'>
                        <h5>{comment.userFullName}</h5>
                        <span> - {comment.time}</span>
                      </span>
                      <p>{comment.cmt}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default CourseOutlineView
