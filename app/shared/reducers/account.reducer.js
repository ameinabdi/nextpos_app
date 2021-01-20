import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  accountRequest: ['token','Auth'],
  accountsRequest: [''],

  setLockRequest:['pin'],
  switchAccountRequest:['account'],
  removeCurrentAccount:[],
  accountsSuccess: ['accounts'],
  accountsFailure: ['error'],

  accountSuccess: ['account','auth'],
  accountFailure: ['error'],
  setLockSuccess:['pin'],
  lockScreen:[''],
  switchAccountSuccess:['account'],

  accountUpdateRequest: ['account'],
  accountUpdateSuccess: [],
  accountUpdateFailure: ['error'],
  setLockFailure:['error'],
  switchAccountFailure:['error']
})

export const AccountTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  lockpin:null,
  account: null,
  accountToken:null,
  accounts: [],
  currency:null,
  error: null,
  errorAll: null,
  fetching: false,
  fetchingAll: false,
  updating: false,
})

/* ------------- Reducers ------------- */

// we're attempting to account
export const request = (state,data) => {
  const { token } = data;
  if(token){
    return state.merge({ fetching: true, account: null, accountToken:token})
  }
    return state.merge({ fetching: true, account: null})
}

// we're attempting to account
export const requestAll = (state) => {
    return state.merge({ fetchingAll: true, accounts:null})
}
export const removeCurrentAccount= (state) => state.merge({ account: null,currency:null })

export const setRequest = (state) => state.merge({ fetching: true,})
export const switchAccountRequest = (state) => state.merge({ fetching: true, account: null,})
export const lockScreen = (state) => state.merge({ fetching: false, account: null,  error: null,  accountToken:null,})


// we've successfully logged in
export const success = (state, data) => {
  const { account,auth } = data;
	// if (state.accounts == null) {
  //    const fullAccount = {
  //      ...account,
  //      password:auth.password
  //    }
  return state.merge({ fetching: false, error: null, account,currency:account.shop ? account.shop.currency   :null })
	// } else {
	// let oldAccounts = state.accounts;
	// var index = _.find(oldAccounts, {id: account.id });
	// let allAcounts = [];
	// if(index){
	// const newAccount=	oldAccounts.map((item, indexs) => {
	// 	return item.id === account.id  ? {...account, password:item.password} : item
	// })
  // allAcounts = [...newAccount]
	// }else{
	// 	allAcounts = [...oldAccounts,{...account, password:auth.password}]
	// }
  // return state.merge({ fetching: false, error: null,accounts: allAcounts, account,currency:account.shop ? account.shop.currency   :null })
	// }
}

// successful api lookup for all entities
export const successAll = (state, action) => {
  const { accounts } = action
  
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    accounts,
  })
}


export const switchAccountSuccess = (state, data) => {
  const { account } = data
  return state.merge({ fetching: false, error: null, account,currency:account.shop ? account.shop.currency   :null })
}

export const Locksuccess = (state, data) => {
  const { lockpin } = data
  return state.merge({ fetching: false, error: null, lockpin:true })
}


// we've had a problem getting the account
export const failure = (state, { error }) => state.merge({ fetching: false, updating: false, account: null, error })


export const failureAll = (state, { error }) => state.merge({ fetchingAll: false, updating: false, accounts: [], errorAll:error })


export const switchAccountfailure = (state, { error }) => state.merge({ fetching: false, updating: false, account: null, error })

export const Lockfailure = (state, { error }) => state.merge({ fetching: false,lockpin:null, updating: false, error })

// we're attempting to updating account settings
export const updateRequest = (state) => state.merge({ updating: true })

// we've successfully updated the account settings
export const updateSuccess = (state) => state.merge({ error: null, updating: false })

// we've had a problem updating the account settings
export const updateFailure = (state, { error }) => state.merge({ updating: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACCOUNT_REQUEST]: request,
  [Types.ACCOUNTS_REQUEST]: requestAll,

  [Types.SWITCH_ACCOUNT_REQUEST]: switchAccountRequest,
  [Types.SWITCH_ACCOUNT_SUCCESS]: switchAccountSuccess,
  [Types.SWITCH_ACCOUNT_FAILURE]: switchAccountfailure,
  [Types.REMOVE_CURRENT_ACCOUNT]: removeCurrentAccount,
  [Types.LOCK_SCREEN]: lockScreen,
  [Types.ACCOUNT_SUCCESS]: success,
  [Types.ACCOUNTS_SUCCESS]: successAll,

  [Types.ACCOUNT_FAILURE]: failure,
  [Types.ACCOUNTS_FAILURE]: failureAll,

  [Types.SET_LOCK_REQUEST]: setRequest,
  [Types.SET_LOCK_SUCCESS]: Locksuccess,
  [Types.SET_LOCK_FAILURE]: Lockfailure,
  [Types.ACCOUNT_UPDATE_REQUEST]: updateRequest,
  [Types.ACCOUNT_UPDATE_SUCCESS]: updateSuccess,
  [Types.ACCOUNT_UPDATE_FAILURE]: updateFailure,
})

/* ------------- Selectors ------------- */
// Is the current user logged in?
export const isLoggedIn = (accountState) => accountState.account !== null

export const getLogin = (accountState) => (accountState.account !== null ? accountState.account.login : 'anonymousUser')
