import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../../shared/themes'
import { Col } from 'react-native-easy-grid'


export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background
	},

	header:{
	   flexDirection:'row',
	   marginHorizontal:5,
	   height:60,
	   padding:10,
	   backgroundColor:Colors.white,
 	   
	},
	title:{
		fontSize:20,
		fontFamily:'Roboto-Light'
	},
	row: {
		flex: 1,
		justifyContent: 'center',
        marginVertical: 5,
        backgroundColor:Colors.white,
        height:60,
		 
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
		flexDirection:'row',
		marginVertical:10
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
		fontSize:16,
		fontFamily:'Roboto-Regular',
		alignSelf: 'center',
		color: Colors.title,
		textAlign: 'center',
		marginBottom: Metrics.smallMargin
  },
  headerContainer:{
	 flex:1,
  },
  headerTitle:{
     justifyContent:'space-between',
	 flexDirection:'row',
	},
	headerTitleText:{
	alignSelf:'center',
	fontSize:15,
	color:Colors.blacktext,
	fontFamily:"Roboto-Regular"
	 },
	headRow: {
        flex: 1,
        backgroundColor:Colors.white,
        height:50,
	},
	label: {
		textAlign: 'left',
		color: Colors.text,
		fontFamily:'Roboto-Light',
		fontSize:18,
		marginVertical:3,
		marginHorizontal:2

	},
	listContent: {
		marginTop: Metrics.baseMargin
	},
	summery: {
        flex: 1.5,
		backgroundColor:Colors.white,
		paddingVertical:20,

	},
	summeryContainer: {
        flex:1,
        backgroundColor:Colors.white,

	},
	table: {
		padding:5,
		flex: 5,


	},
	summeryRow: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	colSum: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	summerButtonsContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		alignContent: 'center',
		marginBottom:10
	},
	summerButtonHold: {
    margin: 10,
    width:200,
    height:60,
    justifyContent:'center',
    backgroundColor: Colors.secondary,
    borderRadius:5,

   
  },
  summerButtonCancel: {
    margin: 10,
    width:200,
    height:60,
    justifyContent:'center',
    backgroundColor: Colors.white,
    borderColor:Colors.primary,
    borderWidth:1,
    borderRadius:5,

  },
  summerButtonPay: {
    flex:1,
    height:90,
    justifyContent:'center',
    backgroundColor: Colors.primary,
	borderRadius:5,
	marginHorizontal:5
  },
  summeryButtonText:{
		fontSize:20,
		color:Colors.primary
  },
  Total:{
		fontSize:25,
		color:Colors.blacktext,
		fontFamily:'Roboto-Light'
  },
  TotalNumber:{
		fontSize:25,
		color:Colors.blacktext,
		fontFamily:'Roboto-Bold'
  },
  summeryText:{
	fontSize:20,
	color:Colors.blacktext,
	fontFamily:'Roboto-Light'
	},
summeryPrice:{
	fontSize:25,
	fontWeight:'bold',
	color:Colors.primary,
	fontFamily:'Roboto-Bold'
	},
  summeryButtonTextPay:{
	fontSize:25,
	fontWeight:'bold',
	color:Colors.white,
	marginHorizontal:10
    },
	summeryButtonTextHold:{
    fontSize:20,
    color:Colors.white
  },
  view:{
    flex:1,
	justifyContent: 'center',
	alignSelf:'center',
	margin: Metrics.section,
	width:Metrics.screenWidth/0.99

  },
  modelCantainer:{
    flex: 0.9,
    backgroundColor: 'white',
    borderRadius:5,
  },
  modelHead:{
	flex:1,
	// paddingHorizontal:10,
	flexDirection:'column'
  },
  headtitle:{
    fontSize:25,
	color:Colors.title,
	alignSelf:'flex-start',
	margin:10
	
  },
  buttonModal:{
	  marginTop:-10,
	  alignSelf:'flex-end'
  },
  modelbody:{
    flex:6,
    justifyContent:'flex-start',
    alignItems:'center',
  },

  buttonCol:{
	flex:1,
	alignItems:'center', 
	width:50,
	marginHorizontal:5
  }
})