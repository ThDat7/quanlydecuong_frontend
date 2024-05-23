import axios from 'axios'

const SERVER_CONTEXT = '/QuanLyDeCuong'

export const endpoints = {
  'assign-outlines': `/api/assign-outlines`,
  'course-outline': (id) => `/api/course-outlines/${id}`,
  'update-course-outline': (id) => `/api/course-outlines/${id}`,
}

export default axios.create({
  baseURL: `http://localhost:8080${SERVER_CONTEXT}`,
})