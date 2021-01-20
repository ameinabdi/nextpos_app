import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Image, View, ScrollView,StatusBar,SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import { appStack, forgotPasswordScreen , lockScreen} from '../../navigation/layouts';

import styles from './lock-screen.style'
import { Images, Metrics, Colors } from '../../shared/themes'
import LockActions from './lock.reducer'
import { Button } from 'native-base'
import DropdownAlert from 'react-native-dropdownalert';
import PINCode,{hasUserSetPinCode,deleteUserPinCode,resetPinCodeInternalStates}  from '@haskkor/react-native-pincode'
import AccountAction from '../../shared/reducers/account.reducer';

class SetLockScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func,
  }

  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      password: '',
      telephone: '',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth },
    }
  }
  componentDidUpdate(prevProps) {
    if (!this.props.fetching) {
      if (prevProps.fetching && this.props.error) {
        this.dropDownAlertRef.alertWithType('error', 'Error', this.props.error);
      }
      if (!prevProps.acclockpinount && this.props.lockpin) {
          lockScreen()
         
      }
    }
  }
  
  handlePressLock = async (pin) => {
    const {account} = this.props
    const hasPin =  await hasUserSetPinCode(account.email)
    if(hasPin){
      this.props.setlockscreen({pin})
    }else{
      Alert.alert('error', 'Error', 'Sorry ! Please Setup Pin');
    }
  };

  render() {
    const { fetching , registerAccount,account} = this.props
    const editable = !fetching
    const textInputStyle = editable ? styles.textInput : styles.textInputReadonly
    return (
      <View
        contentContainerStyle={styles.contentContainer}
        style={[styles.container, { height: this.state.visibleHeight }]}
        keyboardShouldPersistTaps="always">
        <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
        <View style={styles.form}>
        <Image source={Images.logo} style={[styles.topLogo]} />
        <PINCode 
        timeLocked={10000}
        status={'choose'}
        pinCodeKeychainName={account ? account.email: null}
        styleLockScreenButton={{backgroundColor:Colors.primary}}
        styleLockScreenText={{color:Colors.charcoal,fontWeight:'400', fontSize:18}}
        styleLockScreenTextTimer={{color:Colors.charcoal,fontWeight:'400', fontSize:20}}
        styleLockScreenTitle={{color:Colors.charcoal,fontWeight:'400', fontSize:20}}
        colorPassword={Colors.primary}
        colorCircleButtons={Colors.secondary}
        stylePinCodeTextTitle={{backgroundColor:Colors.white,fontWeight:'400', }}
        stylePinCodeTextButtonCircle={{fontSize: 25, fontWeight: '100', color:'white'}}
        colorPasswordEmpty={Colors.blue}
        colorPasswordError={Colors.viole}
        finishProcess={(text) => this.handlePressLock(text)}
        />

      </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    fetching: state.account.fetching,
    user: state.login.user,
    authToken: state.login.authToken,
    error: state.account.error,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (fullname, telephone) => dispatch(LockActions.loginRequest(fullname, telephone)),
    logout: () => dispatch(LockActions.logoutRequest()),
    setlockscreen:(pin)=> dispatch(AccountAction.setLockRequest(pin))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetLockScreen)