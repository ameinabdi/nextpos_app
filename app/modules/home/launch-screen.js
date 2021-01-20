import React from 'react'
import { View ,Text,Alert,Image} from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid";
import { Navigation } from 'react-native-navigation'
 import CategoryEntityScreen from '../entities/category/category-entity-screen'
import styles from './launch-screen.styles'
import { Colors,Images } from '../../shared/themes';
import ProductEntityScreen from '../entities/product/product-entity-screen';
import { Card, CardItem, Left, Right, Button, Body, Header } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign'
import PosOrderScreen from '../entities/order/posorder-screen'
import { connect } from 'react-redux'
import OrderActions from '../../shared/reducers/order.reducer'
import Modal from 'react-native-modal';
import Attendence from '../entities/attendance/attendence'
import RateComponent from '../../shared/components/currency-component'

class LaunchScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.showProduct.bind(this)
    this.state = {
      objects:null,
      isModalVisible: false,
      rate:true
    }
    this.toggleModal.bind()
  }

  componentDidAppear() {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          enabled: true,
          visible: false,
        },
      },
    })
  }

  showSideMenu(buttonId) {
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          left: {
            visible: true,
          },
        },
      })
    
  }

  toggleModal = (data) => {
      this.setState({isModalVisible:!this.state.isModalVisible, rate:data ? data.rate:null})
  };
  navigationButtonPressed({ buttonId }) {
    this.showSideMenu(buttonId)
  }

  showProduct=(data)=>{
    this.setState({
      objects:data
    })
  }

  

  render() {
    const {objects} = this.state;
    const { currency,account } = this.props;
    return (
  
    <Grid style={styles.container}>
      
      <Col style={styles.product}>
        <Header androidStatusBarColor={Colors.secondary} style={{backgroundColor:Colors.secondary}}>
          <Left>
            <Button transparent onPress={()=>this.showSideMenu()}>
              <Image source={Images.menuIcon} style={{color:Colors.white, width:20, height:20}}/>
            </Button>
          </Left>
          <Right>
            <Button transparent onPress={()=>this.toggleModal({rate:true})}>
              <Image source={Images.rate} style={{color:Colors.white, width:20, height:20}}/>
            </Button>
            {/* <Button transparent onPress={()=>this.toggleModal()} style={{marginRight:10}}>
              <Image source={Images.clock} style={{color:Colors.white, width:20, height:20}}/>
            </Button> */}
            <View style={styles.profile}>
            <Text style={styles.name}>{account ? account.firstName : null}</Text>
            <Text style={styles.phone}>{account ? account.phoneNumber : null}</Text>
            </View>
          </Right>
        </Header>
        <Row style={styles.category} >
          <Text style={styles.titleCategory}>Categories</Text>
          <CategoryEntityScreen  showProduct={this.showProduct}/> 
        </Row>
        <Row style={styles.product} >
         <ProductEntityScreen productItem={objects} />
        </Row>
      </Col>
      <Col style={styles.order}>
          <PosOrderScreen />
      </Col>
        <Modal
            testID={'modal'}
            isVisible={this.state.isModalVisible}
            onSwipeComplete={this.toggleModal}
            swipeDirection={['up','down']}
            style={styles.view}>
            <View style={styles.modelCantainer}>
              <View style={styles.modelHead}>
                  <Button style={styles.buttonModal} onPress={()=>this.toggleModal()} transparent>
                    <Icon name="close" color={Colors.secondary} size={35} />
                  </Button>
              </View>
              <View style={styles.modelbody}>
                {this.state.rate ?
                  <RateComponent currency={currency} />
                 :
                 <Attendence onCancelModel={()=>this.toggleModal()} />
                 }
              </View>
             </View>
          </Modal>
  </Grid>
    )
  }
}
const mapStateToProps = (state) => ({
	// ...redux state to props here
  currency: state.account.currency,
  account:state.account.account,

})


const mapDispatchToProps = (dispatch) => ({
	orderDelete: () => dispatch(OrderActions.orderDeleteRequest()),
	
})

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)