import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import ProductActions from './product.reducer'

export function* getProduct(api, action) {
  const { productId } = action
  // make the call to the api
  const apiCall = call(api.getProduct, productId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(ProductActions.productSuccess(response.data))
  } else {
    yield put(ProductActions.productFailure(response.data))
  }
}

export function* getProducts(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getProducts, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ProductActions.productAllSuccess(response.data))
  } else {
    yield put(ProductActions.productAllFailure(response.data))
  }
}

export function* updateProduct(api, action) {
  const { product } = action
  // make the call to the api
  const idIsNotNull = !!product.id
  const apiCall = call(idIsNotNull ? api.updateProduct : api.createProduct, product)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(ProductActions.productUpdateSuccess(response.data))
  } else {
    yield put(ProductActions.productUpdateFailure(response.data))
  }
}

export function* searchProducts(api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchProducts, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ProductActions.productSearchSuccess(response.data))
  } else {
    yield put(ProductActions.productSearchFailure(response.data))
  }
}
export function* deleteProduct(api, action) {
  const { productId } = action
  // make the call to the api
  const apiCall = call(api.deleteProduct, productId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ProductActions.productDeleteSuccess())
  } else {
    yield put(ProductActions.productDeleteFailure(response.data))
  }
}
function mapDateFields(data) {
  if (data.dateCreated) {
    data.dateCreated = new Date(data.dateCreated)
  }
  return data
}
