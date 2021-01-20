import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import AttendenceActions from './attendence.reducer'

export function* getAllAttendence(api, action) {
  const { data } = action
  // make the call to the api
  const apiCall = call(api.getAllAttendence, data)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(AttendenceActions.attendenceAllSuccess(response.data))
  } else {
    yield put(AttendenceActions.attendenceAllFailure(response.data))
  }
}

export function* getAttendence(api, action) {
  const { attendenceId } = action
  // make the call to the api
  const apiCall = call(api.getAttendence, attendenceId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(AttendenceActions.attendenceSuccess(response.data))
  } else {
    yield put(AttendenceActions.attendenceFailure(response.data))
  }
}

export function* CheckIn(api, action) {
    const { checkin } = action
    // make the call to the api
    const apiCall = call(api.checkin, checkin)
    const response = yield call(callApi, apiCall)
    // success?
    if (response.ok) {
      yield put(AttendenceActions.checkInSuccess(response.data))
    } else {
      yield put(AttendenceActions.checkInFailure(response.data))
    }
  }

  export function* CheckOut(api, action) {
    const { checkOut,id } = action
    // make the call to the api
    const apiCall = call(api.checkout, checkOut,id)
    const response = yield call(callApi, apiCall)
  
    // success?
    if (response.ok) {
      yield put(AttendenceActions.checkOutSuccess(response.data))
    } else {
      yield put(AttendenceActions.checkOutFailure(response.data))
    }
  }

  export function* CurrentLocation(api, action) {
    const { location } = action
    // make the call to the api
    const apiCall = call(api.currentLocation, location)
    const response = yield call(callApi, apiCall)
  
    // success?
    if (response.ok) {
      yield put(AttendenceActions.currentLocationSuccess(response.data))
    } else {
      yield put(AttendenceActions.currentLocationFailure(response.data))
    }
  }
 
 