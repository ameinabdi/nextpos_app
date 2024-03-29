import { call, put, select } from 'redux-saga/effects'

import LoginActions from './login.reducer'
import AccountActions from '../../shared/reducers/account.reducer'

export const selectAuthToken = (state) => state.login.authToken
// attempts to login
export function* login(api, { username, password }) {
  const authObj = {
    email: username,
    password: password,
    rememberMe: true,
  }

  const response = yield call(api.login, authObj)

  // success?
  if (response.ok) {
    yield call(api.setAuthToken, response.data)
    yield put(LoginActions.loginSuccess(response.data))
    yield put(AccountActions.accountRequest(response.data,authObj))
    yield put({ type: 'RELOGIN_OK' })
  } else {
    yield put(LoginActions.loginFailure((response.data && response.data.detail) || 'Bad credentials'))
  }
}
// attempts to logout
export function* logout(api) {
  yield call(api.logout)
  yield call(api.removeAuthToken)
  yield put(AccountActions.accountRequest())
  yield put(LoginActions.logoutSuccess())
  yield put({ type: 'RELOGIN_ABORT' })

}
// loads the login
export function* loginLoad(api) {
  const authToken = yield select(selectAuthToken)
  // only set the token if we have it
  if (authToken) {
    yield call(api.setAuthToken, authToken)
  }
  yield put(LoginActions.loginLoadSuccess())
}
