import React from 'react'
import { ActivityIndicator, FlatList,TouchableHighlight, Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { customerEditScreen } from '../../../navigation/layouts'
import { Row, Col, Button, Title, Left, Body, Header, Tab,Tabs } from 'native-base'
import moment from 'moment';
import _ from 'lodash';
import CustomerActions from './customer.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './customer-entity-detail-screen-style'
import OrderListScreen from '../order/orderList-screen'
class CustomerEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    const { account } = this.props; 
    this.props.getCustomer({tenantId:account.tenants[0] ? account.tenants[0].tenantId : null, id:this.props.data.customerId})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.resetCustomers()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete Customer?',
      'Are you sure you want to delete the Customer?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteCustomer(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }
  _renderRow = ({ item ,index}) => {
    return (
        <TouchableHighlight onPress={()=>{ }} >
        <Row style={styles.rowList}>
            <Col style={styles.colNo}>
                <Text style={styles.label}>{index+1}</Text>
            </Col>
            <Col style={styles.colName}>
                <Text style={styles.label} numberOfLines={1}>{item.title}</Text>
            </Col>
            <Col style={styles.colVaraint}>
                <Text style={styles.label} numberOfLines={1}>{item.orderList.length}</Text>
            </Col>
            <Col style={styles.colPrice}>
              <Text style={styles.label} numberOfLines={1}>{item.totalPrice}</Text>
            </Col>
            <Col style={styles.colName}>
              <Text style={styles.label} numberOfLines={1}> {item.orderStatus}</Text>
            </Col>
            <Col style={styles.colName}>
              <Text style={styles.label} numberOfLines={1}> {item.payment ? 'PAID' : 'UNPAID'}</Text>
            </Col>
            <Col style={styles.colName}>
                <Text style={styles.label}>{moment(item.createdAt).fromNow()}</Text>
            </Col>
        </Row>
        </TouchableHighlight>
    )
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
                  <Text style={styles.boldLabel}>Payment</Text>
              </Col>
              <Col style={styles.colName}>
                  <Text style={styles.boldLabel}>Date</Text>
              </Col>
          </Row>
  )
}
_renderFooter = () => {
  const { customer } = this.props;
  return (
          <Row style={styles.headRow}>
              <Col style={styles.colName}>
                  <Text style={styles.boldLabel}>Total Amount</Text>
                  <Text style={styles.boldLabel}>$ {_.sumBy(customer.order, function(o) { return parseFloat(o.totalPrice); })}</Text>

              </Col>
              <Col style={styles.colName}>
                  <Text style={styles.boldLabel}>Total Paid</Text>
                  <Text style={styles.boldLabel}>$ {_.sumBy(customer.order, function(o) { if(o.payment){return parseFloat(o.totalPrice)}  })}</Text>

              </Col>
              <Col style={styles.colName}>
                  <Text style={styles.boldLabel}>Total Un Paid</Text>
                  <Text style={styles.boldLabel}>$ {_.sumBy(customer.order, function(o) { if(o.payment == null){return parseFloat(o.totalPrice)}  })}</Text>
              </Col>
          </Row>
  )
 }

  render() {
    if (!this.props.customer || this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container} testID="customerDetailScrollView">
        <View style={styles.profile}>
        <Row style={styles.row}>
          <Col style={styles.col}>
          <Text testID="fullName" style={styles.title}>Full Name:</Text>
          <Text style={styles.text}>{this.props.customer.fullname}</Text>
          </Col>
          <Col style={styles.col}>
          <Text testID="Gender" style={styles.title}>Gender:</Text>
          <Text style={styles.text}>{this.props.customer.gender}</Text>

          </Col>
          <Col style={styles.col}>
          <Text testID="Phone" style={styles.title}>Phone:</Text>
          <Text style={styles.text}>{this.props.customer.phone}</Text>
          </Col>
          <Col style={styles.col}>
          <Text testID="Description" style={styles.title}>Description: </Text>
          <Text style={styles.text}>{this.props.customer.description}</Text>

          </Col>
        </Row>
        <Row style={styles.row}>
          <Col style={styles.col}>
          <Text testID="GuarantorName" style={styles.title}>GuarantorName: </Text>
          <Text style={styles.text}>{this.props.customer.guarantorName}</Text>

          </Col>
          <Col style={styles.col}>
          <Text testID="GuarantorPhone" style={styles.title}>GuarantorPhone: </Text>
          <Text style={styles.text}>{this.props.customer.guarantorPhone}</Text>

          </Col>
          <Col style={styles.col}>
          <Text testID="Address" style={styles.title}>Address:</Text>
          <Text style={styles.text}>{this.props.customer.address}</Text>

          </Col>
          <Col style={styles.col}>
          <Text testID="Address2" style={styles.title}>Address2: </Text>
          <Text style={styles.text}>{this.props.customer.address2}</Text>

          </Col>
        </Row>
        <View style={styles.orderlist}>
          <Text style={styles.Ordertitle}>{this.props.customer.fullname}'s Orders</Text>
            {this._renderHeader()}
             <FlatList
                contentContainerStyle={styles.listContent}
                data={this.props.customer.order}
                renderItem={this._renderRow}
                keyExtractor={this.keyExtractor}
                initialNumToRender={this.oneScreensWorth}
                onEndThreshold={100}
                ListEmptyComponent={this.renderEmpty}
                ListFooterComponent={this._renderFooter}
                ItemSeparatorComponent={this.renderSeparator}
              />
          
        </View>
        </View>
        {/* <RoundedButton text="Edit" onPress={customerEditScreen.bind(this, { entityId: this.props.customer.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} /> */}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    customer: state.customers.customer,
    fetching: state.customers.fetchingOne,
    deleting: state.customers.deleting,
    errorDeleting: state.customers.errorDeleting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomer: (id) => dispatch(CustomerActions.customerRequest(id)),
    getAllCustomers: (options) => dispatch(CustomerActions.customerAllRequest(options)),
    deleteCustomer: (id) => dispatch(CustomerActions.customerDeleteRequest(id)),
    resetCustomers: () => dispatch(CustomerActions.customerReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEntityDetailScreen)
