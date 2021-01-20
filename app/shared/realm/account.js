import realm from './db';


import _ from 'lodash'



export const storeInDbAccount = (object, token, auth) =>
  new Promise((resolve, reject) => {
    try {
      realm.write(() => {
          const objectSave = {
            id: object.id,
            fullName:object.fullName,
            firstName:object.firstName,
            lastName:object.lastName,
            phoneNumber:object.phoneNumber,
            password: auth.password,
            pin: parseInt(object.pin),
            email:object.email,
            createdAt:object.createdAt,
            updatedAt:object.updatedAt,
            deletedAt:object.deletedAt,
            shopId:object.shopId,
            paymentMethodId:object.paymentMethodId,
            createdById:object.createdById,
            updatedById:object.updatedById,
            paymentMethod:object.paymentMethod,
            shop:object.shop,
            token:token,
          };

          realm.create('Account', objectSave, true)
          console.tron.log('Account successfly saved', object)
      })
      console.tron.log('Account successfly saved')
      resolve(object)
    } catch (e) {
      console.tron.log('Error on line Store', e)
      resolve('error')
    }
  })


export const fetchAll = ()  =>
  new Promise((resolve, reject) => {
    try {
      const response = realm.objects('Account')
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


export const updateInDbAccount = (object) =>
  new Promise((resolve, reject) => {
    var response = realm.objects('Account').filtered(`id = ${object.id}`);
    try {
      realm.write(() => {
        realm.create('Account',{
          id:object.id,
          ClassName: object.className,
          Age:object.age,
          Male:object.male,
          Female:object.female,
          Total:object.total,
          RegNo:object.RegNo,
          emisID:object.EmisID
        }, 'modified')
      })
      console.tron.log('successupdated', object)
      resolve({
        'ok':true,
        'data':{object}
      })

    } catch (e) {
      resolve({
        'ok':false,
        'data':e
      })
      console.tron.log('Error on creation', e)
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