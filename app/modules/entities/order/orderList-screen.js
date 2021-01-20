import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, FlatList, Text, TouchableOpacity, TouchableHighlight, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Row, Col, Button, Title, Left, Body, Header } from 'native-base'
import OrderActions from '../../../shared/reducers/order.reducer'
import styles from './orderList-screen.style'
import AlertMessage from '../../../shared/components/alert-message/alert-message'
import { Icon } from 'react-native-elements'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
// import { isPhone } from 'react-native-device-detection'
import _ from 'lodash'
import { Colors } from '../../../shared/themes'
 // import payment from '../Payments/PaymentGateway/PaymentGatewayNativeModule'
// import PaymentMethodsModal from '../../../Components/POS/Orders/PaymentMethodsModal'
import { Navigation } from 'react-native-navigation'
import {appStack} from '../../../navigation/layouts'
import moment from 'moment';
import { PullToRefreshView } from 'react-native-smooth-pull-to-refresh'
import LottieView from 'lottie-react-native'
import Animation from '../../../animation'
import LoadingView from '../../../shared/components/loading-view-component'

class OrderListScreen extends React.PureComponent {



constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)

    this.state = {
      dataObjects:[],
      dataImages:[],
      isRefreshing: false,

    }
    this.onInnerRefresh()
  }

  onInnerRefresh=()=> {
    this.setState({title: "Loading..."});
    this.startRefreshing();
    this.fetchOrders()

  }

      
  startRefreshing = ()=> {    
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 1500);
  }

  
   
  _renderHeader = () => {
    return (
            <Row style={styles.headRow}>
                <Col style={styles.colNo}>
                    <Text style={styles.boldLabel}>No</Text>
                </Col>
                <Col style={styles.colName}>
                    <Text style={styles.boldLabel}>Title</Text>
                </Col>
                <Col style={styles.colVaraint}>
                    <Text style={styles.boldLabel}>Items</Text>
                </Col>
                <Col style={styles.colPrice}>
                    <Text style={styles.boldLabel}>Total</Text>
                </Col>
                <Col style={styles.colName}>
                    <Text style={styles.boldLabel}>Status</Text>
                </Col>
                <Col style={styles.colName}>
                    <Text style={styles.boldLabel}>Date</Text>
                </Col>
            </Row>
    )
}

_renderRow = ({ item ,index}) => {
    return (
        <TouchableHighlight onPress={()=>{
        const data =  item.orderItems.map((items)=>{
                const oderitem ={
                    id:items.id,
                    productName:items.orderItemName,
                    quantity:items.ordetItemQuantity,
                    productPrice :items.ordetItemPrice,
                    product: items.product,
                    orderItemId: items.id,
                    orderItemTaxId: items.orderItemTaxId,
                    Percentage:items.orderItemPercentage,
                    variantName: null
                }
                return oderitem
            })
        this.props.Order({...item,orderList:data})
        Navigation.pop(this.props.componentId)
      }} >
        <Row style={styles.row}>
            <Col style={styles.colNo}>
                <Text style={styles.label}>{index+1}</Text>
            </Col>
            <Col style={styles.colName}>
                <Text style={styles.label} numberOfLines={1}>{item.title}</Text>
            </Col>
            <Col style={styles.colVaraint}>
                <Text style={styles.label} numberOfLines={1}>{item.orderItems.length}</Text>
            </Col>
            <Col style={styles.colPrice}>
              <Text style={styles.label} numberOfLines={1}>{item.totalPrice}</Text>
            </Col>
            <Col style={styles.colName}>
              <Text style={styles.label} numberOfLines={1}> {item.orderStatus}</Text>
            </Col>
            <Col style={styles.colName}>
                <Text style={styles.label}>{moment(item.createdAt).fromNow()}</Text>
            </Col>
        </Row>
        </TouchableHighlight>
    )
}
  
  // Render a header
  // renderHeader = () =>
  //   <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Show this when data is empty
  renderEmpty = () =><AlertMessage/>

  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  fetchOrders = () => {
    const { account } = this.props;
        if(account){
          this.props.getAllOrders({id:account.id, tenantId:account.tenants[0].tenantId})
        }

  }
  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.orders) {
      return {
        done: nextProps.orders.length < prevState.size,
        dataObjects: [...nextProps.orders],
      }
    }
    return null
  }
  

  
	render() {
        const {dataObjects} = this.state
        const {fetchingAll } = this.props;

        if(fetchingAll){
          return (
            <LoadingView />
          )
        }
		return (
			<View style={styles.container}>
          <View style={styles.headerContainer}>
             {this._renderHeader()}
          </View>
          <PullToRefreshView
          minPullDistance={120}
          pullAnimHeight={120}
          pullAnimYValues={{from: 0, to: 10}}
          isRefreshing={this.state.isRefreshing}
          onRefresh={this.onInnerRefresh}
          contentComponent={
            <ScrollView style={styles.table}>
              <FlatList
                contentContainerStyle={styles.listContent}
                data={dataObjects}
                renderItem={this._renderRow}
                keyExtractor={this.keyExtractor}
                initialNumToRender={this.oneScreensWorth}
                onEndThreshold={100}
                ListEmptyComponent={this.renderEmpty}
                ItemSeparatorComponent={this.renderSeparator}
              />
            </ScrollView>
            } >
            <View style={styles.loadingview}>
                <LottieView
                autoPlay
                style={styles.lottieView}
                source={Animation.PullRefresh}
                />         
              </View> 
            </PullToRefreshView>
				{/* <PaymentMethodsModal
					isModalVisible={this.state.isModalVisible}
					onMethods={this.onMethods}
					onCancel={this.onCancel}
				/> */}
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	// ...redux state to props here
	customerOrders: state.order.customerOrders,
    orderSummary: state.order.orderSummary,
    orders:state.order.orders,
	  fetching: state.order.completedOrderUpdating,
    error: state.order.errorAll,
    account: state.account.account,
    fetchingAll: state.order.fetchingAll,

})

const mapDispatchToProps = (dispatch) => ({
	orderItemDelete: (order) => dispatch(OrderActions.orderItemDeleteRequest(order)),
	orderDelete: (orderId) => dispatch(OrderActions.orderDeleteRequest(orderId)),
    getAllOrders: (order) => dispatch(OrderActions.orderAllRequest(order)),
    Order: (order) => dispatch(OrderActions.orderRequest(order)),

})

export default connect(mapStateToProps, mapDispatchToProps)(OrderListScreen)