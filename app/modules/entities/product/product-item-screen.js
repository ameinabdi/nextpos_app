import React from 'react'
import { FlatList, Text,Image, TouchableOpacity, View, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { productEntityEditScreen } from '../../../navigation/layouts'
import ProductActions from './product.reducer'
import OrderActions from '../../../shared/reducers/order.reducer';
import styles from './product-item-style'
import AlertMessage from '../../../shared/components/alert-message/alert-message'
import {  CardItem, Left, Right, Button } from 'native-base';

// More info here: https://reactnative.dev/docs/flatlist.html

class ProductItemComponant extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      sort: 'id,asc',
      size: 20,
      searchTerm: '',
      dataObjects:[]
    }
  }

  onAddOrder = (data) =>{
    const { product } =  this.props;
    let fullproduct = {...product}
    fullproduct.variantName = data.variantName
    fullproduct.productPrice = data.price
    fullproduct.quantity = 1
    this.props.customerOrderSave(fullproduct)
  }

  
  renderRow = ({ item }) => {
    return (
        <TouchableOpacity  style={styles.product} onPress={()=>this.onAddOrder(item)}>
              <Text style={styles.productName} numberOfLines={2}>{item.variantName}</Text>
               <Text style={styles.productPrice}>${item.price}</Text>
          </TouchableOpacity>
    )
  }

  // Show this when data is empty
  renderEmpty = () => <AlertMessage title="No Products Found" show={!this.props.fetching} />

  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20


  render() {
      const { product } =  this.props;
    return (
      <View style={styles.container} testID="productScreen">
        <FlatList
          contentContainerStyle={styles.listContent}
          data={product.variants}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          onEndReached={this.handleLoadMore}
          ListHeaderComponent={this.renderHeader}
          numColumns={4}
          /* ListFooterComponent={this.renderFooter} */
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    // products: state.products.products,
    fetching: state.products.fetchingAll,
    error: state.products.errorAll,
    links: state.products.links,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(ProductActions.productSearchRequest(query)),
    getAllProducts: (options) => dispatch(ProductActions.productAllRequest(options)),
  	customerOrderSave: (order) => dispatch(OrderActions.customerOrderSave(order))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItemComponant)
