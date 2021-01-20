import React from 'react'
import { ScrollView, Text,FlatList ,TouchableOpacity, Platform, Alert} from 'react-native'
import { connect } from 'react-redux'
// Styles
/* eslint-disable no-unused-vars */
 
/* eslint-enable */
import {Card, CardItem,Left, Right, Body } from 'native-base'
import styles from './printer-screen.style';
import {
    USBPrinter,
    NetPrinter,
    BLEPrinter,
  } from "react-native-thermal-receipt-printer";

class PrinterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            printers:[ ],
            currentprinter: null
         }
    }
    componentWillMount(){
        if(Platform.OS == 'android'){
            USBPrinter.init().then(()=> {
              //list printers
              USBPrinter.getDeviceList().then((printers)=>this.setState({printers:printers})).catch((error)=>console.tron.log(error));
            })
          }
    }

 _connectPrinter = (printer) => USBPrinter.connectPrinter(printer.vendor_id, printer.product_id).catch((error)=>Alert.alert('No Connected Device'))

  render() {
      const { printers } = this.state
    return (
        <ScrollView>
            <FlatList
                contentContainerStyle={styles.listContent}
                horizontal={false}
                numColumns={4}
                data={printers}
                renderItem={(item, index)=>{
                    console.tron.log('ssss',item.item)
                return(
                    <TouchableOpacity style={styles.card} onPress={() => this._connectPrinter(item.item)} key={index}>
                      <Text style={styles.title}>Printer</Text>
                      <CardItem >
                          <Left>
                              <Text>device name</Text>
                          </Left>
                          <Body>
                                <Text>{item.item.device_name}</Text>
                          </Body>
                      </CardItem>
                      <CardItem>
                          <Left>
                              <Text>vendor id</Text>
                          </Left>
                          <Right>
                              <Text>{item.item.vendor_id}</Text>
                          </Right>
                      </CardItem>
                      <CardItem>
                          <Left>
                              <Text>product id</Text>
                          </Left>
                          <Right>
                              <Text>{item.item.product_id}</Text>
                          </Right>
                      </CardItem>
                    </TouchableOpacity>
                )
                }}
                keyExtractor={this.keyExtractor}
                onEndThreshold={100}
              />
           
        </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // for developer convenience
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // for developer convenience
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrinterScreen)
