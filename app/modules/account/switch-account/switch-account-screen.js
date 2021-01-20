import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Image, BackHandler, FlatList, View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import DropdownAlert from 'react-native-dropdownalert';
import { appStack,forgotPasswordScreen,setlockScreen , lockScreen, AuthLoad} from '../../../navigation/layouts';
import { Body, Button, Left, Right, Row } from 'native-base'

import styles from './switch-account-screen-style'
import { Colors, Images, Metrics } from '../../../shared/themes'
import AccountActions from '../../../shared/reducers/account.reducer'
import Icon from 'react-native-vector-icons/AntDesign'
import LoginActions from '../../login/login.reducer'

class SwitchAccountScreen extends React.Component {

  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)

    this.state = {
      username: '',
      password: '',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth },
    }
  }

 
  componentDidUpdate(prevProps) {
      // const { account, token } = this.props
      // if (account && prevProps.fetching === false ||  account && token && prevProps.fetching === false) {
      //     if(account.pin == null || account.pin == 'null'){
      //       setlockScreen()
      //      } else {
      //       lockScreen(account)
      //      }
         
      //}
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  componentDidMount(){
    this.props.getAccounts()
  }

  onBackPress = () => {
    return true; 
  }
  
  addNewAccount(){
    this.props.removeCurrentAccount();
    Navigation.setRoot(AuthLoad)
  }
  selectUser = (user) => {
    // attempt a login - a saga is listening to pick it up from here.
    lockScreen(user)
  }

  renderRow=({ item }) =>{
    return (
      <TouchableOpacity onPress={() => this.selectUser(item)} >
        <View style={styles.row}>
          <Image source={Images.customer} style={styles.user} />
          <Text style={styles.boldLabel}>{item.fullName}</Text>
          <Text style={styles.label}>{item.phoneNumber}</Text> 
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const  { accounts }  = this.props;
        return (
            <>
            <ScrollView
              contentContainerStyle={styles.contentContainer}
              style={[styles.container, { height: this.state.visibleHeight }]}
              keyboardShouldPersistTaps="always">
              <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
      
              <View style={styles.form}>
              <Row >
                  <Left/>
                  <Body>
                     <Image source={Images.logoLogin} style={styles.topLogo} />
                  </Body>
                  <Right>
                     <Button transparent style={styles.button} onPress={()=> this.addNewAccount()}>
                      <Text style={styles.buttonText}><Icon name="plus" color={Colors.white} size={25} /> New </Text>
                     </Button> 
                  </Right>
                       
              </Row>
              <FlatList
                contentContainerStyle={styles.listContent}
                numColumns={2}
                data={accounts}
                renderItem={this.renderRow}
                keyExtractor={this.keyExtractor}
                initialNumToRender={this.oneScreensWorth}
                onEndReached={this.handleLoadMore}
                ListHeaderComponent={this.renderHeader}
                
                /* ListFooterComponent={this.renderFooter} */
                ListEmptyComponent={this.renderEmpty}
                ItemSeparatorComponent={this.renderSeparator}
              />
              </View>
            </ScrollView>
            </>
          )
  
   
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.authToken,
    lockpin: state.account.lockpin,
    account: state.account.account,
    accounts: state.account.accounts,
    fetching: state.account.fetching,
    error: state.login.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchAccount: (account) => dispatch(AccountActions.switchAccountRequest(account)),
    getAccounts: () => dispatch(AccountActions.accountsRequest()),
    removeCurrentAccount: () => dispatch(AccountActions.removeCurrentAccount()),
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwitchAccountScreen)
