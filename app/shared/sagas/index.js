import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'
import FixtureAPI from '../services/fixture-api'
import DebugConfig from '../../config/debug-config'

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer'
import { LoginTypes } from '../../modules/login/login.reducer'
import { AccountTypes } from '../../shared/reducers/account.reducer'
import { RegisterTypes } from '../../modules/account/register/register.reducer'
import { ForgotPasswordTypes } from '../../modules/account/password-reset/forgot-password.reducer'
import { ChangePasswordTypes } from '../../modules/account/password/change-password.reducer'
import { UserTypes } from '../../shared/reducers/user.reducer'
import { CategoryTypes } from '../../modules/entities/category/category.reducer'
import { ProductTypes } from '../../modules/entities/product/product.reducer'
import { OrderTypes } from '../reducers/order.reducer'
import { AttendenceTypes } from '../../modules/entities/attendance/attendence.reducer'

import { CustomerTypes } from '../../modules/entities/customer/customer.reducer'
import { TableTypes } from '../../modules/entities/table/table-redux'
// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga'
import { login, logout, loginLoad } from '../../modules/login/login.sagas'
import { register } from '../../modules/account/register/register.sagas'
import { forgotPassword } from '../../modules/account/password-reset/forgot-password.sagas'
import { changePassword } from '../../modules/account/password/change-password.sagas'
import { getAccount,getAccounts, updateAccount, setPineAccount , switchAccount,lockScreen} from '../../shared/sagas/account.sagas'
import { getUser, getUsers, updateUser, deleteUser } from '../../shared/sagas/user.sagas'
import {
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  searchCategories,
} from '../../modules/entities/category/category.sagas'
import {
  getOrder,
  getOrders,
  updateOrder,
  completeOrder,
  deleteOrder,
  searchOrders,
  saveCustomerOrders,
  getAllCustomerOrders,
} from './order.saga'
import { getProduct, getProducts, updateProduct, deleteProduct, searchProducts } from '../../modules/entities/product/product.sagas'
import { getAttendence, CheckIn, CheckOut, CurrentLocation, getAllAttendence } from '../../modules/entities/attendance/attendence.saga'

import { getCustomer, getCustomers, updateCustomer, deleteCustomer, searchCustomers } from '../../modules/entities/customer/customer.sagas'
import { getTables } from '../../modules/entities/table/table-saga'

// ignite-jhipster-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),

    takeLatest(CategoryTypes.CATEGORY_REQUEST, getCategory, api),
    takeLatest(CategoryTypes.CATEGORY_ALL_REQUEST, getCategories, api),
    takeLatest(CategoryTypes.CATEGORY_UPDATE_REQUEST, updateCategory, api),
    takeLatest(CategoryTypes.CATEGORY_DELETE_REQUEST, deleteCategory, api),
    takeLatest(CategoryTypes.CATEGORY_SEARCH_REQUEST, searchCategories, api),

    takeLatest(ProductTypes.PRODUCT_REQUEST, getProduct, api),
    takeLatest(ProductTypes.PRODUCT_ALL_REQUEST, getProducts, api),
    takeLatest(ProductTypes.PRODUCT_UPDATE_REQUEST, updateProduct, api),
    takeLatest(ProductTypes.PRODUCT_DELETE_REQUEST, deleteProduct, api),
    takeLatest(ProductTypes.PRODUCT_SEARCH_REQUEST, searchProducts, api),

    takeLatest(AttendenceTypes.ATTENDENCE_REQUEST, getAttendence, api),
    takeLatest(AttendenceTypes.ATTENDENCE_ALL_REQUEST, getAllAttendence, api),
    takeLatest(AttendenceTypes.CHECK_IN_REQUEST, CheckIn, api),
    takeLatest(AttendenceTypes.CHECK_OUT_REQUEST, CheckOut, api),
    takeLatest(AttendenceTypes.CURRENT_LOCATION_REQUEST, CurrentLocation, api),

    takeLatest(CustomerTypes.CUSTOMER_REQUEST, getCustomer, api),
    takeLatest(CustomerTypes.CUSTOMER_ALL_REQUEST, getCustomers, api),
    takeLatest(CustomerTypes.CUSTOMER_UPDATE_REQUEST, updateCustomer, api),
    takeLatest(CustomerTypes.CUSTOMER_DELETE_REQUEST, deleteCustomer, api),
    takeLatest(CustomerTypes.CUSTOMER_SEARCH_REQUEST, searchCustomers, api),

    takeLatest(TableTypes.TABLE_REQUEST, getTables, api),

    // ignite-jhipster-saga-redux-connect-needle

    takeLatest(OrderTypes.ORDER_REQUEST, getOrder, api),
    takeLatest(OrderTypes.ORDER_ALL_REQUEST, getOrders, api),
    takeLatest(OrderTypes.COMPLETE_ORDER_REQUEST, completeOrder, api),

    takeLatest(OrderTypes.ORDER_UPDATE_REQUEST, updateOrder, api),
    takeLatest(OrderTypes.ORDER_DELETE_REQUEST, deleteOrder, api),
    takeLatest(OrderTypes.ORDER_SEARCH_REQUEST, searchOrders, api),
    takeLatest(OrderTypes.CUSTOMER_ORDER_SAVE, saveCustomerOrders, api),
    takeLatest(OrderTypes.CUSTOMER_ORDER_ALL_REQUEST, getAllCustomerOrders, api),

    takeLatest(UserTypes.USER_REQUEST, getUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, getUsers, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, deleteUser, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNTS_REQUEST, getAccounts, api),

    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api),
    takeLatest(AccountTypes.SET_LOCK_REQUEST, setPineAccount, api),
    takeLatest(AccountTypes.SWITCH_ACCOUNT_REQUEST, switchAccount, api),
    takeLatest(AccountTypes.LOCK_SCREEN, lockScreen, api),

    
  ])
}
