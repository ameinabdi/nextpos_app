import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity } from 'react-native'
import styles from './drawer-button.styles'
import Icon from 'react-native-vector-icons/AntDesign'
import { Colors } from '../../shared/themes'

class DrawerButton extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    testID: PropTypes.string,
  }

  render() {
    return (
      <TouchableOpacity testID={this.props.testID} onPress={this.props.onPress} style={styles.button}>
        <Icon name="checkcircle" size={23} color={Colors.title} />
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}

export default DrawerButton
