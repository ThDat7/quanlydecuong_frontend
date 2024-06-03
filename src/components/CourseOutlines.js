import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import Apis, { endpoints } from '../configs/Apis'
import Urls from '../configs/Urls'
import { Link, useSearchParams } from 'react-router-dom'
import Page from './Pagination'

const CourseOutlines = () => {
  const [assigns, setAssigns] = useState([])
  const [total, setTotal] = useState(0)

  const [searchParam] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParam.get('page') || 1)
  )

  useEffect(() => {
    const fetchAssigns = async () => {
      const res = await Apis.get(
        `${endpoints['course-outlines']}?page=${currentPage}`
      )
      setTotal(res.data.total)
      setAssigns(res.data.data)
    }

    fetchAssigns()
  }, [currentPage])

  return (
    <>
      <Table hover bordered striped>
        <thead>
          <tr>
            <th>Môn học</th>
            <th>Ngày hết hạn</th>
            <th>Còn lại</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {assigns.map((_) => {
            let url = `${Urls['course-outline-edit']}${_.id}`
            return (
              <tr key={_.id}>
                <td>{_.courseName}</td>
                <td>{_.deadlineDate}</td>
                <td></td>
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

      <Page
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={total}
      />
    </>
  )
}

export default CourseOutlines
