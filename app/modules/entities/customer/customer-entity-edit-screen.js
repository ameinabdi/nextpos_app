import React from 'react'
import { ActivityIndicator, Alert, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import CustomerActions from './customer.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { customerEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './customer-entity-edit-screen-style'

let Form = t.form.Form

class CustomerEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        fullName: t.maybe(t.String),
        Gender: t.maybe(t.String),
        phone1: t.String,
        phone2: t.maybe(t.String),
        description: t.maybe(t.String),
        guarantorName: t.maybe(t.String),
        guarantorPhone: t.maybe(t.String),
        address: t.maybe(t.String),
        address2: t.maybe(t.String),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          fullName: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('Gender').refs.input.focus(),
            testID: 'fullNameInput',
          },
          Gender: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('phone1').refs.input.focus(),
            testID: 'GenderInput',
          },
          phone1: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('phone2').refs.input.focus(),
            testID: 'phone1Input',
          },
          phone2: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('description').refs.input.focus(),
            testID: 'phone2Input',
          },
          description: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('guarantorName').refs.input.focus(),
            testID: 'descriptionInput',
          },
          guarantorName: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('guarantorPhone').refs.input.focus(),
            testID: 'guarantorNameInput',
          },
          guarantorPhone: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('address').refs.input.focus(),
            testID: 'guarantorPhoneInput',
          },
          address: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('address2').refs.input.focus(),
            testID: 'addressInput',
          },
          address2: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'address2Input',
          },
        },
      },
      customer: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getCustomer(props.data.entityId)
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.customer !== prevState.customer && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.customer), customer: nextProps.customer }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        const entityId = this.props.customer.id
        this.props.reset()
        this.props.getCustomer(entityId)
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: customerEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  submitForm() {
    // call getValue() to get the values of the form
    const customer = this.form.getValue()
    if (customer) {
      // if validation fails, value will be null
      this.props.updateCustomer(formValueToEntity(customer))
    }
  }

  formChange(newValue) {
    this.setState({
      formValue: newValue,
    })
  }

  render() {
    if (this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView testID="customerEditScrollView">
          <Form
            ref={(c) => {
              this.form = c
            }}
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
        </KeyboardAwareScrollView>
        <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor="#99d9f4" testID="submitButton">
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = (value) => {
  if (!value) {
    return {}
  }
  return {
    id: value.id || null,
    fullName: value.fullName || null,
    Gender: value.Gender || null,
    phone1: value.phone1 || null,
    phone2: value.phone2 || null,
    description: value.description || null,
    guarantorName: value.guarantorName || null,
    guarantorPhone: value.guarantorPhone || null,
    address: value.address || null,
    address2: value.address2 || null,
  }
}
const formValueToEntity = (value) => {
  const entity = {
    id: value.id || null,
    fullName: value.fullName || null,
    Gender: value.Gender || null,
    phone1: value.phone1 || null,
    phone2: value.phone2 || null,
    description: value.description || null,
    guarantorName: value.guarantorName || null,
    guarantorPhone: value.guarantorPhone || null,
    address: value.address || null,
    address2: value.address2 || null,
  }
  return entity
}

const mapStateToProps = (state) => {
  return {
    customer: state.customers.customer,
    fetching: state.customers.fetchingOne,
    updating: state.customers.updating,
    error: state.customers.errorUpdating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomer: (id) => dispatch(CustomerActions.customerRequest(id)),
    getAllCustomers: (options) => dispatch(CustomerActions.customerAllRequest(options)),
    updateCustomer: (customer) => dispatch(CustomerActions.customerUpdateRequest(customer)),
    reset: () => dispatch(CustomerActions.customerReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEntityEditScreen)
