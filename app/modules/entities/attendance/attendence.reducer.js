import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils'
import { parseHeaderForLinks } from '../../../shared/util/url-utils'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  attendenceRequest: ['attendence'],
  checkInRequest:['checkin'],
  checkOutRequest:['checkOut','id'],
  currentLocationRequest:['location'],

  attendenceAllRequest: ['data'],
  imageAllRequest: ['options'],
  attendenceUpdateRequest: ['attendence'],
  attendenceDeleteRequest: ['attendenceId'],

  attendenceSuccess: ['attendence'],
  currentLocationSuccess:[''],
  checkInSuccess:['checkin'],
  checkOutSuccess:['checkOut'],
  imageAllSuccess: ['images'],
  attendenceAllSuccess: ['attendences', 'headers'],
  attendenceUpdateSuccess: ['attendence'],
  attendenceDeleteSuccess: [],

  attendenceFailure: ['error'],
  currentLocationFailure:['error'],
  checkInFailure:['error'],
  checkOutFailure:['error'],
  attendenceAllFailure: ['error'],
  imageAllFailure: ['error'],
  attendenceUpdateFailure: ['error'],
  attendenceDeleteFailure: ['error'],

  attendenceReset: [],
})

export const AttendenceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  checkIn:null,
  checkOut:null,
  updating: null,
  deleting: null,
  attendence: null,
  attendences: [],
  images: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
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
    attendence: null,
  })

export const checkInrequest = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    checkIn: null,
  })

export const checkOutrequest = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    checkOut: null,
  })
  export const currentLocationrequest = (state) =>
  state.merge({
    
  })
// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    errorAll: false,
  })

// request the data from an api
export const allImageRequest = (state) =>
  state.merge({
    fetchingAll: true,
    errorAll: false,
  })
// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updating: true,
    errorUpdating:null,
  })
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true,
  })

// successful api lookup for single entity
export const success = (state, action) => {
  const { attendence } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    attendence,
  })
}

 
// successful api lookup for single entity
export const checkInsuccess = (state, action) => {
    const { checkin } = action
    return state.merge({
      fetchingOne: false,
      errorOne: null,
      checkIn:checkin,
    })
  }
  export const currentLocationsuccess = (state) =>
  state.merge({
    
  })
// successful api lookup for single entity
export const checkOutsuccess = (state, action) => {
    const { checkOut } = action
    return state.merge({
      fetchingOne: false,
      errorOne: null,
      checkOut:checkOut,
      checkIn:null
    })
  }
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { attendences } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    attendences: attendences,
  })
}

// successful api lookup for all entities
export const allImageSuccess = (state, action) => {
  const { images } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    images: images,
  })
}

// successful api update
export const updateSuccess = (state, action) => {
  const { attendence } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    attendence,
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    attendence: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    attendence: null,
  })
}
export const currentLocationfailure = (state) =>
  state.merge({
    
  })
export const checkInfailure = (state, action) => {
    const { error } = action
    return state.merge({
      fetchingOne: false,
      errorOne: error,
      checkIn: null,
    })
  }
export const checkOutfailure = (state, action) => {
    const { error } = action
    return state.merge({
      fetchingOne: false,
      errorOne: error,
      checkOut: null,
      
    })
  }
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    attendences: [],
  })
}
// Something went wrong fetching all entities.
export const allImageFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    images: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    attendence: state.attendence,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    attendence: state.attendence,
  })
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ATTENDENCE_REQUEST]: request,
  [Types.CHECK_IN_REQUEST]: checkInrequest,
  [Types.CHECK_OUT_REQUEST]: checkOutrequest,
  [Types.CURRENT_LOCATION_REQUEST]: currentLocationrequest,

  [Types.ATTENDENCE_ALL_REQUEST]: allRequest,
  [Types.IMAGE_ALL_REQUEST]: allImageRequest,
  [Types.ATTENDENCE_UPDATE_REQUEST]: updateRequest,
  [Types.ATTENDENCE_DELETE_REQUEST]: deleteRequest,

  [Types.ATTENDENCE_SUCCESS]: success,
  [Types.CURRENT_LOCATION_SUCCESS]: currentLocationsuccess,

  [Types.CHECK_IN_SUCCESS]: checkInsuccess,
  [Types.CHECK_OUT_SUCCESS]: checkOutsuccess,

  [Types.IMAGE_ALL_SUCCESS]: allImageSuccess,
  [Types.ATTENDENCE_ALL_SUCCESS]: allSuccess,
  [Types.ATTENDENCE_UPDATE_SUCCESS]: updateSuccess,
  [Types.ATTENDENCE_DELETE_SUCCESS]: deleteSuccess,

  [Types.ATTENDENCE_FAILURE]: failure,
  [Types.CHECK_OUT_FAILURE]: checkOutfailure,
  [Types.CURRENT_LOCATION_FAILURE]: currentLocationfailure,
  [Types.IMAGE_ALL_FAILURE]: allImageFailure,
  [Types.ATTENDENCE_ALL_FAILURE]: allFailure,
  [Types.ATTENDENCE_UPDATE_FAILURE]: updateFailure,
  [Types.ATTENDENCE_DELETE_FAILURE]: deleteFailure,
  [Types.ATTENDENCE_RESET]: reset,
})
