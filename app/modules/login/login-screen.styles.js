import { StyleSheet } from 'react-native'

import { Colors, Metrics } from '../../shared/themes'
import metrics from '../../shared/themes/metrics'

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
  form: {
    backgroundColor: Colors.white,
    margin: Metrics.baseMargin,
    padding:metrics.doubleBaseMargin,
    height: Metrics.screenHeight/2,
    width:Metrics.screenWidth/1.5,
    justifyContent:'space-between',
    borderRadius: 50,
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  rowLabel: {
    color: Colors.charcoal,
  },
  inputContainer:{
    flexDirection: 'row',
    marginTop:20,
    borderBottomWidth: 0.3,
    borderColor: Colors.borders,
    paddingBottom: 10,
  }, 

  textInput: {
    flex:1,
    height: 40,
    color: Colors.coal,
    marginLeft:10,
  },
  textInputReadonly: {
    flex:1,
    height: 40,
    color: Colors.steel,
    
  },
  loginRow: {
    marginTop:10,
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row',
  },
  loginButtonWrapper: {
    flex: 1,
    height:60,
  },
  loginButton: {
    flex: 1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    borderWidth: 1,
    
    borderRadius:15,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    padding: 6,
   
  },
  loginText: {
    marginLeft:10,
    textAlign: 'center',
    color: Colors.silver,
    fontSize:20
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width:120,
    height:120,
  },
})
