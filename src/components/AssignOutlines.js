import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import Apis, { endpoints } from '../configs/Apis'
import { Link } from 'react-router-dom'

const AssignOutlines = () => {
  const [assigns, setAssigns] = useState([])

  useEffect(() => {
    const fetchAssigns = async () => {
      const res = await Apis.get(endpoints['assign-outlines'])
      setAssigns(res.data)
    }

    fetchAssigns()
  }, [])

  return (
    <>
      <Table hover bordered striped>
        <thead>
          <tr>
            <th>Môn học</th>
            <th>Ngày phân công</th>
            <th>Ngày hết hạn</th>
            <th>Còn lại</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {assigns.map((assign) => {
            let url = `/course-outlines/${assign.id}`
            return (
              <tr key={assign.id}>
                <td>{assign.courseName}</td>
                <td>{assign.assignDate}</td>
                <td>{assign.deadlineDate}</td>
                <td></td>
                <td>{assign.courseStatus}</td>
                <td>
                  <Link className='btn btn-success' to={url}>
                    Chi tiết
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default AssignOutlines
