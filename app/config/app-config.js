// Simple React Native specific changes
import { Platform } from 'react-native'

export default {
  // use 10.0.2.2 for Android to connect to host machine
  apiUrl: Platform.OS === 'ios' ? 'http://localhost:8080/api/' : 'https://dashboard.nextpos.so/api/',
  appUrlScheme: 'nextpos',
}
