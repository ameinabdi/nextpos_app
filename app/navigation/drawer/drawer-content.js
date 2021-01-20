import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView,View, Image, BackHandler } from 'react-native'
import { Navigation } from 'react-native-navigation'

import {
  loginScreen,
  registerScreen,
  forgotPasswordScreen,
  changePasswordScreen,
  settingsScreen,
  orderListScreen,
  storybookScreen,
  AuthLoad,
  attendanceScreen,
  printerScreen,customerScreen
} from '../layouts'
import { connect } from 'react-redux'

import styles from './drawer-content.styles'
import { Images } from '../../shared/themes'
import DrawerButton from './drawer-button'
import LoginActions from '../../modules/login/login.reducer'
import { isLoggedIn } from '../../shared/reducers/account.reducer'
 
class DrawerContent extends Component {
  constructor(context, props) {
    super(context, props)
    Navigation.events().bindComponent(this)
  }

  hideSideMenu() {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: false,
        },
      },
    })
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.hideSideMenu()
    })
  }

  handlePressLogin = () => {
    this.hideSideMenu()
    loginScreen()
  }
  handlePressRegister = () => {
    this.hideSideMenu()
    registerScreen()
  }
  handlePressForgotPassword = () => {
    this.hideSideMenu()
    forgotPasswordScreen()
  }
  handlePressSettings = () => {
    this.hideSideMenu()
    settingsScreen()
  }
  handlePressChangePassword = () => {
    this.hideSideMenu()
    changePasswordScreen()
  }
  handlePressAttendance = () => {
    this.hideSideMenu()
    attendanceScreen()
  }
  handlePressLogout = () => {
    this.hideSideMenu()
    this.props.logout()
    Navigation.setRoot(AuthLoad)
   }
  handlePressStorybook = () => {
    this.hideSideMenu()
    storybookScreen()
  }
  handlePressOrders = () => {
    this.hideSideMenu()
    orderListScreen()
  }
  handlePressPrint = ()=>{
    this.hideSideMenu()
    printerScreen()
  }
  handlePressCustomer = ()=>{
    this.hideSideMenu()
    customerScreen()
  }
  

  render() {
    return (
      <ScrollView style={styles.container}>
         <View style={styles.header}>
           <Image testID="drawerLogo" source={Images.logoLogin} style={styles.logo} />
         </View>
          <DrawerButton testID="orderlistDrawerButton" text="Orders"  icon="tag" onPress={this.handlePressOrders} />
          <DrawerButton testID="customerDrawerButton" text="Customers" icon="user" onPress={this.handlePressCustomer} />

          <DrawerButton testID="entitiesDrawerButton" text="Attendance" icon="calendar" onPress={this.handlePressAttendance} />
          {/* <DrawerButton testID="settingsDrawerButton" text="Settings" onPress={this.handlePressSettings} /> */}
          {/* <DrawerButton testID="changePasswordDrawerButton" text="Change Password" onPress={this.handlePressChangePassword} /> */}
          <DrawerButton testID="printerDrawerButton" text="Print" icon="check" onPress={this.handlePressPrint} />

          <DrawerButton testID="logoutDrawerButton" text="Logout" icon="logout" onPress={this.handlePressLogout} />

      </ScrollView>
    )
  }
}

DrawerContent.contextTypes = {
  drawer: PropTypes.object,
  
}

const mapStateToProps = (state) => {
  return {
    loggedIn: isLoggedIn(state.account),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logoutRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
