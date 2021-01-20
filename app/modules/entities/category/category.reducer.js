import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils'
import { parseHeaderForLinks } from '../../../shared/util/url-utils'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  categoryRequest: ['categoryId'],
  categoryAllRequest: ['options'],
  categoryUpdateRequest: ['category'],
  categorySearchRequest: ['query'],
  categoryDeleteRequest: ['categoryId'],

  categorySuccess: ['category'],
  categoryAllSuccess: ['categories', 'headers'],
  categoryUpdateSuccess: ['category'],
  categorySearchSuccess: ['categories'],
  categoryDeleteSuccess: [],

  categoryFailure: ['error'],
  categoryAllFailure: ['error'],
  categoryUpdateFailure: ['error'],
  categorySearchFailure: ['error'],
  categoryDeleteFailure: ['error'],

  categoryReset: [],
})

export const CategoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  category: null,
  categories: [],
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
    category: null,
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
  const { category } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    category,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { categories } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    categories
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { category } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    category,
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { categories } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    categories,
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    category: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    category: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    categories: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    category: state.category,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    category: state.category,
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    categories: [],
  })
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CATEGORY_REQUEST]: request,
  [Types.CATEGORY_ALL_REQUEST]: allRequest,
  [Types.CATEGORY_UPDATE_REQUEST]: updateRequest,
  [Types.CATEGORY_SEARCH_REQUEST]: searchRequest,
  [Types.CATEGORY_DELETE_REQUEST]: deleteRequest,

  [Types.CATEGORY_SUCCESS]: success,
  [Types.CATEGORY_ALL_SUCCESS]: allSuccess,
  [Types.CATEGORY_UPDATE_SUCCESS]: updateSuccess,
  [Types.CATEGORY_SEARCH_SUCCESS]: searchSuccess,
  [Types.CATEGORY_DELETE_SUCCESS]: deleteSuccess,

  [Types.CATEGORY_FAILURE]: failure,
  [Types.CATEGORY_ALL_FAILURE]: allFailure,
  [Types.CATEGORY_UPDATE_FAILURE]: updateFailure,
  [Types.CATEGORY_SEARCH_FAILURE]: searchFailure,
  [Types.CATEGORY_DELETE_FAILURE]: deleteFailure,
  [Types.CATEGORY_RESET]: reset,
})
