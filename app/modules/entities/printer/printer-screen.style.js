import { StyleSheet } from 'react-native'

import { ApplicationStyles, Colors,Metrics } from '../../../shared/themes/'

export default StyleSheet.create({
    listContent: {
        flex:1,
		padding:5,
		margin: Metrics.baseMargin,

    },
    card:{
        width:200,
        flex:1,
        backgroundColor:Colors.white,
        padding:10,
        margin:10,
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    title:{
        fontSize:22,
        fontFamily:'Roboto-Light',
        margin:10
    }
})
