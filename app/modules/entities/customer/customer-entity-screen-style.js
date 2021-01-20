import { StyleSheet,Dimensions } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../../shared/themes'
import { Col } from 'react-native-easy-grid'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	...ApplicationStyles.screen,
	container: {
		flex: 1,
		backgroundColor: Colors.background
	},
	row: {
		flex: 1,
		justifyContent: 'space-between',
        marginVertical: 5,
        backgroundColor:Colors.white,
        height:100,
		 
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
  header:{
    flex:0.3,
    justifyContent:'center',
    alignItems:'center',
    padding:10,
    backgroundColor:Colors.white


  },
  headerTitle:{
     justifyContent:'space-between',
	 flexDirection:'row',
	},
	headerTitleText:{
	alignSelf:'center',
	fontSize:20,
	color:Colors.blacktext,
	fontFamily:"Roboto-Regular"
	 },
	headRow: {
		justifyContent:'center',
		alignItems:'flex-end',
    paddingVertical:20,
    marginTop:Metrics.baseMargin
	},
	label: {
		textAlign: 'left',
		color: Colors.text,
		fontFamily:'Roboto-Regular',
		fontSize:20,
		marginVertical:3,
		marginHorizontal:2

	},
	listContent: {
		paddingHorizontal:5,
		marginTop: Metrics.baseMargin,
		backgroundColor:Colors.white,

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
		flex: 5,
		borderStyle:'solid',
		marginBottom:20,


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
		alignContent: 'center'
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
    height:100,
    justifyContent:'center',
    backgroundColor: Colors.primary,
    borderRadius:5,
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
	fontSize:35,
	color:Colors.primary,
	fontFamily:'Roboto-Bold'
	},
  summeryButtonTextPay:{
    fontSize:35,
	color:Colors.white,
	marginHorizontal:10
    },
	summeryButtonTextHold:{
    fontSize:20,
    color:Colors.white
  },

  loadingview:{
    flex:1,
    width:width,
	alignItems:'center',
	justifyContent:'center',
    backgroundColor:Colors.primary
  },

  lottieView: {
	flex:1,
    height: 100,
    alignSelf: 'center',
  },

})