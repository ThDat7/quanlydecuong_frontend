import { Container, Image, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Urls from '../configs/Urls'
import { useContext } from 'react'
import UserContext from '../contexts/UserContext'
import Cookies from 'js-cookie'

const Header = () => {
  const [user, dispatch] = useContext(UserContext)
  const nav = useNavigate()
  const handleLogout = () => {
    dispatch({ type: 'logout' })
    Cookies.remove('token')
    Cookies.remove('user')
    nav(Urls['login'])
  }
  if (!user) return <></>

  return (
    <>
      <Navbar expand='lg' className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand>
            <Link to={Urls['home']}>Quản lý đề cương</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Link className='nav-link' to={Urls['home']}>
                Trang chủ
              </Link>
              {['ADMIN', 'TEACHER'].includes(user.role) && (
                <Nav className='me-auto'>
                  <Link to={Urls['course-outlines']} className='nav-link'>
                    Quản lý đề cương
                  </Link>
                </Nav>
              )}
              <>
                <Link to={Urls['profile']} className='nav-link text-success'>
                  <Image
                    style={{ maxWidth: '40px', maxHeight: '40px' }}
                    src={user.avatar}
                  />{' '}
                  {user.fullName}
                </Link>
                <Link onClick={handleLogout} className='nav-link'>
                  Đăng xuất
                </Link>
              </>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
