import realm from './db';


import _ from 'lodash'



export const storeInDb= (object) =>
  new Promise((resolve, reject) => {
    console.tron.log('categorues', object)
    try {
      realm.write(() => {
        for (let i = 0; i < object.length; i++) {
          const objectSave = {
            id: object[i].id,
            categoryName: object[i].categoryName,
            description: object[i].description,
            createdAt: object[i].createdAt,
            updatedAt: object[i].updatedAt,
            shopId: object[i].shopId,
            tenantId: object[i].tenantId,
            createdById: object[i].createdById,
            updatedById: object[i].updatedById,
            product: object[i].product,
          }
          console.tron.log('objectSave successfly saved',objectSave)

          realm.create('Category', objectSave, true)
        }
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
      const response = realm.objects('Category')
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