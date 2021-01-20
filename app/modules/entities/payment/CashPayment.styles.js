import { StyleSheet } from 'react-native'
import Metrics from '../../../shared/themes/metrics'

import { ApplicationStyles,Colors } from '../../../shared/themes'

export default StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',

  },
  content:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    marginVertical:10
  },
  rowLabel: {
    color: Colors.charcoal,
    fontSize:20,
  },
  inputContainer:{
    width:'100%',
    flexDirection: 'row',
    marginTop:20,
    borderBottomWidth: 0.3,
    borderColor: Colors.borders,
    paddingBottom: 10,
  }, 
  title:{
    fontSize:50,
    fontWeight:'300',
    color:Colors.primary,
    textAlign:'center'
  },
  total:{
    fontSize:50,
    fontWeight:'400',
    color:Colors.text,
    textAlign:'center'
  },
  tables:{
    flex:4,
    marginTop:10,
    

  },
  textInput: {
    flex:1,
    height: 40,
    color: Colors.coal,
    marginLeft:10,
  },
 
  button: {
    width:450,
    height:60,
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    alignSelf:'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 23,
    color: 'white',
    fontWeight:'400',
    alignSelf: 'center',
  },
  footer:{
      marginTop:10,
      justifyContent:'center'
  },

  view:{
    flex:1,
    justifyContent: 'center',
    margin: Metrics.section

  },
  modelCantainer:{
    flex: 0.9,
    backgroundColor: 'white',
    borderRadius:5,
  },
  modelHead:{
    flex:1,
    alignItems:'flex-end',
    paddingHorizontal:10
  },
  headtitle:{
    fontSize:35,
    color:Colors.white
  },
  modelbody:{
    flex:6,
    justifyContent:'flex-start',
    alignItems:'center',
  },
})

