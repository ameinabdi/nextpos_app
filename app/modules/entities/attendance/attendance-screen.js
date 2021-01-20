import React from 'react'
import { Alert, ScrollView,FlatList, Text,View, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import t from 'tcomb-form-native'
import AttendenceAction from './attendence.reducer'


// Styles
import styles from './attendance-screen.style'
import { Avatar ,Badge} from 'react-native-elements';
import { Colors } from '../../../shared/themes'
import AlertMessage from '../../../shared/components/alert-message/alert-message'
import { Left, Right, Body, List, ListItem } from 'native-base';
import Icon  from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/AntDesign'
import moment from 'moment';

const Form = t.form.Form

class AttendanceScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataObjects:[],
      isRefreshing: false,

    }
    const { account } = this.props;
    if(account){
      this.props.allAttendence({id:account.id, tenentId:account.tenants[0].tenantId})
    }
    
  }



  onInnerRefresh=()=> {
    const { account } =  this.props
    this.props.allAttendence({id:account.id, tenentId:account.tenants[0].tenantId})
    this.startRefreshing();

  }

  startRefreshing = () => {
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 1500);
  }


  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.attendences.rows) {
      return {
        done: nextProps.attendences.count.length < prevState.size,
        dataObjects: [...nextProps.attendences.rows],
      }
    }
    return null
  }

  renderRow({ item }) {

    return (
        <List style={styles.row}>
          <ListItem noBorder>
            <Left>
              <Text style={styles.headtitle}>Date</Text>
            </Left>
            <Right>
            <Text note style={styles.headdesc} numberOfLines={2}>{moment(item.checkinTime).format('M-DD-YY')}</Text>
            </Right>
          </ListItem>
          <ListItem avatar noBorder button >
            <Left>
              <View style={styles.iconview}>
                <Icons  name="clockcircle" color={Colors.title} size={20} />
              </View>
            </Left>
            <Body style={styles.body}>
              <View>
                 <Text style={styles.title}>Check In</Text>
                 <Text note style={styles.desc} numberOfLines={1}>{moment(item.checkinTime).format('HH:mm:ss')}</Text>
              </View>
              <View>
                 <Text style={styles.title}>Check Out</Text>
                 <Text note style={styles.desc} numberOfLines={1}>{item.checkOutTime ? moment(item.checkOutTime).format('HH:mm:ss'):'No Time'}</Text>
              </View>
            
            </Body>
            <Right style={{justifyContent:'center'}}>
            <Text style={styles.title}>Total</Text>
                 <Text note style={styles.desc} numberOfLines={1}>{item.totalhours}</Text>
            </Right>
          </ListItem>
        </List>
    )
  }

  
  // Render a header
  // renderHeader = () =>
  //   <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Show this when data is empty
  renderEmpty = () => <AlertMessage title="No Documents Found" show={!this.props.fetching} />

  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20
 

  render() {
      const { account } = this.props;
      const { dataObjects } = this.state;
     console.tron.log('yeee',dataObjects, account)
     if(!account){
       return <Text>Loading</Text>
     }
    return (
      <View style={styles.container}>
        <View style={styles.header}> 
        <View>
            <Avatar
            size={100}
            rounded
            icon={{name: 'user', type: 'font-awesome', color:Colors.primary}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.6}
            containerStyle={styles.Thumbnail}
            source={{ uri: account.avatars[0] ? account.avatars[0].downloadUrl:''}}
            title={account.fullName}
            />
        <Badge
            status="success"
            containerStyle={{ position: 'absolute', bottom: 0, right: 10 }}
            badgeStyle={{ width:30, height:30, borderRadius:50,}}
        />
        </View>
        
          <Text style={styles.name}>{account.fullName}</Text>
          <Text note style={styles.name}>{account.email}</Text>

        </View>
        <View style={styles.content}>
        
            <ScrollView style={styles.listContent}>
              <FlatList
                  contentContainerStyle={styles.list}
                  data={dataObjects}
                  renderItem={this.renderRow}
                  keyExtractor={this.keyExtractor}
                  initialNumToRender={this.oneScreensWorth}
                  onEndReached={this.handleLoadMore}
                  /* ListHeaderComponent={this.renderHeader} */
                  /* ListFooterComponent={this.renderFooter} */
                  ListEmptyComponent={this.renderEmpty}
                  ItemSeparatorComponent={this.renderSeparator}
                />
              </ScrollView>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    attendences: state.attendences.attendences,
    account: state.account.account,
    updating: state.account.updating,
    error: state.account.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    allAttendence: (data) => dispatch(AttendenceAction.attendenceAllRequest(data)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceScreen)
