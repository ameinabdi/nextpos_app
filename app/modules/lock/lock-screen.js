import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Image, View, ScrollView,StatusBar,SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import { appStack,  AuthLoad, forgotPasswordScreen,lockScreen } from '../../navigation/layouts';

import styles from './lock-screen.style'
import { Images, Metrics, Colors } from '../../shared/themes'
import LockActions from './lock.reducer'
import { Button } from 'native-base'
import DropdownAlert from 'react-native-dropdownalert';
import PINCode,{hasUserSetPinCode,deleteUserPinCode,resetPinCodeInternalStates}  from '@haskkor/react-native-pincode'
import { NetworkProvider, NetworkConsumer } from 'react-native-offline';
import config from '../../config/app-config'

class LockScreen extends React.Component {
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
      topLogo: { width: Metrics.screenWidth },
    }
  }
 


  // handlePressReset = async() => {
  //   const {account} = this.props
  //   const ResetPin =  await deleteUserPinCode(account.email)
  //   if(ResetPin){
  //       setlockScreen()
  //    }else{
  //     Alert.alert('error', 'Error', 'Sorry ! Please Login Account Your Account');
  //    }
  // }


  // handleChangePassword = (text) => {
  //   this.setState({ password: text })
  // }
  
  handlePressLock = (pin) => {
    const {account} = this.props
    if(account.pin == pin){
       appStack()
    }else{
      this.dropDownAlertRef.alertWithType('error', 'Error', 'Sorry ! Please create pin');
    }
  };
  render() {
    const {telephone, password } = this.state
    const { fetching , registerAccount,account} = this.props
    return (
      <View
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
        keyboardShouldPersistTaps="always">
        <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
        {/* <Button transparent style={styles.reset} onPress={()=>this.handlePressReset()}><Text style={styles.resetText}> Reset </Text></Button> */}
        <View style={styles.form}>
        <Image source={Images.logoLogin} style={[styles.topLogo]} />
        <PINCode 
            timeLocked={10000}
            maxAttempts={3}
            status={'enter'}
            pinCodeKeychainName={account ? account.email :null}
            styleLockScreenButton={{backgroundColor:Colors.primary}}
            styleLockScreenText={{color:Colors.charcoal,fontWeight:'400', fontSize:18}}
            styleLockScreenTextTimer={{color:Colors.charcoal,fontWeight:'400', fontSize:20}}
            styleLockScreenTitle={{color:Colors.charcoal,fontWeight:'400', fontSize:20}}
            stylePinCodeChooseContainer={{flex:1,backgroundColor:'red'}}
            colorPassword={Colors.primary}
            colorCircleButtons={Colors.secondary}
            stylePinCodeTextTitle={{backgroundColor:Colors.white,fontWeight:'400', }}
            stylePinCodeTextButtonCircle={{fontSize: 25, fontWeight: '100', color:'white'}}
            colorPasswordEmpty={Colors.blue}
            colorPasswordError={Colors.viole}
            handleResultEnterPin={(pinStatus) => this.handlePressLock(pinStatus)}
        />
      </View>

      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(LockScreen)