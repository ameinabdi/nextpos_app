import { StyleSheet ,Dimensions} from 'react-native'

import { ApplicationStyles, Colors } from '../../../shared/themes'
import { Col } from 'native-base'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
  },
  header:{
    flex:1,
    backgroundColor:Colors.primary,
    alignItems:'center',
    justifyContent:'center'


  },
  content:{
    flex:2,
    backgroundColor:Colors.background
  },
  row:{
    marginTop:10,
    backgroundColor:Colors.white
  },
  loadingview:{
    flex:1,
    width:width,
    alignContent:'center',
    backgroundColor:Colors.primary
  },
  listContent:{
    flex:1,

  },
  list:{
    backgroundColor:Colors.background

  },
  lottieView: {
    height: 100,
    alignSelf: 'center',
  },
  iconview:{
    backgroundColor:Colors.iconBackground,
    padding:14,
    borderRadius:100,
    width:50,
    height:50,
    justifyContent:'center'
  },
  body:{
    flexDirection:'row',
    flex:1,
    justifyContent:'space-between',
    marginHorizontal:30
  },
  Thumbnail:{
    borderWidth:4,
    borderColor:Colors.white
},
  name:{
   color:Colors.white,
   marginTop:10,
   fontSize:22,
   fontWeight:'200'
  },
  title:{
    color:Colors.title,
    marginTop:10,
    fontSize:20,
    fontWeight:'bold'
  },
  desc:{
    marginTop:30,
    fontSize:16,
    color:Colors.text,
    fontWeight:'700'
  },

  headtitle:{
    color:Colors.primary,
    marginTop:10,
    fontSize:20,
    fontWeight:'600'
  },
  headdesc:{
    fontSize:16,
    fontWeight:'300'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: Colors.jhipsterBlue,
    borderColor: Colors.jhipsterBlue,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
})
