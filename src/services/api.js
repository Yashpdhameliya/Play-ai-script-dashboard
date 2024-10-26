import axios from 'axios'
import Cookies from 'js-cookie'

// Set up the base Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://your-api-base-url.com', // Set API URL in .env file
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor to include token from cookies
api.interceptors.request.use(
  config => {
    const token = Cookies.get('token') // Adjust the key name as per your token cookie

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => Promise.reject(error)
)

// Add a response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const { status, data } = error.response

      // Handle common HTTP errors
      switch (status) {
        case 401:
          // Handle Unauthorized access, maybe redirect to login
          console.error('Unauthorized access - perhaps login again')
          break
        case 403:
          // Handle Forbidden error
          console.error('Access forbidden')
          break
        case 404:
          // Handle Not Found error
          console.error('Resource not found')
          break
        case 500:
          // Handle server error
          console.error('Server error')
          break
        default:
          console.error(data.message || 'An unknown error occurred')
      }
    } else if (error.request) {
      console.error('Network error - request was made but no response received')
    } else {
      console.error('Error', error.message)
    }

    return Promise.reject(error)
  }
)

// Generic CRUD functions
const apiService = {
  get: (url, params) => api.get(url, { params }),
  post: (url, data) => api.post(url, data),
  put: (url, data) => api.put(url, data),
  patch: (url, data) => api.patch(url, data),
  delete: url => api.delete(url)
}

export default apiService

// example ========================================>
// const fetchUserData = async () => {
//   try {
//     const response = await apiService.get('/users'); // Assuming the endpoint is /users
//     console.log('User Data:', response.data);
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//   }
// };

// Post============================>

// const createUser = async userData => {
//   try {
//     const response = await apiService.post('/users', userData) // Assuming the endpoint is /users

//     console.log('User Created:', response.data)
//   } catch (error) {
//     console.error('Error creating user:', error)
//   }
// }

// POST======================================>

// const updateUser = async (userId, updatedData) => {
//   try {
//     const response = await apiService.put(`/users/${userId}`, updatedData); // Assuming the endpoint is /users/:id
//     console.log('User Updated:', response.data);
//   } catch (error) {
//     console.error('Error updating user:', error);
//   }
// };

// // Usage example with user ID and updated data
// updateUser(1, { name: 'Jane Doe', email: 'jane@example.com' });

// DELETE=================================>
// const deleteUser = async userId => {
//   try {
//     const response = await apiService.delete(`/users/${userId}`) // Assuming the endpoint is /users/:id

//     console.log('User Deleted:', response.data)
//   } catch (error) {
//     console.error('Error deleting user:', error)
//   }
// }

// // Usage example with user ID
// deleteUser(1)
