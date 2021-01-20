import { StyleSheet } from 'react-native'

import { ApplicationStyles, Metrics, Colors } from '../../../shared/themes'

export default StyleSheet.create({
	container: {
        marginTop:Metrics.baseMargin
	},
  row: {
    flexDirection:'column',
    width:190,
    height:80,
    borderRadius:5,
    alignItems:'flex-start',
    backgroundColor: Colors.secondaryBackground,
    marginVertical:5,
    marginHorizontal: Metrics.smallMargin,
    justifyContent: 'flex-start',
    shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
  },
  selectedrow: {
    flexDirection:'column',
    width:190,
    height:80,
    borderRadius:5,
    alignItems:'flex-start',
    backgroundColor: Colors.primary,
    color:Colors.white,
    marginVertical:5,
    marginHorizontal: Metrics.smallMargin,
    justifyContent: 'flex-start',
    shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
  },
  selectedboldLabel: {
    fontWeight: '500',
    alignSelf: 'flex-start',
    color: Colors.white,
    fontSize:20,
    textAlign: 'center',
    marginHorizontal:Metrics.doubleBaseMargin,
    marginTop: Metrics.baseMargin,
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
    justifyContent:'space-between',
    padding:10,
  },
})
