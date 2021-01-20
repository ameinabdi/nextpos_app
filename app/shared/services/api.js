// a library to wrap and simplify api calls
import apisauce from 'apisauce'

import AppConfig from '../../config/app-config'

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000,
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth)
  const removeAuthToken = () => api.deleteHeader('Authorization')
  const login = (userAuth) =>
    api.post('auth/sign-in', userAuth, {
      headers: { Accept: 'application/json' },
    })
  const register = (user) => api.post('api/register', user)
  const forgotPassword = (data) =>
    api.post('api/account/reset-password/init', data, {
      headers: { 'Content-Type': 'text/plain', Accept: 'application/json, text/plain, */*' },
    })
  const logout = (userAuth) => api.put('/auth/signout')
  const getAccount = () => api.get('auth/me')
  const updateAccount = (account) => api.post('api/account', account)
  const setPinAccount = (pin) => api.put('/auth/set-pin', pin)
  const changePassword = (currentPassword, newPassword) =>
    api.post(
      'api/account/change-password',
      { currentPassword, newPassword },
      { headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/plain, */*' } },
    )

  const getUser = (userId) => api.get('api/users/' + userId)
  const getUsers = (options) => api.get('api/users', options)
  const createUser = (user) => api.post('api/users', user)
  const updateUser = (user) => api.put('api/users', user)
  const deleteUser = (userId) => api.delete('api/users/' + userId)

  const getCategory = (categoryId) => api.get('api/categories/' + categoryId)
  const getCategories = (options) => api.get(`/tenant/${options.tenantId}/category-list`)
  const createCategory = (category) => api.post('api/categories', category)
  const updateCategory = (category) => api.put('api/categories', category)
  const deleteCategory = (categoryId) => api.delete('api/categories/' + categoryId)
  const searchCategories = (query) => api.get('api/_search/categories', { query: query })

  const getProduct = (productId) => api.get('api/products/' + productId)
  const getProducts = (options) => api.get(`tenant/${options.tenantId}/product?filter%5Bcategory%5D=${options.categoryId}`)
  const createProduct = (product) => api.post('api/products', product)
  const updateProduct = (product) => api.put('api/products', product)
  const deleteProduct = (productId) => api.delete('api/products/' + productId)
  const searchProducts = (query) => api.get('api/_search/products', { query: query })

  const checkin = (data) => api.post(`tenant/${data.tenantId}/attendance`, { data })
  const checkout = (data, id) => api.put(`tenant/${data.tenantId}/attendance/${id}`, (body = { id, data }))
  const currentLocation = (data) => api.post(`tenant/${data.tenantId}/connection`, { data })
  const getAllAttendence = (data) => api.get(`tenant/${data.tenentId}/attendance?filter%5Buser%5D=${data.id}`)

  const createOrder = (data) => api.post(`/tenant/${data.tenantId}/order`, { data })
  const updateOrder = (data) => api.put(`/tenant/${data.tenantId}/order/${data.id}`, { id: data.id, data })
  const getOrders = (data) => api.get(`tenant/${data.tenantId}/order?filter%5Buser%5D=${data.id}`)

  const getCustomer = (data) => api.get(`/tenant/${data.tenantId}/customer/${data.id}`)
  const getCustomers = (data) => api.get(`/tenant/${data.tenantId}/customer${data.shopId != null ? '?filter%5Bshop%5D='+data.shopId:''}`)
  const createCustomer = (data) => api.post(`/tenant/${data.tenantId}/customer`, {data})
  const updateCustomer = (data,id) => api.put(`/tenant/${data.tenantId}/customer${id}`, (body={id, data}))
  const searchCustomers = (query) => api.get(`/tenant/${query.tenantId}/customer?filter%5Bfullname%5D=${query.fullname}`)

  const getTables = (data) => api.get(`/tenant/${data.tenantId}/table${data.shopId != null ? '?filter%5Bshop%5D='+data.shopId:''}`)

  // ignite-jhipster-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser,
    setPinAccount,

    createCategory,
    updateCategory,
    getCategories,
    getCategory,
    deleteCategory,
    searchCategories,

    createProduct,
    updateProduct,
    getProducts,
    getProduct,
    deleteProduct,
    searchProducts,

    checkin,
    checkout,
    getAllAttendence,
    currentLocation,

    createOrder,
    getOrders,
    updateOrder,

    createCustomer,
    updateCustomer,
    getCustomers,
    getCustomer,
    searchCustomers,

    getTables,
    // ignite-jhipster-api-export-needle
    setAuthToken,
    removeAuthToken,
    login,
    register,
    logout,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword,
  }
}

// let's return back our create method as the default.
export default {
  create,
}
