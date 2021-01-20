import React from 'react'
import { ActivityIndicator, Alert,Image,TouchableHighlight,Dimensions, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Feather'

import styles from './payment-screen.style'
import { Container, Header, Content, Tab, Button, Card, CardItem, Tabs, Left, Right, Body, List, ListItem } from 'native-base';
import moment from 'moment';
import _ from 'lodash'
import { Colors ,Metrics} from '../../../shared/themes'
import Modal from 'react-native-modal';
import { Calculator } from 'react-native-calculator'
import CashPayment from './CashPayment'
import { cashPaymentScreen } from '../../../navigation/layouts'
import { Col, Row, Grid } from "react-native-easy-grid";
import PosorderScreen from '../../entities/order/posorder-screen'

class PaymentScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state= {
      isModalVisible: false,
      paymentscreen: false
    }
  }

  componentDidUpdate(prevProps) {
    
  }

   
  

  cashPayment = ()=>{
    this.setState({paymentscreen:true})
  }

  render() {

    return (
      <Grid style={styles.container} testID="documentDetailScrollView">
        <Col style={styles.order}>
          <PosorderScreen  noPaybutton={true}/>
        </Col>
        <Col>
        <CashPayment order={this.props.order} customer={this.props.customer} componentId={this.props.componentId}/>
        </Col>
        

          
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen)
