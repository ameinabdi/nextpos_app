import { call, put } from 'redux-saga/effects'

import AccountActions from '../reducers/account.reducer'
import { callApi } from './call-api.saga'
import { storeInDbAccount, fetchAll,deleteInDbAccount, updateInDbAccount } from '../realm/account';

// attempts to account
export function* getAccount(api,action) {
  const { token, Auth } = action
  const response = yield call(api.getAccount)

  // success?
  if (response.ok) {
    if (token) {
      console.tron.log('Account - OK')
      yield call(storeInDbAccount, response.data, token,Auth)
    }
    yield put(AccountActions.accountSuccess(response.data, Auth))

  } else {
    console.tron.log('Account - FAIL')
    yield call(api.removeAuthToken)
    yield put(AccountActions.accountFailure((response.data && response.data.detail) || 'Failed to get account'))
  }
}

// attempts to account
export function* getAccounts(api, action) {
  const response = yield call(fetchAll)
  // success?
  if (response.ok) {
    yield put(AccountActions.accountsSuccess(response.data))
  } else {
    yield put(AccountActions.accountsFailure(response.error))
  }
}

// attempts to update account settings
export function* updateAccount(api, action) {
  const { account } = action
  const apiCall = call(api.updateAccount, account)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    console.tron.log('AccountUpdate - OK')
    yield put(AccountActions.accountUpdateSuccess())
  } else {
    console.tron.log('AccountUpdate - FAIL')
    yield put(AccountActions.accountUpdateFailure((response.data && response.data.detail) || 'Failed to update account'))
  }
}

// attempts to update account settings
export function* setPineAccount(api, action) {
  const { pin } = action
  const apiCall = call(api.setPinAccount, pin)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    console.tron.log('AccountUpdate - OK')
    yield put(AccountActions.accountUpdateSuccess(response.data))
  } else {
    console.tron.log('AccountUpdate - FAIL')
    yield put(AccountActions.accountUpdateFailure(response.data.error || 'Failed to update account'))
  }
}

export function* switchAccount(api, action) {
  const { account } = action
  if (account) {
    yield call(api.setAuthToken, account.token)
    yield put(AccountActions.switchAccountSuccess(account))
  }else{
    yield put(AccountActions.switchAccountFailure())
  }
  
  // success?
  
}

export function* lockScreen(api, action) {
  
  yield call(api.removeAuthToken)
  // success?
  
}

