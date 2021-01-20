import React from 'react'
import { FlatList, Text,Image, TouchableOpacity, View, Alert, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import styles from './product-entity-screen.style'
import AlertMessage from '../../../shared/components/alert-message/alert-message'
import {  CardItem, Left, Right, Button } from 'native-base';
import Modal from 'react-native-modal';
import ProductActions from './product.reducer'
import OrderActions from '../../../shared/reducers/order.reducer';
import ProductItemComponent from './product-item-screen';
// More info here: https://reactnative.dev/docs/flatlist.html

class ProductEntityScreen extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      product: null,
      isModalVisible:false,
      dataObjects:[]
    }
    this.toggleModal.bind(this)
  }

  
  onAddOrder = (data) =>{
    let fullproduct = {...data}
    fullproduct.quantity = 1
    this.props.customerOrderSave(data)
  }
  toggleModal = (data) => {
    if(data){
      if(data.variants[0]){
        this.setState({ isModalVisible: !this.state.isModalVisible,product:data })
      }
      else{
        let fullproduct = {...data}
        fullproduct.variantName = null
        fullproduct.quantity = 1
        this.onAddOrder(fullproduct)
      } 
    }else{
      this.setState({ isModalVisible: !this.state.isModalVisible})

    }
  };

  renderRow = ({ item }) => {
    let oderItem = {...item, 'totalPrice':item.price,'totalTax':item.tax}
    return (
        <TouchableOpacity  style={styles.product} onPress={()=>this.toggleModal(item)}>
            <Image source={{uri: item.productThumbnail ? item.productThumbnail[0] ? item.productThumbnail[0].downloadUrl: 'https://midone-laravel.left4code.com/dist/images/food-beverage-12.jpg' : 'https://midone-laravel.left4code.com/dist/images/food-beverage-12.jpg'}} style={styles.thumbnail}/>
            <View style={styles.productfooter}>
               <Text style={styles.productName} numberOfLines={2}>{item.productName}</Text>
            </View>
          </TouchableOpacity>
    )
  }

  // Show this when data is empty
  renderEmpty = () => <AlertMessage title="No Products Found" show={!this.props.fetching} />

  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  fetchProducts = () => {
    const {product} = this.props;
    this.props.getAllProducts({ filter:{product:product.id }})
  }
  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.products.rows) {
      return {
        done: nextProps.products.rows.length < prevState.size,
        dataObjects: [ ...nextProps.products.rows],
      }
    }
    return null
  }


  render() {
    const {isModalVisible, product,dataObjects } = this.state
    return (
      <View horizontal style={styles.container} testID="productScreen">
       <Text style={styles.titleProduct}>Products</Text>
       <ScrollView style={styles.content} horizontal >
        <FlatList
          contentContainerStyle={styles.listContent}
          data={dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          onEndReached={this.handleLoadMore}
          ListHeaderComponent={this.renderHeader}
          numColumns={3}
          /* ListFooterComponent={this.renderFooter} */
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
         </ScrollView>
        <Modal isVisible={isModalVisible}>
          <View style={styles.model}>
            <View style={styles.modelHead}>
              <Text style={styles.headtitle}>{product ? product.productName:'Product'}'s Variants</Text>
             </View>
            <View style={styles.modelbody}>
            <ProductItemComponent product={product} toggleModal={this.toggleModal}/>
            </View>
            <View style={styles.modelfooter}>
             <Button style={styles.button} onPress={()=>this.toggleModal()}>
               <Text style={styles.buttonText}>Cancel</Text>
             </Button>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    products: state.products.products,
    fetching: state.products.fetchingAll,
    error: state.products.errorAll,
    links: state.products.links,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    customerOrderSave: (order) => dispatch(OrderActions.customerOrderSave(order)),
    getAllProducts: (options) => dispatch(ProductActions.productAllRequest(options)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEntityScreen)
