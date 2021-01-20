import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import TableActions from './table-redux'



export function* getTables(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getTables, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TableActions.tableSuccess(response.data))
  } else {
    yield put(TableActions.tableFailure(response.data))
  }
}


