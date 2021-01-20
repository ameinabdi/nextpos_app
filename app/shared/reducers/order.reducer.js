import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
import { Alert } from 'react-native'
import { deleteOrder } from '../sagas/order.saga'
import { Nil } from 'tcomb-form-native/lib'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
	orderRequest: [ 'order' ],
	orderAllRequest: [ 'options' ],
	cleanOrder:[''],
	completeOrderRequest: [ 'order' ],
	customerOrderAllRequest: [ 'options' ],
	customerOrderSave: [ 'customerOrders' ],
	orderUpdateRequest: [ 'order' ],
	orderSearchRequest: [ 'query' ],
	orderDeleteRequest: [ 'orderId' ],
	orderItemDeleteRequest:['deletedOrder'],

	orderSuccess: [ 'order' ],
	orderAllSuccess: [ 'orders' ],
	customerOrderAllSuccess: [ 'customerOrders' ],
	customerOrderSaveSuccess: [ 'customerOrderSave' ],
	completeOrderSuccess: [ 'order' ],

	orderUpdateSuccess: [ 'order' ],
	orderSearchSuccess: [ 'orders' ],
	orderDeleteSuccess: [],

	orderFailure: [ 'error' ],
	orderAllFailure: [ 'error' ],
	orderUpdateFailure: [ 'error' ],
	completeOrderFailure:['error'],

	customerOrderAllFailure: [ 'error' ],
	customerOrderSaveFailure: [ 'error' ],
	orderSearchFailure: [ 'error' ],
	orderDeleteFailure: [ 'error' ]
})

export const OrderTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
	fetchingOne: null,
	fetchingAll: null,
	fetchingAllCustomerOrders: null,
	savingCustomerOrder: null,
	updating: null,
	completedOrderUpdating: null,

	searching: null,
	deleting: null,
	completedOrder:null,
	completedOrderError:null,

	order: null,
	orders: null,
	customerOrders: null,
	orderSummary:null,
	errorOne: null,
	errorAll: null,
	errorAllCustomerOrders: null,
	errorSaveCustomerOrders: null,
	errorUpdating: null,
	errorSearching: null,
	errorDeleting: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
	state.merge({
		fetchingOne: true,
		order:null

	})

// request the data from an api
export const allRequest = (state) =>
	state.merge({
		fetchingAll: true,
		orders:null
	})
export const cleanOrder = (state) =>
	state.merge({
		order: null,
		orders: null,
		customerOrders: null,
	})
	

// request the data from an api
export const completerOrderRequest = (state) =>
	state.merge({
		completedOrderError:null,
		completedOrderUpdating: true,
	})

export const deleteOrderItem = (state, action) =>{
	const { deletedOrder } = action
	let alldOrders = state.customerOrders;
	let order = [];
	neworder = _.reject(alldOrders, function(el) { return el === deletedOrder; });
	order = [...neworder]
	let totalPrice = order.reduce(function(a, b){
        return +a  + +b.productPrice;
	}, 0);
	let totalTax = order.reduce(function(a, b){
        return +a  + +b.productTax;
	}, 0);
	order.totalPrice += totalPrice
	order.totalTax +=totalTax
     console.tron.log('added', order, totalPrice, totalTax)
        order.ordersLineDTOFullList = [].concat(alldOrders,order);
		return state.merge({
			savingCustomerOrder: false,
			errorSaveCustomerOrders: null,
			customerOrders: order,
			orderSummary:{
				totalPrice:totalPrice,
				totalTax:totalTax
			  }
		})
	
}

// request the Date of Customer Requested from ProductLIst
export const customerAllRequest = (state) =>
	state.merge({
		fetchingAllCustomerOrders: true,
		customerOrders: null
	})
export const customerSaveRequest = (state) =>
	state.merge({
		savingCustomerOrder: true,
		
	})

// request to update from an api
export const updateRequest = (state) =>
	state.merge({
		updating: true
	})
// request to search from an api
export const searchRequest = (state) =>
	state.merge({
		searching: true
	})
// request to delete from an api
export const deleteRequest = (state) =>
	state.merge({
		deleting: true,
	})

// successful api lookup for single entity
export const success = (state, action) => {
	const { order } = action
	return state.merge({
		fetchingOne: false,
		errorOne: null,
		customerOrders:order.orderList,
		order
	})
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
	const { orders } = action
	return state.merge({
		fetchingAll: false,
		errorAll: null,
		orders
	})
}

