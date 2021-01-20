import { StyleSheet } from 'react-native'

import { Metrics, ApplicationStyles, Colors } from '../themes'

export default StyleSheet.create({
    container:{
        flex:1,
        paddingVertical:50,
        alignItems:'center',
        paddingHorizontal:Metrics.screenWidth/3
    },
    row:{
        flex:0.2,
        height:0,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        flexDirection:'row'
    },
    title:{
        fontFamily:'Roboto-Medium',
        color:Colors.primary,
        fontSize:35,
    },
    headText:{
        fontFamily:'Roboto-Medium',
        color:Colors.title,
        fontSize:35,
        width:300
    },
    text:{
        fontFamily:'Roboto-Light',
        color:Colors.title,
        fontSize:35,
    }
})
