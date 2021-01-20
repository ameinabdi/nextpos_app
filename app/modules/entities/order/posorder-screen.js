import React, { Component } from 'react'
import { StyleSheet, View, Alert,ScrollView, FlatList, Text,Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Row, Col, Button, Title, Left, Body, Header, Right, Card,CardItem } from 'native-base'
import OrderActions from '../../../shared/reducers/order.reducer';
import AccountActions from '../../../shared/reducers/account.reducer';
import LoginActions from '../../login/login.reducer';

import styles from './OrderListStyle'
import AlertMessage from '../../../shared/components/alert-message/alert-message'
import Icon from 'react-native-vector-icons/AntDesign'
// import { isPhone } from 'react-native-device-detection'
import _ from 'lodash'
import { Colors,Images } from '../../../shared/themes'
 // import payment from '../Payments/PaymentGateway/PaymentGatewayNativeModule'
// import PaymentMethodsModal from '../../../Components/POS/Orders/PaymentMethodsModal'
import { Navigation } from 'react-native-navigation'
import {paymentScreen, switchAccountScreen} from '../../../navigation/layouts'
import moment from 'moment';
import {
    USBPrinter,
  } from "react-native-thermal-receipt-printer";
import InputSpinner from "react-native-input-spinner";
import Modal from 'react-native-modal';
import Icons from 'react-native-vector-icons/Feather'
import CustomerComponent from '../customer/customer-component'
import TableComponent from '../table/table-component'


class PosOrderScreen extends React.PureComponent {
	static getDerivedStateFromProps(nextProps, prevState) {
		// do things with nextProps.someProp and prevState.cachedSomeProp
		if (prevState.tableData !== nextProps.customerOrders) console.tron.log('hawl kale', nextProps.customerOrders)
		return {
			tableData: nextProps.customerOrders,
			order: nextProps.customerOrders,
			orderSummary:nextProps.orderSummary,
		}
	}
	constructor(props) {
		super(props)

		this.state = {
			tableData: [],
			order: null,
			orderSummary:null,
			isModalVisible: false,
			customer:null,
			Selectedtable:null,
			tableModal:false
		}
		this.onCancel = this.onCancel.bind(this)
		this.customer = this.customer.bind(this)
		this.selectedTable = this.selectedTable.bind(this)

	}
	// functions
	_deleteOrders = (id) => {
		this.props.orderDelete(id)
	}

