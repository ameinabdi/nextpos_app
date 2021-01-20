import { StyleSheet } from 'react-native'
import Metrics from '../../../shared/themes/metrics'

import { ApplicationStyles,Colors } from '../../../shared/themes'

export default StyleSheet.create({
    container:{
       
    }, 
  lottieView: {
    height: 200,
    alignSelf: 'center',
  },
  text:{
      alignSelf:'center',
      fontSize:22,
      fontFamily:'Roboto-Medium',
      color:Colors.secondary,
  },
  button: {
    width:200,
    height:70,
    justifyContent:'center',
    backgroundColor: Colors.primary,
    borderRadius:5,
    marginVertical:20,
	marginHorizontal:5
  },
  buttonText:{
		fontSize:22,
		color:Colors.white
  },

})

