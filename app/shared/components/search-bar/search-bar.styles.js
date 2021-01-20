import { StyleSheet } from 'react-native'

import { Fonts, Colors, Metrics } from '../../themes'

export default StyleSheet.create({
  container: {
    marginTop: Metrics.smallMargin,
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    width: Metrics.screenWidth - Metrics.baseMargin,
  },
  searchInput: {
    flex: 5,
    height: Metrics.searchBarHeight,
    alignSelf: 'flex-start',
    padding: Metrics.smallMargin,
    textAlign: 'left',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingLeft: 70,
    color: Colors.secondary,
    flexDirection: 'row',
  },
  searchIcon: {
    left: Metrics.doubleSection,
    alignSelf: 'center',
    color: Colors.text,
    backgroundColor: Colors.transparent,
  },
  closeIcon: {
    alignSelf: 'center',
    color: Colors.white,
  },
  cancelButton: {
    height:60,
    width:50,
    borderRadius: 10,
    backgroundColor:Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Metrics.baseMargin,
  },
  buttonLabel: {
    color: Colors.secondary,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular,
  },
})
