import { call, put } from 'redux-saga/effects';
import OrderActions from '../reducers/order.reducer'
import { callApi } from './call-api.saga';
import { storeInDb, fetchAll, updateInDb } from '../realm/order'
export function* getOrder(api, action) {
  const { order } = action;
  // success?
  if (order) {
    yield put(OrderActions.orderSuccess(order));
  } else {
    yield put(OrderActions.orderFailure());
  }
}




export function* getOrders(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getOrders, options);
  const response = yield call(fetchAll);
  console.tron.log('resss',response)
  // success?
  if (response.ok) {
    yield put(OrderActions.orderAllSuccess(response.data));

  } else {
    yield put(OrderActions.orderAllFailure(response.data));
  }
}
export function* getAllCustomerOrders(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getOrders, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(OrderActions.orderAllSuccess(response.data));
  } else {
    yield put(OrderActions.orderAllFailure(response.data));
  }
}
export function* saveCustomerOrders(api, action) {
  const { customerOrders } = action;

  // var variantName= '';
  // var varianPrice='';
  // if(customerOrders.isVariant){
  // for(var i=0; i<customerOrders.varients.length;i++){
  //    variantName = variantName + '\n' +customerOrders.varients[i].variantName+': '+customerOrders.varients[i].percentage +'%' ;
  //    varianPrice = varianPrice + '\n' +customerOrders.varients[i].price;
  // }
  // }
  // else {
  //   variantName= customerOrders.varients.variantName+': '+customerOrders.varients.percentage +'%' ;
  //   varianPrice ='$'+customerOrders.varients.price;
  // }

  // const orders = [customerOrders.productName, variantName, varianPrice, '$'+customerOrders.priceTotal];

  console.tron.log('order Stringfly for table',customerOrders);
  // success?
  if (customerOrders != undefined) {
 
    yield put(OrderActions.customerOrderSaveSuccess(customerOrders));
  } else {
     yield put(OrderActions.customerOrderSaveFailure('error'));
  }
}

export function* updateOrder(api, action) {
  const { order } = action;
  // make the call to the api
  const idIsNotNull = !!order.id;
  const apiCall = call(idIsNotNull ? api.updateOrder : api.createOrder, order);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(OrderActions.orderUpdateSuccess(response.data));
    if(idIsNotNull){
      yield put(OrderActions.orderAllRequest({id:order.accountId, tenantId:order.tenantId}));

    }
  } else {
    yield put(OrderActions.orderUpdateFailure(response.data));
  }
}


export function* completeOrder(api, action) {
  const { order } = action;
  // make the call to the api
  const idIsNotNull = !!order.id;
  console.tron.log('order ssss',order);
  const response = yield call(idIsNotNull ? updateInDb : storeInDb, order);

  // success?
  if (response.ok) {
    yield put(OrderActions.completeOrderSuccess(response.data));
  } else {
    yield put(OrderActions.completeOrderFailure(response.data));
  }
}
export function* searchOrders(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchOrders, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(OrderActions.orderSearchSuccess(response.data));
  } else {
    yield put(OrderActions.orderSearchFailure(response.data));
  }
}
export function* deleteOrder(api, action) {
    yield put(OrderActions.orderDeleteSuccess());
}
function mapDateFields(data) {
  if (data.orderDate) {
    data.orderDate = new Date(data.orderDate);
  }
  return data;
}