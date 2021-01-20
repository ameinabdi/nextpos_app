import React from 'react'
import { ActivityIndicator, Alert,Image,TouchableHighlight,TextInput, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Feather'

import styles from './CashPayment.styles'
import { Container, Header, Content, Tab,Textarea, Button,Row,Col, Card, CardItem, Tabs, Left, Right, Body, List, ListItem } from 'native-base';
import moment from 'moment';
import _ from 'lodash'
import { Colors } from '../../../shared/themes'
import Modal from 'react-native-modal';
import { Calculator } from 'react-native-calculator'
import OrderActions from '../../../shared/reducers/order.reducer'
import QRCode from 'react-native-qrcode-svg';
import PrinterComponent from '../printer/printer-components'
import TableComponent from '../table/table-component'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';

class CashPayment extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
        orderTitle:null,
        orderNote:null,
        printerModel:false,
        orderData: null,
        tableData:null
    }
   this.selectedTable = this.selectedTable.bind(this)
  }

  componentDidUpdate(prevProps) {
    console.tron.log('succss',prevProps, this.props)

    if (prevProps.updating && !this.props.updating) {
      if (this.props.completedOrderError) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
        this.setState({
          loading:false
        })
      } else {
        this.toggleModal()
        // Alert.alert(
        //   'Success',
        //   'Successfully Completed Order',
        //   [
        //     {
        //       text: 'OK',
        //       onPress: () => {
        //         Navigation.pop(this.props.componentId)
        //       },
        //     },
        //   ],
        //   { cancelable: false },
        // )
    }
  }
}

toggleModal = (data) => {
  if(data){
    this.setState({printerModel:!this.state.printerModel})
    Navigation.pop(this.props.componentId)
  }
    this.setState({printerModel:!this.state.printerModel})

};

selectedTable = (selectedItem)  =>{
  this.setState({orderTitle:selectedItem.table, tableData:selectedItem})
}

  paidOrder= () =>{
    const { orderNote, orderTitle,tableData } = this.state;
    const { account, customer } = this.props;
    if(tableData ||customer){
        const data =  {
            title:customer? customer.fullname : orderTitle,
            totalPrice:_.sumBy(this.props.order, function(o) {
                const tax = parseFloat(o.productTax ? o.productTax.percentage/100:0)
                const productwithTax = parseFloat(o.productPrice)+tax
                return parseFloat(productwithTax*o.quantity); }).toFixed(2),
            quantity:_.sumBy(this.props.order, function(o) {
                return o.quantity }),
            totalTax:_.sumBy(this.props.order, function(o) {
                const tax = parseFloat(o.productTax ? o.productTax.percentage/100:0)
                return tax }).toFixed(2),
            orderStatus: 'COMPLETED',
            note: orderNote,
            orderItems:
                this.props.order.map((items)=>{
                    const oderitem ={
                        id:uuidv4(),
                        orderItemName:items.productName,
                        ordetItemQuantity:items.quantity,
                        ordetItemPrice:items.productPrice,
                        orderItemTax:items.productTax ? items.productTax.amount:null,
                        orderItemPercentage:items.productTax ? items.productTax.percentage:null,
                        product:items.id,
                        orderItemTaxId:items.productTax ? items.productTax.id:null
                    }
                    return oderitem
                }),
             tenantId:account.tenants ? account.tenants[0].tenantId : null,
             shop:account.shopId,
             createdById:account.id,
              updatedById:account.id,
              createdAt:moment().format(),
              updatedAt:moment().format(),
             customer:customer ?customer.id :null,
             table:tableData ? tableData.id :null
        }
        this.setState({orderData:data})
        this.props.CompleteOrder(data)
    }else{
      Alert.alert(
        'Sorry Orders?',
        'Please Select Table Order?',
        [
          { text: 'Cancel', style: 'cancel' },
          
        ],
        { cancelable: false },
        )
    
    }
  }

    
  render() {
      const { orderTitle, orderNote } = this.state
      const {customer, account,currency,updating } = this.props;

    return (
      <Container style={styles.container}>
            <View style={styles.content}>
          <Text style={styles.title}>Total Order</Text>
<Row>
  <Col>
        <Text style={styles.total}>
            $ {_.sumBy(this.props.order, function(o) {
                    const tax = parseFloat(o.productTax ? o.productTax.percentage/100:0)
                    const productwithTax = parseFloat(o.productPrice)+tax
                    return parseFloat(productwithTax*o.quantity); }).toFixed(2)}
       </Text>
  </Col>
  <Col>
    {
    currency ?
    <Text style={styles.total}>
          { currency.currencyIso+' '+_.sumBy(this.props.order, function(o) {
                  const tax = parseFloat(o.productTax ? o.productTax.percentage/100:0)
                  const productwithTax = parseFloat(o.productPrice)+tax
                    return parseFloat(productwithTax*o.quantity)*currency.shillingRate })}
      </Text>
      :null
    }
  </Col>
</Row>

  <Row style={styles.tables}>
  <TableComponent table={this.selectedTable}/>
  </Row> 
  <View style={styles.row}>
  <Text style={styles.rowLabel}>Note</Text>
  <View style={[styles.inputContainer, {  borderBottomWidth: 0}]}>
  <Textarea
  ref={(c) => {
      this.orderNoteInput = c
    }}
  rowSpan={5} 
  bordered 
  style={[styles.textInput,{marginLeft:0,width:350, height:150}]}
  value={orderNote}
  keyboardType="default"
  returnKeyType="next"
  onChangeText={(text)=>this.setState({orderNote:text})}
  placeholder="Enter Order Note"
  />
  </View>
  <View style={styles.footer}>
    { updating ?
    null
    :
    <Button style={styles.button} onPress={this.paidOrder} >
        <Text style={styles.buttonText}>Paid Order</Text>
    </Button>
    }
  </View>
  </View>
       
  </View>
<Modal
            testID={'modal'}
            isVisible={this.state.printerModel}
            onSwipeComplete={this.toggleModal}
            swipeDirection={['up','down']}
            style={styles.view}>
            <View style={styles.modelCantainer}>
              <View style={styles.modelHead}>
                  <Button style={styles.buttonModal} onPress={()=>this.toggleModal({data:true})} transparent>
                    <Icon name="x" color={Colors.secondary} size={35} />
                  </Button>
              </View>
              <View style={styles.modelbody}>
                <PrinterComponent  
                order={this.state.orderData} 
                account={this.props.account} 
                table={this.state.tableData}
                currency={currency}
                totalorder={_.sumBy(this.props.order, function(o) {
                const tax = parseFloat(o.productTax ? o.productTax.percentage/100:0)
                const productwithTax = parseFloat(o.productPrice)+tax
                return parseFloat(productwithTax*o.quantity); }).toFixed(2)}
                totalTax={_.sumBy(this.props.order, function(o) {
                  const tax = parseFloat(o.productTax ? o.productTax.percentage/100:0)
                  return tax}).toFixed(2)}
                />
              </View>
             </View>
          </Modal>

        
           
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    currency: state.account.currency,

    completedOrderError: state.order.completedOrderError,
    completedOrder:state.order.completedOrder,

    updating:state.order.completedOrderUpdating

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    CompleteOrder: (order) => dispatch(OrderActions.completeOrderRequest(order)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CashPayment)
