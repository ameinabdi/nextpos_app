import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { tableEntityDetailScreen } from '../../../navigation/layouts'
import SearchBar from '../../../shared/components/search-bar/search-bar'
import TableActions from './table-redux'
import styles from './table-component-styles'
import AlertMessage from '../../../shared/components/alert-message/alert-message'
import ProductActions from '../product/product.reducer'

// More info here: https://reactnative.dev/docs/flatlist.html

class TableComponent extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      sort: 'id,asc',
      size: 20,
      searchTerm: '',
      dataObjects:[],
      selectedItem:null
    }
    this.fetchTables()

  }

  selectTable = (selectedItem) =>{
      this.setState({selectedItem})
      this.props.table(selectedItem)
  }

  renderRow=({ item }) =>{
      const { selectedItem } = this.state
    return (
      <TouchableOpacity onPress={() => this.selectTable(item)} >
        <View style={item === selectedItem ? styles.selectedrow: styles.row}>
          <Text style={item === selectedItem ? styles.selectedboldLabel:styles.boldLabel}>{item.table}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  showProduct=(data)=>{
    const { account } = this.props;
    console.tron.log('daa',data)
    this.props.getAllProducts({ tenantId:account.tenants[0] ? account.tenants[0].tenantId : null })
    // this.props.showProduct(data)
  }

  
   
  // Show this when data is empty
  renderEmpty = () => <AlertMessage title="No Tables Found" show={!this.props.fetching} />

  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  
  fetchTables = () => {
    const { account } = this.props;

    this.props.getAllTables({ tenantId:account.tenantId})
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.tables) {
      return {
        done: nextProps.tables.rows.length < prevState.size,
        dataObjects: [ ...nextProps.tables.rows],
      }
    }
    return null
  }

  render() {
    return (
        <FlatList
          contentContainerStyle={styles.listContent}
          horizontal={false}
          numColumns={4}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          extraData={this.state.selectedItem}
          initialNumToRender={this.oneScreensWorth}
          onEndReached={this.handleLoadMore}
          ListHeaderComponent={this.renderHeader}
          /* ListFooterComponent={this.renderFooter} */
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    account: state.account.account,
    tables: state.table.tables,
    fetching: state.table.fetchingAll,
    error: state.table.errorAll,
    links: state.table.links,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTables: (options) => dispatch(TableActions.tableRequest(options)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent)
