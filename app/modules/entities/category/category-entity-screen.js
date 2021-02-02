import React from 'react'
import { FlatList, Text, TouchableOpacity, View,ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { categoryEntityDetailScreen } from '../../../navigation/layouts'
import SearchBar from '../../../shared/components/search-bar/search-bar'
import CategoryActions from './category.reducer'
import styles from './category-entity-screen-style'
import AlertMessage from '../../../shared/components/alert-message/alert-message'
import ProductEntityScreen from '../product/product-entity-screen'
import ProductActions from '../product/product.reducer'

// More info here: https://reactnative.dev/docs/flatlist.html

class CategoryEntityScreen extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      sort: 'id,asc',
      size: 20,
      searchTerm: '',
      dataObjects:[]
    }
    this.fetchCategories()

  }


  renderRow=({ item }) =>{
    return (
      <TouchableOpacity onPress={() => this.showProduct(item)} >
        <View style={styles.row}>
          <Text style={styles.boldLabel}>{item.categoryName}</Text>
          <Text style={styles.label}>{item.product.length} Items </Text> 
        </View>
      </TouchableOpacity>
    )
  }
  showProduct=(data)=>{
    const { account } = this.props;
    this.props.getAllProducts(data.product)
    // this.props.showProduct(data)
  }

  
   
  // Show this when data is empty
  renderEmpty = () => <AlertMessage title="No Categories Found" show={!this.props.fetching} />

  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  
  fetchCategories = () => {
    const { account } = this.props;
    console.tron.log('ssss', account)
    this.props.getAllCategories({ tenantId: account.tenantId })
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.categories.rows) {
      return {
        done: nextProps.categories.rows.length < prevState.size,
        dataObjects: [ ...nextProps.categories.rows],
      }
    }
    return null
  }

  render() {
    return (
      <ScrollView horizontal testID="categoryScreen">
        <FlatList
          contentContainerStyle={styles.listContent}
          numColumns={4}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          onEndReached={this.handleLoadMore}
          ListHeaderComponent={this.renderHeader}
          
          /* ListFooterComponent={this.renderFooter} */
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
    </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    account: state.account.account,
    categories: state.categories.categories,
    fetching: state.categories.fetchingAll,
    error: state.categories.errorAll,
    links: state.categories.links,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: (options) => dispatch(ProductActions.productAllRequest(options)),
    performSearch: (query) => dispatch(CategoryActions.categorySearchRequest(query)),
    getAllCategories: (options) => dispatch(CategoryActions.categoryAllRequest(options)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEntityScreen)
