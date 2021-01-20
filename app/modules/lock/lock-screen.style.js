import { StyleSheet } from 'react-native'

import { Colors, Metrics } from '../../shared/themes'
import metrics from '../../shared/themes/metrics'

export default StyleSheet.create({
  contentContainer: {
    flex:1,
  },
  container: {
    flex:1,
    backgroundColor: Colors.white,

  },
  reset:{
    alignSelf:'flex-end',
    marginHorizontal:10,

  },
  resetText:{
    color:Colors.primary,
    fontSize:20,
    fontWeight:'300'
    
  },
  form: {
    flex:1,
    justifyContent:'flex-start',
    borderRadius: 4,
    paddingHorizontal:10,
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.smallMargin,
    
  },
  rowLabel: {
    color: Colors.charcoal,
    fontSize:18,

  },
  textInput: {
    marginTop:10,
    fontSize:18,
    height: 40,
    color: Colors.text,
    borderWidth:1,
    borderRadius:5,
    height:50,
    borderColor:Colors.text,
    padding:10,
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel,
    
  },
  loginRow: {
    
    paddingVertical:50,
    paddingBottom: Metrics.doubleBaseMargin,
    flex:3,

  },
  telephone:{
    marginTop:10,
    flexDirection:'row',
    borderWidth:1,
    height:50,
    borderRadius:5,
    borderColor:Colors.text,
  },
  code:{
    fontSize:20,
    marginTop:13,
    marginHorizontal:10

  },
 
  loginButtonWrapper: {
    flex: 1,
    
  },
  loginButton: {
    justifyContent:'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    padding: 6,
    height:50,
    borderRadius:5
  },
  loginText: {
    textAlign: 'center',
    color: Colors.white,
    fontSize:20,

  },
  forgetText:{
    alignSelf:'flex-start',
    textAlign:'right',
    color:Colors.primary,

  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop:0,
    width:140,
    height:140
  },
})
