import realm from './db';


import _ from 'lodash'



export const storeInDb = (object) =>
  new Promise((resolve, reject) => {
    var ID = realm.objects('Order').max("id") + 1;
    try {
      realm.write(() => {
          const objectSave = {
            id: ID ? ID : 1,
            title:object.title,
            totalPrice:object.totalPrice,
            quantity:parseInt(object.quantity),
            totalTax:object.totalTax,
            orderStatus:object.orderStatus,
            note:object.note,
            createdAt:object.createdAt,
            updatedAt:object.updatedAt,
            customer:object.customer,
            shop:object.shop,
            table:object.table,
            createdById:object.createdById,
            updatedById:object.updatedById,
            orderItems:object.orderItems,
          };

          realm.create('Order', objectSave, true)
      })
      console.tron.log('Order successfly saved')
      resolve({ 
      'ok': true,
      'data':object})
    } catch (e) {
      console.tron.log('Error on line Store', e)
      resolve({ 
        'ok': false,
        'data':'Error'})
    }
  })


export const fetchAll = ()  =>
  new Promise((resolve, reject) => {
    try {
      const response = realm.objects('Order')
      rows = JSON.parse(JSON.stringify([...response]))
      const array = _.values(rows)

      resolve({
        'ok': true,
        'data':array
      })
    } catch (e) {
      resolve({
        'ok':false,
        'data':e
      })
      console.tron.log('Error on creation',e)
    }
  })


export const updateInDb = (object) =>
  new Promise((resolve, reject) => {
    var response = realm.objects('Order').filtered(`id = ${object.id}`);
    try {
      realm.write(() => {
        realm.create('Order',{
            id: response[0].id,
            title:object.title,
            totalPrice:object.totalPrice,
            quantity:parseInt(object.quantity),
            totalTax:object.totalTax,
            orderStatus:object.orderStatus,
            updatedAt:object.updatedAt,
            updatedById:object.updatedById,
            orderItems:object.orderItems
        }, true)
      })
      resolve({
        'ok':true,
        'data':{object}
      })

    } catch (e) {
      resolve({
        'ok':false,
        'data':e
      })
      console.tron.log('Error on creation', ...e)
    }
  })

export const deleteInDbAccount = (id) =>

  new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const singleMeterReadings = realm.objects('Account').filtered(`id == "${id}"`)
        realm.delete(singleMeterReadings) // delete All PIN Code
        console.tron.log('deleted',singleMeterReadings)
      });
      resolve({
        'ok': true,
        'data':'Successfully Deleted'
      })
    } catch (e) {
      resolve({
        'ok':false,
        'data':e
      });
      console.tron.log('Error on creation',e)
    }
  });

export const deleteInDbAllAccount = (id) =>

  new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const singleMeterReadings = realm.objects('Account')
        realm.delete(singleMeterReadings) // delete All PIN Code
        console.tron.log('deleted',singleMeterReadings)
      });
      resolve({
        'ok': true,
        'data':'Successfully Deleted'
      })
    } catch (e) {
      resolve({
        'ok':false,
        'data':e
      });
      console.tron.log('Error on creation',e)
    }
  });