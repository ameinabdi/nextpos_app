import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Image, View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import DropdownAlert from 'react-native-dropdownalert';
import { appStack,forgotPasswordScreen,setlockScreen ,switchAccountScreen, lockScreen} from '../../navigation/layouts';
import { Button } from 'native-base'

import styles from './login-screen.styles'
import { Colors, Images, Metrics } from '../../shared/themes'
import LoginActions from './login.reducer'
import Icon from 'react-native-vector-icons/AntDesign'

class LoginScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func,
  }

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

  handleCheckAccount = () =>{
    const { accounts } = this.props
      if(accounts){
       switchAccountScreen()
      }else{
        this.dropDownAlertRef.alertWithType('error', 'Error', 'there is no accounts');
      }
  }
  componentDidUpdate(prevProps) {
    if (!this.props.fetching) {
      if (prevProps.fetching && this.props.error) {
        this.dropDownAlertRef.alertWithType('error', 'Error', this.props.error);
      }
      const { account,accounts, token } = this.props
      if (account ||  account && token) {
        if(accounts && !prevProps.fetchingAll){
          switchAccountScreen()
        }
      }
    }
  }
  handlePressForgotPassword = () => {
    forgotPasswordScreen()
  }
  handlePressLogin = () => {
    const { username, password } = this.state
    if(!username || !password){
      this.dropDownAlertRef.alertWithType('error', 'Error', 'Sorry ! Please Write Your Credential');
    }else{
      this.props.attemptLogin(username, password)
    }
    // attempt a login - a saga is listening to pick it up from here.

  }
  

  handleChangeUsername = (text) => {
    this.setState({ username: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  render() {
    const { username, password } = this.state
    const { fetching } = this.props
    const editable = !fetching
    const textInputStyle = editable ? styles.textInput : styles.textInputReadonly
    return (
      <>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={[styles.container, { height: this.state.visibleHeight }]}
        keyboardShouldPersistTaps="always">
        <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />

        <View style={styles.form}>
        <Image source={Images.logoLogin} style={[styles.topLogo, this.state.topLogo]} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Email</Text>
            <View style={styles.inputContainer}>
            <Icon name="user" size={25} color={Colors.borders} style={styles.icon}/>
            <TextInput
              ref={(c) => {
                this.usernameInput = c
              }}
              testID="loginScreenUsername"
              style={textInputStyle}
              value={username}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={this.handleChangeUsername}
              underlineColorAndroid="transparent"
              onSubmitEditing={() => this.passwordInput.focus()}
              placeholder="Enter Your Email"
            />
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Password</Text>
            <View style={styles.inputContainer}>
            <Icon name="lock" size={25} color={Colors.borders} style={styles.icon}/>
            <TextInput
              ref={(c) => {
                this.passwordInput = c
              }}
              testID="loginScreenPassword"
              style={textInputStyle}
              value={password}
              keyboardType="default"
              returnKeyType="go"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              onChangeText={this.handleChangePassword}
              underlineColorAndroid="transparent"
              onSubmitEditing={this.handlePressLogin}
              placeholder="* * * * * *"
            />
            </View>
          </View>
         

          <View style={[styles.loginRow]}>
            <TouchableOpacity testID="loginScreenLoginButton" style={styles.loginButtonWrapper} onPress={this.handlePressLogin}>
              <View style={styles.loginButton}>
              <Icon name="login" size={25} color={Colors.white} style={styles.icon}/>
                <Text style={styles.loginText}>
                  Sign In</Text>
              </View>
            </TouchableOpacity>
            

          </View>
          <View style={styles.row}>
             <Button transparent style={{alignSelf:'center'}} onPress={this.handleCheckAccount}>
                 <Text style={styles.forgetText}>Switch Account</Text>
             </Button>
           </View>
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
    fetchingAll: state.account.fetchingAll,
    fetching: state.login.fetching,
    error: state.login.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    logout: () => dispatch(LoginActions.logoutRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
