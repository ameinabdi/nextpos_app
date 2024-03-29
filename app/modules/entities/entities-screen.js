import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
// Styles
/* eslint-disable no-unused-vars */
import RoundedButton from '../../shared/components/rounded-button/rounded-button'
import {
  loginScreen,
  categoryEntityScreen,
  productEntityScreen,
  customerEntityScreen,
  // ignite-jhipster-entity-screen-import-needle
} from '../../navigation/layouts'
/* eslint-enable */

import styles from './entities-screen.styles'

class EntitiesScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container} testID="entityScreenScrollList">
        <Text style={styles.centerText}>JHipster Entities will appear below</Text>
        <RoundedButton text="Category" onPress={categoryEntityScreen} testID="categoryEntityScreenButton" />
        <RoundedButton text="Product" onPress={productEntityScreen} testID="productEntityScreenButton" />
        <RoundedButton text="Customer" onPress={customerEntityScreen} testID="customerEntityScreenButton" />
        {/* ignite-jhipster-entity-screen-needle */}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // for developer convenience
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // for developer convenience
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesScreen)
