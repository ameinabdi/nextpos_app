import { StyleSheet } from 'react-native'

import { ApplicationStyles, Metrics, Colors } from '../../../shared/themes'
import metrics from '../../../shared/themes/metrics'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryBackground,
  },
  product:{
    justifyContent:'center',
    alignItems:'center',
    margin:10,
    width:300,
    borderRadius:10,
    height:180,
    backgroundColor:Colors.secondary
  },
  productName:{
    marginTop:10,
   fontSize:35,
   fontWeight:'300',
   color:Colors.white,
  },
  productPrice:{
    fontSize:23,
    marginTop:10,
    fontWeight:'600',
    color:Colors.white,
  },
  model:{
    flex:1,
    backgroundColor:Colors.white,
  },
  modelbody:{
    flex:6,
    backgroundColor:Colors.secondaryBackground
  },
  modelfooter:{
    flex:1,
    backgroundColor:Colors.white,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:500,
    height:60,
    backgroundColor:Colors.primary,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
  },
  buttonText: {
    fontSize:18,
    textAlign: 'center',
    color: Colors.white,
  },
  row: {
    flex: 1,
    backgroundColor: Colors.fire,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center',
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin,
  },
  label: {
    textAlign: 'center',
    color: Colors.primary,
  },
  listContent: {
    marginTop: Metrics.baseMargin,

  },
})
