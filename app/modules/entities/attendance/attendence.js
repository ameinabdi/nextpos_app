import React from 'react'
import { ScrollView, Text, Image, Alert, View, Platform } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import { chatEntityScreen,profile } from '../../../navigation/layouts'
import { Colors, Images } from '../../../shared/themes'
import AttendenceAction from './attendence.reducer'

import { Container, Card, CardItem, Left, Right, Body, Thumbnail, Button } from 'native-base'
import styles from './attendence-styles'
import Icon  from 'react-native-vector-icons/AntDesign'
import moment from 'moment';

class Attendance  extends  React.Component {
    constructor(props) {

        super(props);
        this.state = { 
            checkin:'',
            checkout:'',
         }
    }

    
    confirmCheckout = () => {
          Alert.alert(
            'Check out Now?',
            'Are You Sure You Want To Check Out Now?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'OK',
                onPress: () => {
                  this.handleCheckOut()
                },
              },
            ],
            { cancelable: false },
          )
    
        
      }
    handleCheckIn=()=>{
        const account = this.props.account
        const data = {
          checkinTime: moment().format(),
          checkoutTime:null,
          totalhours:0,
          tenantId: account.tenants[0] ? account.tenants[0].tenantId : null
        } 
        
       this.props.checkIn(data)
       this.props.onCancelModel()
     }

    handleCheckOut=()=>{
        const { checkin,account } = this.props;
        const data = {
            id:checkin.id,
            checkinTime:checkin.checkinTime,
            checkOutTime:moment().format(),
            totalhours:0,
            tenantId: account.tenants ? account.tenants[0].tenantId : null
          } 
        this.props.checkOut(data,checkin.id)
        this.props.onCancelModel()

    }


    render() { 
        const { checkin } = this.props;
        console.tron.log('checkIN',this.props)

        return ( 
          <>
            <Text style={styles.title}>Attendance</Text>
        <View style={styles.container}>
           <Left>
            {
                checkin ?(
                <Button primary style={styles.button} disabled>
                    <Icon name="check" size={30} color={Colors.white} />
                    <Text style={styles.time}>checked In</Text>
                    <Text style={styles.time}>{moment(checkin.checkinTime).format("HH:mm")}</Text>
                </Button>
                ):(
                <Button primary style={styles.button} onPress={this.handleCheckIn}>
                    <Icon name="login" size={30} color={Colors.white} />
                    <Text style={styles.time}>Check In</Text>
                    <Text style={styles.time}>{moment(this.state.time).format("HH:mm")}</Text>
                 </Button>
                )
            }
            
           </Left>

           <Right>
           {
                checkin ?(
               <Button primary style={styles.button} onPress={this.confirmCheckout}>
                 <Icon name="logout" size={30} color={Colors.white} />
                     <Text style={styles.time}>Check Out</Text>
                    <Text style={styles.time}>{moment().format("HH:mm")}</Text>
               </Button>
                ):(
                    <Button primary style={styles.button} disabled>
                    <Icon name="logout" size={30} color={Colors.white} />
                        <Text style={styles.time}>Check Out</Text>
                       <Text style={styles.time}>{moment().format("HH:mm")}</Text>
                  </Button>
                    )
                }
            </Right>
         </View>
          </>
         );
    }
}
 
const mapStateToProps = (state) => {
    return {
      // ...redux state to props here
      attendences: state.attendences.attendences,
      checkin: state.attendences.checkIn,
      fetching: state.attendences.fetchingAll,
      error: state.attendences.errorAll,
      links: state.attendences.links,
      account:state.account.account
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
    checkIn: (data) => dispatch(AttendenceAction.checkInRequest(data)),
    Location: (location) => dispatch(AttendenceAction.currentLocationRequest(location)),
    checkOut: (data,id) => dispatch(AttendenceAction.checkOutRequest(data,id)),
   
  
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Attendance)
  