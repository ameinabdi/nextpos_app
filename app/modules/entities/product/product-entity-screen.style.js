import { StyleSheet,Dimensions } from 'react-native'

import { ApplicationStyles, Metrics, Colors } from '../../../shared/themes'
import metrics from '../../../shared/themes/metrics'
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flexGrow: 1,
    backgroundColor: Colors.secondaryBackground,
    flexDirection:'column'
  },
  content: {
  
  },
  titleProduct:{
    marginTop:20,
    marginBottom:5,
    marginHorizontal:10,
    fontSize:20,
    alignSelf:'center',
    color:Colors.text,
    fontFamily:'Roboto-Bold'
  },
  product:{
    flexDirection: 'column',
    margin:10,
    padding:5,
    width:180,
    borderRadius:10,
    height:200,
    backgroundColor:Colors.white,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height:2,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

elevation: 5,
  },
  thumbnail:{
    height:140,

    margin:2,
    borderRadius:10,
  },
  productfooter:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  productName:{
    textAlign:'center',
   marginTop:10,
   fontSize:20,
   fontWeight:'500',
   color:Colors.text,
  },
  productPrice:{
    marginVertical:5,
    fontSize:21,
    fontWeight:'600',
    color:Colors.title,
  },
  model:{
    height:600,
    backgroundColor:Colors.white,
  },
  modelHead:{
    flex:1,
    backgroundColor:Colors.primary,
    justifyContent:'center',
    alignItems:'center'
  },
  headtitle:{
    fontSize:35,
    color:Colors.white
  },
  modelbody:{
    flex:4,
    justifyContent:'flex-end',
    alignItems:'flex-start',
    backgroundColor:Colors.secondaryBackground
  },
  modelfooter:{
    flex:1,
    backgroundColor:Colors.white,
    justifyContent:'center',
    alignItems:'flex-end',
    paddingHorizontal:10
  },
  button:{
    width:200,
    height:60,
    backgroundColor:Colors.primary,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
  },
  buttonText: {
    fontSize:20,
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
    alignItems:'stretch',
    marginTop: Metrics.baseMargin,
    width:Metrics.screenWidth
  },
})
