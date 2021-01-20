import { StyleSheet } from 'react-native'

import { ApplicationStyles,Colors,Metrics } from '../../../shared/themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:Colors.background
  },
  profile:{
    flex:1,
    backgroundColor:Colors.white,
    borderRadius:10,
    padding:10

  },
  row: {
		flex: 1,
		justifyContent: 'space-between',
    marginVertical: 5,
    height:100,
		 
  },
  title:{
    fontFamily:'Roboto-Regular',
    fontSize:20,
    color:Colors.title
  },
  text:{
    marginTop:5,
    fontFamily:'Roboto-Medium',
    fontSize:20,
    color:Colors.text
  },
  orderlist:{
    flex:1,
    backgroundColor:Colors.background,
    padding:10
  },
  listContent:{
    flex:1,
  },
  Ordertitle:{
    fontSize:18,
    marginBottom:13,
    fontFamily:'Roboto-Meduim',
    color:Colors.title
  },
  rowList: {
		flex: 1,
		justifyContent: 'space-between',
        marginVertical: 5,
        backgroundColor:Colors.white,
        height:70,
		 
	},
	colName: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 2
		
	},
	colVaraint: {
		justifyContent: 'space-evenly',
		alignItems: 'center',
		flex: 2,
		flexDirection:'row'
	},
	Quantitybutton:{
	   borderColor: Colors.secondary,
	   borderWidth:1,
	   borderRadius:10,
	   margin:10,
	   height:35,
	   width:35,
	   justifyContent:'center',
	   alignItems:'center'
	},
	colNo:{
		justifyContent: 'center',
		alignItems: 'center',
		width:30
	},
	colPrice: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		
	},
	colAction: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 20,
		marginHorizontal:10
		
	},
	colActions: {
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'space-between'
	},

	boldLabel: {
		fontSize:20,
		fontFamily:'Roboto-Regular',
		alignSelf: 'center',
		color: Colors.title,
		textAlign: 'center',
		marginVertical: Metrics.smallMargin
  },
})
