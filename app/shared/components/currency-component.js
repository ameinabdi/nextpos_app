import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './currency-component-styles';
import {Row, Col } from 'native-base';

class RateComponent extends Component {
  render() {
      const { currency } = this.props;
    return (
        <>
       <Text style={styles.title}>Exchange Rate</Text>
      <View style={styles.container}> 
          <View style={styles.row}>
            <Col>
             <Text style={styles.headText}>
                 Dollar $
             </Text>
            </Col>
            <Col>
            </Col>
            <Col>
             <Text style={styles.headText}>
                 SHILLING SHL
             </Text>
            </Col>
          </View>
          <View style={styles.row}> 
            <Col>
             <Text style={styles.text}>
                $ {currency.dollarRate}
             </Text>
            </Col>
            <Col>
             <Text style={styles.text}>
                =
             </Text>
            </Col>
            <Col>
             <Text style={styles.text}>
                 {currency.currencyIso + '  '+currency.shillingRate}
             </Text>
            </Col>
          </View>
      </View>
      </>
    );
  }
}


export default RateComponent;
