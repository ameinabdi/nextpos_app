import { Colors, Metrics} from '../../shared/themes'
export default {
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingLeft:Metrics.doubleBaseMargin,
    
  },
  header:{
   flex:1,
   height:200,
   backgroundColor:Colors.white,
   justifyContent:'center',
  },

  logo: {
    resizeMode: 'contain',
    height: 180,
    width: 180,
  },
}