// successful api lookup for all entities
export const completerOrderSuccess = (state, action) => {
	const { order } = action
	return state.merge({
		completedOrderUpdating: false,
		completedOrderError: null,
		customerOrders:null,
		completedOrder:order,

	})
}
//  customer  Orders Requested from Product succesfull
export const customerAllSuccess = (state, action) => {
	const { customerOrders } = action
	return state.merge({
		fetchingAllCustomerOrders: false,
		errorAllCustomerOrders: null,
		customerOrders
	})
}
export const customerSaveSuccess = (state, action) => {
	const { customerOrderSave } = action
	if (state.customerOrders == null) {
		return state.merge({
			savingCustomerOrder: false,
			errorSaveCustomerOrders: null,
			customerOrders: [customerOrderSave],
			orderSummary:{
			  totalPrice:customerOrderSave.price,
			  totalTax:customerOrderSave.tax
			}
		})
	} else {
	let oldOrders = state.customerOrders;
	var index = _.find(oldOrders, {id: customerOrderSave.id , productName:customerOrderSave.productName, variantName:customerOrderSave.variantName ? customerOrderSave.variantName : null });
	let order = [];
	if(index){
	const neworder=	oldOrders.map((item, indexs) => {
		return item.id === customerOrderSave.id && item.variantName === customerOrderSave.variantName  ? customerOrderSave : item
	})
		order = [...neworder]
	}else{
		order = [...oldOrders,customerOrderSave]
	}
	let totalPrice = order.reduce(function(a, b){
        return +a  + +b.productPrice;
	}, 0);
	let totalTax = order.reduce(function(a, b){
        return +a  + +b.productTax;
	}, 0);
	order.totalPrice += totalPrice
	order.totalTax +=totalTax
        order.ordersLineDTOFullList = [].concat(oldOrders,order);
		return state.merge({
			savingCustomerOrder: false,
			errorSaveCustomerOrders: null,
			customerOrders: order,
			orderSummary:{
				totalPrice:totalPrice,
				totalTax:totalTax
			  },
		})
	}
}
// successful api update
export const updateSuccess = (state, action) => {
	const { order } = action
	return state.merge({
		updating: false,
		errorUpdating: null,
		order
	})
}
// successful api search
export const searchSuccess = (state, action) => {
	const { orders } = action
	return state.merge({
		searching: false,
		errorSearching: null,
		orders
	})
}
// successful api delete
export const deleteSuccess = (state) =>
	state.merge({
		deleting: false,
		errorDeleting: null,
		customerOrders: null
	})

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
	const { error } = action
	return state.merge({
		fetchingOne: false,
		errorOne: error,
		order: null
	})
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
	const { error } = action
	return state.merge({
		fetchingAll: false,
		errorAll: error,
		orders: null
	})
}


// Something went wrong fetching all entities.
export const completerOrderFailure = (state, action) => {
	const { error } = action
	return state.merge({
		completedOrderUpdating: false,
		completedOrderError: error,
		completedOrder: null
	})
}

export const customerSaveFailure = (state, action) => {
	const { error } = action
	return state.merge({
		savingCustomerOrder: false,
		errorSaveCustomerOrders: error,
		customerOrders: null,
		order:null,
	})
}
export const customerAllFailure = (state, action) => {
	const { error } = action
	return state.merge({
		fetchingAllCustomer: false,
		errorAllCustomer: error,
		customerOrders: null
	})
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
	const { error } = action
	return state.merge({
		updating: false,
		errorUpdating: error,
		order: state.order
	})
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
	const { error } = action
	return state.merge({
		deleting: false,
		errorDeleting: error,
		customerOrders: state.customerOrders
	})
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
	const { error } = action
	return state.merge({
		searching: false,
		errorSearching: error,
		orders: null
	})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[Types.ORDER_REQUEST]: request,
	[Types.ORDER_ALL_REQUEST]: allRequest,
	[Types.COMPLETE_ORDER_REQUEST]: completerOrderRequest,
	[Types.CLEAN_ORDER]: cleanOrder,

	
	[Types.CUSTOMER_ORDER_ALL_REQUEST]: customerAllRequest,
	[Types.CUSTOMER_ORDER_SAVE]: customerSaveRequest,
	[Types.ORDER_UPDATE_REQUEST]: updateRequest,
	[Types.ORDER_SEARCH_REQUEST]: searchRequest,
	[Types.ORDER_DELETE_REQUEST]: deleteRequest,
	[Types.ORDER_ITEM_DELETE_REQUEST]: deleteOrderItem,

	[Types.ORDER_SUCCESS]: success,
	[Types.ORDER_ALL_SUCCESS]: allSuccess,
	[Types.COMPLETE_ORDER_SUCCESS]: completerOrderSuccess,

	[Types.CUSTOMER_ORDER_ALL_SUCCESS]: customerAllSuccess,
	[Types.CUSTOMER_ORDER_SAVE_SUCCESS]: customerSaveSuccess,
	[Types.ORDER_UPDATE_SUCCESS]: updateSuccess,
	[Types.ORDER_SEARCH_SUCCESS]: searchSuccess,
	[Types.ORDER_DELETE_SUCCESS]: deleteSuccess,

	[Types.ORDER_FAILURE]: failure,
	[Types.ORDER_ALL_FAILURE]: allFailure,
	[Types.COMPLETE_ORDER_FAILURE]: completerOrderFailure,

	[Types.CUSTOMER_ORDER_ALL_FAILURE]: customerAllFailure,
	[Types.CUSTOMER_ORDER_SAVE_FAILURE]: customerSaveFailure,
	[Types.ORDER_UPDATE_FAILURE]: updateFailure,
	[Types.ORDER_SEARCH_FAILURE]: searchFailure,
	[Types.ORDER_DELETE_FAILURE]: deleteFailure
})