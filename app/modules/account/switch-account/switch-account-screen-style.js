import { StyleSheet } from 'react-native'

import { Colors, Metrics } from '../../../shared/themes'
import metrics from '../../../shared/themes/metrics'

export default StyleSheet.create({
  contentContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
  },
  container: {
    flex:1,
    
    backgroundColor: Colors.background,
  },
  listContent:{

  },
  form: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    paddingHorizontal:metrics.doubleBaseMargin,
    height: Metrics.screenHeight/2,
    width:Metrics.screenWidth/1,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 4,
  },
  row: {
    flexDirection:'column',
    width:Metrics.screenWidth/2.5,
    height:150,
    borderRadius:5,
    alignItems:'center',
    backgroundColor: Colors.background,
    marginVertical:15,
    marginHorizontal: Metrics.smallMargin,
    justifyContent: 'center',
  },
 
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width:120,
    height:120,
  },
  user: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width:50,
    height:50,
    margin:10,
    borderColor:Colors.primary,
    borderRadius:100,
  },
  boldLabel:{
      fontSize:20,
  },
  label:{
    fontSize:18,
    marginVertical:10,
    color:Colors.text
  },
  button: {
    width: 150,
    height:70,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 10,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    padding: 6,
   
  },
  buttonText: {
    marginLeft:10,
    textAlign: 'center',
    color: Colors.silver,
    fontSize:22
  },
})
