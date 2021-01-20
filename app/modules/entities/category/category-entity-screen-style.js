import { StyleSheet } from 'react-native'

import { ApplicationStyles, Metrics, Colors } from '../../../shared/themes'

export default StyleSheet.create({
	container: {
    
	},
  row: {
    flexDirection:'column',
    width:Metrics.screenWidth/4.5,
    height:80,
    borderRadius:5,
    alignItems:'flex-start',
    backgroundColor: Colors.white,
    marginVertical:5,
    marginHorizontal: Metrics.smallMargin,
    justifyContent: 'flex-start',
  },
  boldLabel: {
    fontWeight: '500',
    alignSelf: 'flex-start',
    color: Colors.title,
    fontSize:20,
    textAlign: 'center',
    marginHorizontal:Metrics.doubleBaseMargin,
    marginTop: Metrics.baseMargin,
  },
  label: {
    fontWeight: '400',
    alignSelf: 'flex-start',
    color: Colors.text,
    fontSize:16,
    textAlign: 'center',
    marginHorizontal:Metrics.doubleBaseMargin,
    marginTop:5,
    marginBottom: Metrics.doubleBaseMargin,

  },
  listContent: {
    padding:10,

  },
})
