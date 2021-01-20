import React from 'react'
import { Alert, ScrollView, Text, View, Image, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Navigation } from 'react-native-navigation'
import t from 'tcomb-form-native'
import { Images , Colors} from '../../../shared/themes';
import ForgotPasswordActions from './forgot-password.reducer'
import styles from './forgot-password-screen.styles'
import DropdownAlert from 'react-native-dropdownalert';
const Form = t.form.Form

class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      loading: false,
      formModel: t.struct({
        email: t.String,
      }),
      formValue: this.props.forgotPassword,
      formOptions: {
        email: {
          returnKeyType: 'done',
          onSubmitEditing: () => this.submitForm(),
        },
      },
    }
    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  submitForm() {
    // call getValue() to get the values of the form
    const value = this.form.getValue()
    if (value) {
      // if validation fails, value will be null
      this.props.resetPassword(value.email)
      this.setState({ loading: true })

    }else{
      this.dropDownAlertRef.alertWithType('error', 'Error', 'Sorry ! Please Write Your Email');
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetching && !this.props.fetching) {
      if (this.props.error) {
        this.setState({ loading: false })

        this.dropDownAlertRef.alertWithType('error', 'Error', this.props.error);
        
      } else {
        this.setState({ loading: false })
        this.dropDownAlertRef.alertWithType('success', 'Success', 'Password reset email sent')
        Navigation.popToRoot(this.props.componentId)
      }
    }
  }

  formChange(newValue) {
    this.setState({
      formValue: newValue,
    })
  }

  render() {
    return (
      <>
        <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
      <ScrollView>
      <View style={styles.container}>
      <Image source={Images.logo} style={[styles.topLogo]} />
          <Form
            ref={(c) => {
              this.form = c
            }}
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
          {
            this.state.loading == false ?
          <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor={Colors.primary}>
            <Text style={styles.buttonText}>Resend</Text>
          </TouchableHighlight>
          :
          <TouchableHighlight style={styles.button} disabled underlayColor={Colors.primary}>
                 <Text style={styles.buttonText}>sent</Text>
          </TouchableHighlight>
        }
      </View>
      </ScrollView>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.forgotPassword.fetching,
    error: state.forgotPassword.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (email) => dispatch(ForgotPasswordActions.forgotPasswordRequest(email)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)