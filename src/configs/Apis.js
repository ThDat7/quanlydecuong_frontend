import axios from 'axios'
import Cookies from 'js-cookie'

const SERVER_CONTEXT = '/QuanLyDeCuong'

export const endpoints = {
  'course-outlines': `/api/course-outlines`,
  'course-outline': (id) => `/api/course-outlines/${id}`,
  'course-outline-view': (id) => `/api/course-outlines/view/${id}`,
  'update-course-outline': (id) => `/api/course-outlines/${id}`,
  search: `/api/search`,
  'do-comment': (id) => `/api/comments/${id}`,
  'education-program-view': (id) => `/api/education-programs/view/${id}`,
  'student-register': `/api/register/student`,
  'teacher-register': `/api/register/teacher`,
  majors: `/api/register/majors`,
  'teacher-add-info': `/api/profile/additional-info/teacher`,
  'student-add-info': `/api/profile/additional-info/student`,
  'teacher-profile': `/api/profile/teacher`,
  'student-profile': `/api/profile/student`,
  login: `/api/login`,
  'get-chat-users': `/api/users/get-chat-users`,
  'search-teachers': `/api/users/search-teachers`,
}

export default axios.create({
  baseURL: `http://localhost:8080${SERVER_CONTEXT}`,
})

const authApis = axios.create({
  baseURL: `http://localhost:8080${SERVER_CONTEXT}`,
  headers: {
    authorization: Cookies.get('token'),
  },
})

authApis.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    if (token) {
      config.headers['authorization'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { authApis }
