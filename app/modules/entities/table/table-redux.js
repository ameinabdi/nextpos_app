import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils'
import { parseHeaderForLinks } from '../../../shared/util/url-utils'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  tableRequest: ['options'],
  

  tableSuccess: ['tables'],
  

  tableFailure: ['error'],
 

  tableReset: [],
})

export const TableTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  tables: null,
  
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
    table: null,
  })


// successful api lookup for single entity
export const success = (state, action) => {
  const { tables } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    tables,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    table: null,
  })
}


export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TABLE_REQUEST]: request,
  
  [Types.TABLE_SUCCESS]: success,
  

  [Types.TABLE_FAILURE]: failure,
  
  [Types.TABLE_RESET]: reset,
})
