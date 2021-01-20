import { StyleSheet } from 'react-native'

import { ApplicationStyles,Colors, Metrics } from '../../../shared/themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
  },
  col:{
    flex:1,
    backgroundColor:Colors.white,
    justifyContent:'center',
    alignItems:'center',
    padding:10
  },
  order:{
    backgroundColor:Colors.secondaryBackground,
    width:Metrics.screenWidth/1.8
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
    color:Colors.secondary,
    textAlign:'center'
  },
  body:{
    flex:1,
  },
  button: {
    width:350,
    height:200,
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    flexDirection:'column',
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
    fontWeight:'400',
    alignSelf: 'center',
  },
  calculator:{
    flex:1,
    alignItems:'center',
    paddingBottom:10
  },
  view:{
    justifyContent: 'flex-end',
    margin: 0,
    marginTop:40

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
    flex:4,
    justifyContent:'center',
    alignItems:'center',
  },
  
})

