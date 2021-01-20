import React, { Component } from 'react';
import {View} from 'react-native'
import LottieView from 'lottie-react-native';
import Animation from '../../animation';
import styles from './loading-view-component-style';

 

class LoadingView extends Component {
 
 
    render() {
    return (
     <View style={styles.loadingview}>
        <LottieView
        autoPlay
        style={styles.lottieView}
        source={Animation.Loading}
        />         
      </View>
    );
  }
}


export default LoadingView;