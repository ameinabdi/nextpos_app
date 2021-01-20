import React from 'react'
import { FlatList, Text, TouchableOpacity,ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { customerDetailScreen, customerEditScreen } from '../../../navigation/layouts'
import SearchBar from '../../../shared/components/search-bar/search-bar'
import CustomerActions from './customer.reducer'
import styles from './customer-entity-screen-style'
import AlertMessage from '../../../shared/components/alert-message/alert-message'
import { Row, Col, Button, Title, Left, Body, Header } from 'native-base'
import { PullToRefreshView } from 'react-native-smooth-pull-to-refresh'
import LottieView from 'lottie-react-native'
import Animation from '../../../animation'
// More info here: https://reactnative.dev/docs/flatlist.html

class CustomerEntityScreen extends React.PureComponent {
  constructor(props) {
    super(props)
      Navigation.events().bindComponent(this)
   

    this.state = {
      page: 0,
      sort: 'id,asc',
      size: 20,
      searchTerm: '',
      dataObjects:[],
      isRefreshing: false,


    }
    this.fetchCustomers()

  }

  navigationButtonPressed({ buttonId }) {
    customerEntityEditScreen({ entityId: null })
  }
  componentDidAppear() {
    this.setState({ page: 0 }, () => {
      this.handleLoadMore()
    })
  }
  onInnerRefresh=()=> {
    this.setState({title: "Loading..."});
    this.startRefreshing();
    this.fetchCustomers()

  }

      
  startRefreshing = ()=> {
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 1500);
  }


  renderRow({ item ,index}) {
    return (
      <TouchableOpacity onPress={customerDetailScreen.bind(this, { customerId: item.id })}>
        <Row style={styles.row}>
               <Col style={styles.colNo}>
                      <Text style={styles.boldLabel}>{index+1}</Text>
                </Col>
                <Col style={styles.colName}>
                    <Text style={styles.boldLabel}>{item.fullname}</Text>
                </Col>
                <Col style={styles.colName}>
                    <Text style={styles.boldLabel}>{item.phone}</Text>
                </Col>
                <Col style={styles.colName}>
                    <Text style={styles.boldLabel}>{item.address}</Text>
                </Col>
                <Col style={styles.colName}>
                    <Text style={styles.boldLabel}>{item.Amount}</Text>
                </Col>
        </Row>
          {/* <Text style={styles.label}>{item.description}</Text> */}
      </TouchableOpacity>
    )
  }

  // Render a header
  _renderHeader = () => {
    return (
      <View style={styles.header}>
        <SearchBar onSearch={this.performSearch} searchTerm={this.state.searchTerm} onCancel={this.cancelSearch} />
            <Row style={styles.headRow}>
                <Col style={styles.colNo}>
                    <Text style={styles.label}>No</Text>
                </Col>
                <Col style={styles.colName}>
                    <Text style={styles.label}>Name</Text>
                </Col>
                <Col style={styles.colName}>
                    <Text style={styles.label}>Phone</Text>
                </Col>
                <Col style={styles.colName}>
                    <Text style={styles.label}>Address</Text>
                </Col>
                <Col style={styles.colName}>
                    <Text style={styles.label}>Amount</Text>
                </Col>
            </Row>
      </View>
    )
}
  // Show this when data is empty
  renderEmpty = () => <AlertMessage title="No Customers Found" show={!this.props.fetching} />

  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  cancelSearch = () => {
    this.setState({
      searchTerm: '',
    })
    this.fetchCustomers()
  }

  performSearch = (query) => {
    const { account } = this.props;

    if (query === '') {
      this.cancelSearch()
      return
    }
    this.setState({
      searchTerm: query,
    })
    this.props.performSearch({tenantId:account.tenants[0] ? account.tenants[0].tenantId : null, fullname:query})
  }
  fetchCustomers = () => {
    const { account } = this.props;
    this.props.getAllCustomers({ tenantId:account.tenants[0] ? account.tenants[0].tenantId : null, shopId:account.shopId})
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.customers.rows) {
      return {
        done: nextProps.customers.rows.length < prevState.size,
        dataObjects: [ ...nextProps.customers.rows],
      }
    }
    return null
  }

  handleLoadMore = () => {
    if (this.state.page < this.props.links.next || this.props.links.next === undefined || this.props.fetching) {
      return
    }
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.fetchCustomers()
      },
    )
  }

  render() {
    return (
      <View style={styles.container} testID="customerScreen">
        {this._renderHeader()}
        <PullToRefreshView
          minPullDistance={120}
          pullAnimHeight={120}
          pullAnimYValues={{from: 0, to: 10}}
          isRefreshing={this.state.isRefreshing}
          onRefresh={this.onInnerRefresh}
          contentComponent={
            <ScrollView style={styles.table}> 
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          onEndReached={this.handleLoadMore}
          /* ListFooterComponent={this.renderFooter} */
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
        </ScrollView>
      } >
      <View style={styles.loadingview}>
          <LottieView
          autoPlay
          style={styles.lottieView}
          source={Animation.PullRefresh}
          />         
        </View> 
      </PullToRefreshView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    account: state.account.account,
    customers: state.customers.customers,
    fetching: state.customers.fetchingAll,
    error: state.customers.errorAll,
    links: state.customers.links,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(CustomerActions.customerSearchRequest(query)),
    getAllCustomers: (options) => dispatch(CustomerActions.customerAllRequest(options)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEntityScreen)