	onCancel() {
		this.setState({ isModalVisible: false })
	}
	selectedTable = (selectedItem)  =>{
		this.setState({Selectedtable:selectedItem,isModalVisible:!this.state.isModalVisible })
	  }
   handlepressRefund = (methods) =>{
	 const { account } = this.props
	 const data =  {
		...this.props.order,
		orderList: this.props.order.orderList.map((items)=>{
			const oderList ={
				...items,
				id:items.orderItemId,
				
			}
			return oderList
		}),
		totalPrice:_.sumBy(this.state.order, function(o) {
			const tax = parseFloat(o.productTax ? o.productTax.percentage/100:o.Percentage/100)
			const productwithTax = parseFloat(o.productPrice)+tax
			return parseFloat(productwithTax*o.quantity); }).toFixed(2),
		quantity:_.sumBy(this.state.order, function(o) {
			return o.quantity }),
		totalTax:_.sumBy(this.state.order, function(o) {
			const tax = parseFloat(o.productTax ? o.productTax.percentage/100:o.Percentage/100)
			return tax }).toFixed(2),
		orderStatus: 'REFUNDED',
		orderItems:this.state.tableData.map((items)=>{
			const oderitem ={
				id:items.id,
				orderItemName:items.productName,
				ordetItemQuantity:items.quantity,
				ordetItemPrice:items.productPrice,
			    orderItemTax:parseFloat(items.Percentage/100).toFixed(2),
				product:items.product,
				orderItemPercentage:items.Percentage,
				orderItemTaxId:items.orderItemTaxId
			}
			return oderitem
		}),
		updatedAt:moment().format(),
		customer:this.props.order.customerId,
		table:this.props.order.tableId,
		tenantId:account.tenants ? account.tenants[0].tenantId : null, 
		payment: this.props.order.payment ? this.props.order.payment.id : null,
		accountId:account.id,
		shop:this.props.order.shopId
	}
	console.tron.log('order', data)
	this.props.CompleteOrder(data)
	this.props.cleanOrder()
}
handlepressSave = () =>{
	const { account } = this.props;
	const { customer, order,Selectedtable } = this.state
	if(customer && Selectedtable){
		const data =  {
			title:'Not Paid Order',
			totalPrice:_.sumBy(order, function(o) {
				const tax = parseFloat(o.productTax ? o.productTax.percentage/100:0)
				const productwithTax = parseFloat(o.productPrice)+tax
				return parseFloat(productwithTax*o.quantity); }).toFixed(2),
			quantity:_.sumBy(order, function(o) {
				return o.quantity }),
			totalTax:_.sumBy(order, function(o) {
				const tax = parseFloat(o.productTax ? o.productTax.percentage/100:0)
				return tax }).toFixed(2),
			orderStatus: 'PENDING',
			note: null,
			orderItems:
				order.map((items)=>{
					const oderitem ={
						orderItemName:items.productName,
						ordetItemQuantity:items.quantity,
						ordetItemPrice:items.productPrice,
						OrderItemTax:items.productTax ? items.productTax.amount : null,
						product:items.id,
						orderItemTax:items.productTax ? items.productTax.id :null
					}
					return oderitem
				}),
			 tenantId:account.tenants ? account.tenants[0].tenantId : null,
			 shop:account.shopId,
			 createdById:account.id,
			 updatedById:account.id,
			 createdAt:moment().format('L'),
			 updatedAt:moment().format('L'),
			 customer:customer ? customer.id   : null  ,
			 table: Selectedtable ? Selectedtable.id :null
		}
	   console.tron.log('save order', Selectedtable)
	   this.props.CompleteOrder(data)
	   this.props.cleanOrder()
	   this.setState({customer:null,Selectedtable:null})
	}else{
		Alert.alert(
			'Sorry Orders?',
			'Please Select Customer And Table Order?',
			[
			  { text: 'Cancel', style: 'cancel' },
			  
			],
			{ cancelable: false },
		  )
	}
	
}
   onDeleteItem = (item) =>{
	  console.tron.log('added',item)
	  this.props.orderItemDelete(item)
   }
   
