import { StyleSheet } from 'react-native'
import {Dimensions} from 'react-native';
import { Metrics, ApplicationStyles, Colors } from '../../../shared/themes/'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
   container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        padding:100,
   },
   title:{
        color:Colors.secondary,
        fontSize:25,
        fontWeight:'400',
        alignSelf:'center'
   },
   button:{
       width:300,
       height:150,
    //    backgroundColor:Colors.primary,
       padding:10,
       justifyContent:'center',
       alignItems:'center',
       flexDirection:'column'
   },
   time:{
       color:Colors.white,
       fontSize:20
   }
})
