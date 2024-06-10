import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Search from './Search'
import Urls from '../configs/Urls'
import Apis, { authApis, endpoints } from '../configs/Apis'
import Page from './Pagination'

const SearchResult = () => {
  const [searchParam] = useSearchParams()
  const kw = searchParam.get('kw') || ''
  const nav = useNavigate()

  const [courseOutlines, setCourseOutlines] = useState([])
  const [educationPrograms, setEducationPrograms] = useState([])

  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParam.get('page') || 1)
  )

  const [creditFilter, setCreditFilter] = useState('')
  const [teacherFilter, setTeacherFilter] = useState('')
  const [yearFilter, setYearFilter] = useState('')

  useEffect(() => {
    const fetchAssigns = async () => {
      try {
        const res = await authApis.get(
          `${endpoints['search']}?kw=${kw}&page=${currentPage}`
        )
        setCourseOutlines(res.data[0].data)
        setEducationPrograms(res.data[1].data)
        setTotal(
          res.data[0].total > res.data[1].total
            ? res.data[0].total
            : res.data[1].total
        )
      } catch (e) {
        console.error(e)
      }
    }
    fetchAssigns()
  }, [kw, currentPage])

  return (
    <>
      <Search />
      <div>
        <Page
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={total}
          pageSize={5}
        />
        {courseOutlines.length > 0 && (
          <div>
            <h2>Đề cương môn học</h2>
            {courseOutlines.map((_) => (
              <Link key={_.id} to={`${Urls['course-outline-view']}${_.id}`}>
                <div className='border p-3'>
                  <p className='m-0'>{_.courseName}</p>
                  <p className='m-0'>Giáo viên: {_.teacherName}</p>
                  <p className='m-0'>Số tín chỉ: {_.courseCredits}</p>
                  <p className='m-0'>Khóa học: {_.years.join(', ')}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {educationPrograms.length > 0 && (
          <div>
            <h2>Chương trình đào tạo</h2>
            {educationPrograms.map((_) => (
              <Link key={_.id} to={`${Urls['education-program-view']}${_.id}`}>
                <div className='border p-3'>
                  <p className='m-0'>{_.majorName}</p>
                  <p className='m-0'>Khóa {_.schoolYear}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {courseOutlines.length === 0 && educationPrograms.length === 0 && (
          <div>Không tìm thấy kết quả</div>
        )}
      </div>
    </>
  )
}

export default SearchResult
