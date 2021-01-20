import { Metrics, Colors, Fonts } from '../../shared/themes'

export default {
  text: {
    ...Fonts.style.h5,
    color: Colors.title,
    marginLeft: Metrics.baseMargin,
  },

  button:{
    flex:1,
    flexDirection:'row',
    marginVertical: Metrics.baseMargin,

  }
}
