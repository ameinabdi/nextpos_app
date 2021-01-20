import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils'
import { parseHeaderForLinks } from '../../../shared/util/url-utils'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  productRequest: ['productId'],
  productAllRequest: ['options'],
  productUpdateRequest: ['product'],
  productSearchRequest: ['query'],
  productDeleteRequest: ['productId'],

  productSuccess: ['product'],
  productAllSuccess: ['products', 'headers'],
  productUpdateSuccess: ['product'],
  productSearchSuccess: ['products'],
  productDeleteSuccess: [],

  productFailure: ['error'],
  productAllFailure: ['error'],
  productUpdateFailure: ['error'],
  productSearchFailure: ['error'],
  productDeleteFailure: ['error'],

  productReset: [],
})

export const ProductTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  product: null,
  products: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorSearching: null,
  errorDeleting: null,
  links: { next: 0 },
  totalItems: 0,
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    product: null,
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    errorAll: false,
  })

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updating: true,
  })
// request to search from an api
export const searchRequest = (state) =>
  state.merge({
    searching: true,
  })
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true,
  })

// successful api lookup for single entity
export const success = (state, action) => {
  const { product } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    product,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { products } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    products
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { product } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    product,
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { products } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    products,
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    product: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    product: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    products: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    product: state.product,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    product: state.product,
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    products: [],
  })
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PRODUCT_REQUEST]: request,
  [Types.PRODUCT_ALL_REQUEST]: allRequest,
  [Types.PRODUCT_UPDATE_REQUEST]: updateRequest,
  [Types.PRODUCT_SEARCH_REQUEST]: searchRequest,
  [Types.PRODUCT_DELETE_REQUEST]: deleteRequest,

  [Types.PRODUCT_SUCCESS]: success,
  [Types.PRODUCT_ALL_SUCCESS]: allSuccess,
  [Types.PRODUCT_UPDATE_SUCCESS]: updateSuccess,
  [Types.PRODUCT_SEARCH_SUCCESS]: searchSuccess,
  [Types.PRODUCT_DELETE_SUCCESS]: deleteSuccess,

  [Types.PRODUCT_FAILURE]: failure,
  [Types.PRODUCT_ALL_FAILURE]: allFailure,
  [Types.PRODUCT_UPDATE_FAILURE]: updateFailure,
  [Types.PRODUCT_SEARCH_FAILURE]: searchFailure,
  [Types.PRODUCT_DELETE_FAILURE]: deleteFailure,
  [Types.PRODUCT_RESET]: reset,
})
