import { StyleSheet } from 'react-native'

import { Metrics, ApplicationStyles, Colors } from '../../shared/themes/'
import metrics from '../../shared/themes/metrics'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container:{
    flex:1,
    alignItems:'center',
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.snow,
    fontWeight: '600',
  },
  order:{
    backgroundColor:Colors.secondaryBackground,
    width:metrics.screenWidth/1.8
  },
  orderCard:{
    marginVertical:10,
    borderRadius:10,
    justifyContent:'center'
  },
  orderTitle:{
    fontSize:22,
    textAlign:'center',

    
  },
  addNewButton:{
    width:40,
    height:40,
    alignItems:'center',
    justifyContent:'center'
  },
  product:{
    flex:2.5,
    backgroundColor:Colors.secondaryBackground
  },
  category:{
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'flex-start',
    backgroundColor:Colors.secondaryBackground
  },
  titleCategory:{
    marginTop:10,
    marginHorizontal:15,
    fontSize:20,
    alignSelf:'flex-start',
    color:Colors.text,
    fontFamily:'Roboto-Bold'
  },
  productItem:{
    backgroundColor:Colors.white
  },


  hairline: {
    borderBottomColor: Colors.snow,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginTop: 32,
  },
  logo: {
    marginTop: Metrics.section,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain',
  },
  centered: {
    alignItems: 'center',
  },
  scrollView: {
    paddingBottom: Metrics.baseMargin,
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.transparent,
  },
  view:{
    justifyContent: 'center',
    margin:40

  },
  modelCantainer:{
    flex: 1,
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

  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.snow,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.snow,
  },
  highlight: {
    fontWeight: '700',
  },
  profile:{
    paddingRight:10
  },
  name:{
    fontSize:18,
    color:Colors.white,
  },
  phone:{
    fontSize:16,
    color:Colors.white,
  },
  footer: {
    color: Colors.snow,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
})
