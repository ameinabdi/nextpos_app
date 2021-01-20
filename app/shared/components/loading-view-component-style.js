import { StyleSheet,Dimensions } from 'react-native'
import { Colors } from '../../shared/themes'



const { width, height } = Dimensions.get('window')

export default StyleSheet.create({


loadingview:{
    flex:1,
    width:width,
	alignItems:'center',
	justifyContent:'center',
    backgroundColor:Colors.white
  },

  lottieView: {
	flex:1,
    height: 100,
    alignSelf: 'center',
  },

})