import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Home'
import Footer from './layout/Footer'
import Header from './layout/Header'
import SearchResult from './components/SearchResult'
import CourseOutlineEdit from './components/CourseOutlineEdit'
import CourseOutlineView from './components/CourseOutlineView'
import EducationPrograms from './components/EducationPrograms'
import Urls from './configs/Urls'
import CourseOutlines from './components/CourseOutlines'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import UserReducer from './reducers/UserReducer'
import { useReducer } from 'react'
import UserContext from './contexts/UserContext'
import Forbidden from './components/Forbidden'
import Cookies from 'js-cookie'
import AdditionalInfo from './components/AdditionalInfo/AdditionalInfo'
import Profile from './components/Profile/Profile'
import Register from './components/Register/Register'
import ChatApp from './components/ChatApp/ChatApp'

const App = () => {
  let currentUser = null
  if (Cookies.get('user')) currentUser = JSON.parse(Cookies.get('user'))

  const [user, dispatch] = useReducer(UserReducer, currentUser)
  return (
    <>
      <UserContext.Provider value={[user, dispatch]}>
        <BrowserRouter>
          <Header />
          <Container>
            <Routes>
              <Route path={Urls['forbidden']} element={<Forbidden />} />

              <Route
                path={Urls['course-outlines']}
                element={<PrivateRoute roles={['ADMIN', 'TEACHER']} />}
              >
                <Route
                  path={Urls['course-outlines']}
                  element={<CourseOutlines />}
                />
              </Route>
              <Route
                path={`${Urls['course-outline-edit']}:id`}
                element={<PrivateRoute roles={['ADMIN', 'TEACHER']} />}
              >
                <Route
                  path={`${Urls['course-outline-edit']}:id`}
                  element={<CourseOutlineEdit />}
                />
              </Route>

              <Route path={Urls['home']} element={<PrivateRoute />}>
                <Route path={Urls['home']} element={<Home />} />
              </Route>

              <Route path={Urls['search-result']} element={<PrivateRoute />}>
                <Route
                  path={Urls['search-result']}
                  element={<SearchResult />}
                />
              </Route>

              <Route
                path={`${Urls['course-outline-view']}:id`}
                element={<PrivateRoute />}
              >
                <Route
                  path={`${Urls['course-outline-view']}:id`}
                  element={<CourseOutlineView />}
                />
              </Route>

              <Route
                path={`${Urls['education-program-view']}:id`}
                element={<PrivateRoute />}
              >
                <Route
                  path={`${Urls['education-program-view']}:id`}
                  element={<EducationPrograms />}
                />
              </Route>

              <Route path={`${Urls['search']}`} element={<PrivateRoute />}>
                <Route path={`${Urls['search']}`} element={<SearchResult />} />
              </Route>

              <Route path={`${Urls['register']}`} element={<Register />} />

              <Route
                path={`${Urls['additional-info']}`}
                element={<PrivateRoute />}
              >
                <Route
                  path={`${Urls['additional-info']}`}
                  element={<AdditionalInfo />}
                />
              </Route>

              <Route path={`${Urls['login']}`} element={<Login />} />

              <Route path={`${Urls['profile']}`} element={<PrivateRoute />}>
                <Route path={`${Urls['profile']}`} element={<Profile />} />
              </Route>

              <Route path={`${Urls['chat']}`} element={<PrivateRoute />}>
                <Route path={`${Urls['chat']}`} element={<ChatApp />} />
              </Route>
            </Routes>
          </Container>
          <Footer />
        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export default App