 cleanOrder = () =>{
    Alert.alert(
      'Delete Orders?',
      'Are you sure you want to delete All Orders?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
			this.props.cleanOrder()
		},
        },
      ],
      { cancelable: false },
    )
  }

  
  printOrder = async ()=>{
	try {
	const {account,currency,order } = this.props;
	USBPrinter.printBill(`
	<C>
	<CD>Receipt Paper</CD>\n
	<CD>${account.shop ? account.shop.shopName : ''}</CD>\n
	<CD>${account.paymentMethod ? account.paymentMethod.paymentMethod +': '+account.paymentMethod.account : ''}</CD>\n
	${account.shop ? account.shop.paymentMethod ? account.shop.paymentMethod.map((item)=>{
		return `
		<C>${item.paymentMethod + ': ' + item.account } </C>`;
	 }):'':''}
	<C> ${order.table ? order.table.table :''}</C>
	<C>${moment(Date.now()).format('LLL')}</C>\n
	<C>item Name    Quantity   Price    Total</C>\n
	-------------------------------------\n
	${this.state.tableData.map((item)=>{
	return `
	<C>${item.productName + '   ' + item.quantity + '   *   ' + item.productPrice + '  ' + (item.quantity * item.productPrice)} </C>\n`;
	})}
	-------------------------------------\n
	<C>Tax: $ ${_.sumBy(this.state.order, function(o) { return parseFloat(o.productTax ? o.productTax.percentage/100:0); }).toFixed(2)}</C>\n
	<C>Total: $ ${_.sumBy(this.state.order, function(o) {
		const tax = parseFloat(o.productTax ? o.productTax.percentage/100:0)
		const productwithTax = parseFloat(o.productPrice)+tax
		return parseFloat(productwithTax*o.quantity); }).toFixed(2)}</C>\n
	<C>Total: ${ currency.currencyIso+' '+_.sumBy(this.state.order, function(o) {
                  const tax = parseFloat(o.productTax ? o.productTax.percentage/100:0)
                  const productwithTax = parseFloat(o.productPrice)+tax
                    return parseFloat(productwithTax*o.quantity)*currency.shillingRate })}</C>\n

	<C>www.nextpos.so</C>\n
	<C>${moment(Date.now()).format('YYYY')}</C>\n

	</C>\n
	`)
	
	} catch (err) {
		Alert.alert('No Printer Is Connected!  Please Connect Printer',)
	}
  }
  lockScreen = () =>{
	this.props.logout()
	switchAccountScreen()
  }

  addCustomer = (data)=>{
	  this.setState({isModalVisible:!this.state.isModalVisible, tableModal:data})
  }
 
  customer = (customer)=>{
	this.setState({customer})
	this.addCustomer()
}
	//render row Draw Table
	_renderRow = ({ item ,index}) => {
		return (
			<Row style={styles.row}>
				<Col style={styles.colNo} >
					<Text style={styles.label}>{index+1}</Text>
				</Col>
				<Col style={styles.colName} >
					<Text style={[styles.label, {width:100, marginRight:10, textAlign:'left', fontWeight:'600'}]} numberOfLines={1}>{item.productName}</Text>
					{ item.variantName ?
						<Text style={[styles.label,{width:100,color:Colors.secondary,fontSize:16}]} numberOfLines={1}>{item.variantName}</Text>
					 :
					 null
					}
				
				</Col>
				{!this.props.noPaybutton ?
				<Col style={styles.colVaraint}>
				
				<InputSpinner
					max={item.productQuantity}
					min={1}
					step={1}
					colorLeft={Colors.secondary}
					colorRight={Colors.secondary}
					background={Colors.white}
					colorMax={"#f04048"}
					colorMin={"#40c5f4"}
					rounded={false}
					style={{width:120, height:40,color:Colors.secondary}}
					buttonStyle={{borderRadius:10, width:40, height:40,}}
					value={item.quantity}
					onChange={(num) =>  this.props.AddOrderSave({...item, quantity:num})}
				/>
				
				<Icon name="close" color={Colors.charcoal} style={{marginLeft:20,marginRight:10,}} size={16}/>
				
				</Col>
				 : 
				 <Col style={styles.colVaraint}>
					 <Text style={[styles.label,{ textAlign:'center',fontSize:18}]}>{item.quantity}</Text>
					 <Icon name="close" color={Colors.charcoal} style={{marginLeft:10,marginRight:0,}} size={16}/>

				 </Col>
				 }
				<Col style={styles.colPrice}><Text style={[styles.label,{ textAlign:'center',fontSize:18}]}>{item.productPrice}</Text></Col>
				<Col style={styles.colPrice}>
					<Text style={[styles.label,{ fontWeight:'bold', textAlign:'center',fontSize:20}]}>{(item.productPrice*item.quantity).toFixed(2)}</Text>
				</Col>
				{!this.props.noPaybutton ?
				<Col style={styles.colAction}> 
					<Button iconLeft transparent onPress={()=>this.onDeleteItem(item)}>
						<Icon name="close" color={Colors.charcoal} size={20}/>
					</Button>
			   </Col>
			   :
			   <Col style={styles.colAction}> 
			   </Col>
			   }
			</Row>
		)
	}
	//Header
	_renderHeader = () => {
		return (
			<View style={styles.headerContainer}>
				<Row style={styles.headRow}>
					<Col style={styles.colNo}>
						<Text style={styles.boldLabel}>No</Text>
					</Col>
					<Col style={styles.colName}>
						<Text style={styles.boldLabel}>Item Name</Text>
					</Col>
					<Col style={styles.colVaraint}>
						<Text style={styles.boldLabel}>Quantity</Text>
					</Col>
					<Col style={styles.colPrice}>
						<Text style={styles.boldLabel}>Price</Text>
					</Col>
					<Col style={styles.colPrice}>
						<Text style={styles.boldLabel}>Total</Text>
					</Col>
					<Col style={styles.colAction}>
					</Col>
				</Row>
			</View>
		)
	}
	_renderSummery = (item) => {
		return (
			<View style={styles.summeryContainer}>
				<Row style={styles.summeryRow}>
					<Col style={styles.colSum}>
						<Row>
							  <Text style={styles.Total}>
								Tax:{' '}
							  </Text>
							   <Text style={styles.TotalNumber}>
							   $	{_.sumBy(this.state.order, function(o) { return parseFloat(o.productTax ? o.productTax.percentage/100 : o.Percentage/100)}).toFixed(2)}
							    </Text>
						</Row>
					</Col>
					<Col style={styles.colSum}>
						<Row>
							<Text style={styles.Total}>
								Total:{' '}
								<Text style={styles.TotalNumber}>
								 $	{_.sumBy(this.state.order, function(o) { return parseFloat(o.productPrice*o.quantity); }).toFixed(2)}
								</Text>
							</Text>
						</Row>
						
					</Col>
					
				</Row>
				<View style={styles.summerButtonsContainer}>
				<Row>
							<Text style={styles.summeryText}>
								Grand-Total:{' '}
								<Text style={styles.summeryPrice}>
								$ {_.sumBy(this.state.order, function(o) {
										const tax = parseFloat(o.productTax ? o.productTax.percentage/100:o.Percentage/100)
										const productwithTax = parseFloat(o.productPrice)+tax
										return parseFloat(productwithTax*o.quantity); }).toFixed(2)}
								</Text>
							</Text>
					</Row>
				</View>
				<View style={styles.summerButtonsContainer}>
				{!this.props.noPaybutton ? 
                    <Row>
						{this.state.order == null ?
						
						<Button  style={styles.summerButtonPay} disabled>
                            <Text style={styles.summeryButtonTextPay}>No Item Selected</Text>
						</Button>
						
						:
						<View style={{flex:1,height:70}}>
						{ this.props.order && this.state.tableData[0] ? 
						 <Button onPress={() =>this.handlepressRefund(this.state.order)} style={[styles.summerButtonPay,{backgroundColor:Colors.secondary}]} transparent>
                            <Icons  name="edit" size={25} color={Colors.white} />
                            <Text style={styles.summeryButtonTextPay}>Update</Text>
						</Button>
						:
						<Row>
							<Col>
							<Button onPress={() => {
								paymentScreen(this.state.order, this.state.customer)
								this.setState({customer:null})}} style={[styles.summerButtonPay,{width:'100%'}]} transparent>
							<Icons name="dollar-sign"  size={30} color={Colors.white} />
							<Text style={styles.summeryButtonTextPay}>Charge</Text>
							</Button>
							</Col>
							<Col>
							<Button onPress={() =>this.handlepressSave(this.state.order, this.state.customer)} style={[styles.summerButtonPay,{width:'100%', backgroundColor:Colors.secondary}]} transparent>
							<Icons name="pocket"  size={30} color={Colors.white} />
							<Text style={styles.summeryButtonTextPay}>Save</Text>
							</Button>
							</Col>
						</Row>
                       }
						</View>
						}
                    </Row>
					:null}
				</View>
				
			</View>
		)
	}

	// Show this when data is empty
	renderEmpty = () => <AlertMessage title="No Orders Found" show={!this.props.fetching} />
	
	navigationButtonPressed({ buttonId }) {
		this.cleanOrder()
	  }
	keyExtractor = (item, index) => String(index)

	// How many items should be kept im memory as we scroll?
	oneScreensWorth = 20
	// () {
	// 	console.tron.log(this.props.customerOrders)
	//
	// }


	render() {
		const {customer,tableModal} = this.state
		const { account } = this.props;
        console.tron.log('waiter',)
		return (
			<View style={styles.container}>
				{!this.props.noPaybutton ? 
				<View style={styles.header}>
						<Left>
						<Row >
						<Col style={styles.buttonCol}>
						<Button transparent onPress={()=>this.cleanOrder()}>
							<Image source={Images.clear} style={{color:Colors.white, width:20, height:20}}/>
						</Button>
						</Col>
						<Col style={styles.buttonCol}>
						<Button transparent onPress={()=>this.lockScreen()}>
							<Image source={Images.lock} style={{color:Colors.white, width:20, height:20}}/>
						</Button>
						</Col>
						</Row>
						</Left>
						<Body>
							<Text style={styles.title}>Order List</Text>
						</Body>
						<Right>
						
						<Row >
						<Col style={styles.buttonCol}>
						<Button transparent onPress={()=>this.addCustomer()}>
							<Image source={Images.customer} style={{color:Colors.white, width:20, height:20}}/>
						</Button>
						</Col>
						<Col style={styles.buttonCol}>
						<Button transparent onPress={()=>this.addCustomer({data:true})}>
							<Image source={Images.table} style={{color:Colors.white, width:20, height:20}}/>
						</Button>
						</Col>
						<Col style={styles.buttonCol}>
						{ this.props.order && this.state.tableData[0] ? 
						<Button transparent onPress={()=>this.printOrder()}>
							<Image source={Images.printer} style={{color:Colors.white, width:20, height:20}}/>
						</Button>
						:null}
						</Col>
						</Row>
						</Right>
				</View>
				:null}
				<View style={styles.table}>
					<FlatList
						contentContainerStyle={styles.listContent}
						data={this.state.tableData}
						renderItem={this._renderRow}
						keyExtractor={this.keyExtractor}
						initialNumToRender={this.oneScreensWorth}
						onEndThreshold={100}
						ListHeaderComponent={this._renderHeader}
						ListEmptyComponent={this.renderEmpty}
						ItemSeparatorComponent={this.renderSeparator}
					/>
				</View>

				<View style={styles.summery}>{this._renderSummery()}</View>

				<Modal
				testID={'modal'}
				isVisible={this.state.isModalVisible}
				onSwipeComplete={this.addCustomer}
				swipeDirection={['up','down']}
				style={styles.view}>
				<View style={styles.modelCantainer}>
				<View style={styles.modelHead}>
					<CardItem>
					<Left>
						<Text style={styles.headtitle}>{tableModal  ? 'Add Table': 'Add Customer'}</Text>
					</Left>
					<Right>
						<Button style={styles.buttonModal} onPress={()=>this.addCustomer({data:true})} transparent>
							<Icons name="x" color={Colors.secondary} size={35} />
						</Button>
					</Right>
					</CardItem>
				</View>
				<View style={styles.modelbody}>
					{tableModal  ?
					<TableComponent table={(data)=>{this.selectedTable(data)}}/>
					:
					<CustomerComponent customer={(data)=>this.customer(data)}/>
					}
				</View>
				</View>
			</Modal>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	// ...redux state to props here
	customerOrders: state.order.customerOrders,
	orderSummary: state.order.orderSummary,
	fetching: state.order.fetchingAll,
	error: state.order.errorAll,
	order: state.order.order,
	account: state.account.account,
	currency: state.account.currency,
	completedOrderUpdating: state.order.completedOrderUpdating,

})

const mapDispatchToProps = (dispatch) => ({
	orderItemDelete: (order) => dispatch(OrderActions.orderItemDeleteRequest(order)),
	orderDelete: (orderId) => dispatch(OrderActions.orderDeleteRequest(orderId)),
    AddOrderSave: (order) => dispatch(OrderActions.customerOrderSave(order)),
	cleanOrder:() => dispatch(OrderActions.cleanOrder()),
	CompleteOrder: (order) => dispatch(OrderActions.completeOrderRequest(order)),
	lockScreen:()=>dispatch(AccountActions.lockScreen()),
	logout: () => dispatch(LoginActions.logoutRequest()),

})

export default connect(mapStateToProps, mapDispatchToProps)(PosOrderScreen)