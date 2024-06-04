import axios from 'axios'

const SERVER_CONTEXT = '/QuanLyDeCuong'

export const endpoints = {
  'course-outlines': `/api/course-outlines`,
  'course-outline-view': (id) => `/api/course-outlines/view/${id}`,
  'update-course-outline': (id) => `/api/course-outlines/${id}`,
  search: `/api/search`,
  'do-comment': (id) => `/api/comments/${id}`,
  'education-program-view': (id) => `/api/education-programs/view/${id}`,
}

export default axios.create({
  baseURL: `http://localhost:8080${SERVER_CONTEXT}`,
})
