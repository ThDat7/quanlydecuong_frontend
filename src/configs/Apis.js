import axios from 'axios'

const SERVER_CONTEXT = '/QuanLyDeCuong'

export const endpoints = {
  'course-outlines': `/api/course-outlines`,
  'course-outline': (id) => `/api/course-outlines/${id}`,
  'update-course-outline': (id) => `/api/course-outlines/${id}`,
  search: `/api/search`,
}

export default axios.create({
  baseURL: `http://localhost:8080${SERVER_CONTEXT}`,
})
