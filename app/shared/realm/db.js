import Realm from 'realm' // Define your models and their properties

import {
  Account,
  Shop,
  PaymentMethod,
  Category,
  Product,
  ProductTax,
  Variant,
  ProductThumbnail,
  Order,
  OrderItems

} from './schemes'

const databaseOption = {
	path: 'nextpos.realm',
	schema: [
    Account,
    Shop,
    PaymentMethod,
    Category,
    Product,
    ProductTax,
    Variant,
    ProductThumbnail,
    Order,
    OrderItems
	],
	schemaVersion: 5
}
/**
 * Create Realm objects and write to local storage
 */
//Realm.deleteFile(databaseOption);
const realm = new Realm(databaseOption)

export default realm