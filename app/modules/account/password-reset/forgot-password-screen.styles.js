import { StyleSheet } from 'react-native'

import { ApplicationStyles, Colors } from '../../../shared/themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginVertical:100,
    padding: 20,
    justifyContent:'flex-end',
  },
  
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  loading:{
    alignSelf:'center',
    width:100,
    height:100
  },
  button: {
    height: 45,
    backgroundColor: Colors.primary,
    borderColor: Colors.jhipsterBlue,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop:0,
    width:200,
    height:200
  },
})
