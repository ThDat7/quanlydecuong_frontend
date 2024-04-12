import axios from 'axios'

const SERVER_CONTEXT = '/QuanLyDeCuong'

export const endpoints = {
  categories: `/api/categories/`,
}

export default axios.create({
  baseURL: `http://localhost:8080${SERVER_CONTEXT}`,
})
