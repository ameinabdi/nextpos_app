import React,{Component} from 'react';
import { View, Text, Alert} from 'react-native';
import styles from './priinter-component.style'
import LottieView from 'lottie-react-native'
import Animation from '../../../animation'
import {  Button } from 'native-base';
import moment from 'moment';
import {
    USBPrinter,
    IUSBPrinter
  } from "react-native-thermal-receipt-printer";
import _ from 'lodash';

const printerList = {
  usb: USBPrinter,
};

class PrinterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            printers:[],
            currentprinter: null
         }
    }

    printer =  async ()=>{
      try {
    const { order,totalorder, totalTax,account,currency,table } = this.props
        USBPrinter.printBill(`
        <C>
        <CD>Receipt Paper</CD>\n
        <CD>${account.shop ? account.shop.shopName : ''}</CD>\n
        <CD>${account.paymentMethod ? account.paymentMethod.paymentMethod +': '+account.paymentMethod.account : ''}</CD>\n
        ${account.shop ? account.shop.paymentMethod ? account.shop.paymentMethod.map((item)=>{
        return `
        <C>${item.paymentMethod + ': ' + item.account } </C>`;
        }):'':''}
        <C>${table ? table.table : ''}</C>\n
        <C>${moment(Date.now()).format('LLL')}</C>\n
        <C> item Name     Quantity    Price     Total</C>\n
        -------------------------------------\n
        ${order.orderItems.map((item)=>{
        return `
        <C>${item.orderItemName + '  ' + item.ordetItemQuantity + '    *    ' + item.ordetItemPrice + '    ' + (item.ordetItemQuantity * item.ordetItemPrice)} </C>\n`;
        })}
        -------------------------------------\n
        <C>Tax: ${totalTax}</C>\n
        <C>Total : $ ${totalorder}</C>\n
        ${
        currency ?
        ` <C>Total: ${ currency.currencyIso+' '+totalorder*currency.shillingRate}</C>\n`
        :''
        }
        <C>www.nextpos.so</C>\n
        <C>${moment(Date.now()).format('YYYY')}</C>\n
            
        </C>\n
        `)
        } catch (err) {
          Alert.alert('No Printer Is Connected!  Please Connect Printer',)
        }
        
       
     
      
    }


    render() { 
        const { printers } = this.state;
       
        return (  
          <View style={styles.container}>
               <LottieView
                autoPlay
                style={styles.lottieView}
                source={Animation.success}
                />    
              <Text style={styles.text}>Success full paid</Text>

              <View style={styles.footer}>
                    {
                        printers.map(printer => (
                        <TouchableOpacity key={printer.device_id} onPress={() => _connectPrinter(printer)}>
                            {`device_name: ${printer.device_name}, device_id: ${printer.device_id}, vendor_id: ${printer.vendor_id}, product_id: ${printer.product_id}`}
                        </TouchableOpacity>
                        ))
                    }
                  <Button style={styles.button} onPress={this.printer}>
                        <Text style={styles.buttonText}>Print</Text>
                  </Button>
              </View>
          </View>
        );
    }
}
 
export default PrinterComponent;