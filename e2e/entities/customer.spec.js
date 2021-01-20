const Utils = require('../utils')

describe('Customer Screen Tests', () => {
  before(async () => {
    await device.reloadReactNative()
    await Utils.loginAsUser()
  })
  after(async () => {
    await Utils.goBack()
    await Utils.goBack()
    await Utils.logout()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
    await navigateToCustomerScreen()
  })

  const navigateToCustomerScreen = async () => {
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await element(by.id('entitiesDrawerButton')).tap()
    await Utils.scrollTo('customerEntityScreenButton', 'entityScreenScrollList')
    await element(by.id('customerEntityScreenButton')).tap()
  }

  it('should allow you to create an entity', async () => {
    await expect(element(by.id('customerScreen'))).toBeVisible()
    await expect(element(by.text('Create'))).toBeVisible()
    // create
    await element(by.id('customerCreateButton')).tap()
    await Utils.scrollTo('fullNameInput', 'customerEditScrollView')
    await element(by.id('fullNameInput')).replaceText('sample-data')
    await Utils.scrollTo('GenderInput', 'customerEditScrollView')
    await element(by.id('GenderInput')).replaceText('sample-data')
    await Utils.scrollTo('phone1Input', 'customerEditScrollView')
    await element(by.id('phone1Input')).replaceText('sample-data')
    await Utils.scrollTo('phone2Input', 'customerEditScrollView')
    await element(by.id('phone2Input')).replaceText('sample-data')
    await Utils.scrollTo('descriptionInput', 'customerEditScrollView')
    await element(by.id('descriptionInput')).replaceText('sample-data')
    await Utils.scrollTo('guarantorNameInput', 'customerEditScrollView')
    await element(by.id('guarantorNameInput')).replaceText('sample-data')
    await Utils.scrollTo('guarantorPhoneInput', 'customerEditScrollView')
    await element(by.id('guarantorPhoneInput')).replaceText('sample-data')
    await Utils.scrollTo('addressInput', 'customerEditScrollView')
    await element(by.id('addressInput')).replaceText('sample-data')
    await Utils.scrollTo('address2Input', 'customerEditScrollView')
    await element(by.id('address2Input')).replaceText('sample-data')
    await element(by.id('submitButton')).tap()
    await element(by.text('View')).tap()
    await Utils.scrollTo('fullName', 'customerDetailScrollView')
    await expect(element(by.id('fullName'))).toHaveText('FullName: sample-data')
    await Utils.scrollTo('Gender', 'customerDetailScrollView')
    await expect(element(by.id('Gender'))).toHaveText('Gender: sample-data')
    await Utils.scrollTo('phone1', 'customerDetailScrollView')
    await expect(element(by.id('phone1'))).toHaveText('Phone1: sample-data')
    await Utils.scrollTo('phone2', 'customerDetailScrollView')
    await expect(element(by.id('phone2'))).toHaveText('Phone2: sample-data')
    await Utils.scrollTo('description', 'customerDetailScrollView')
    await expect(element(by.id('description'))).toHaveText('Description: sample-data')
    await Utils.scrollTo('guarantorName', 'customerDetailScrollView')
    await expect(element(by.id('guarantorName'))).toHaveText('GuarantorName: sample-data')
    await Utils.scrollTo('guarantorPhone', 'customerDetailScrollView')
    await expect(element(by.id('guarantorPhone'))).toHaveText('GuarantorPhone: sample-data')
    await Utils.scrollTo('address', 'customerDetailScrollView')
    await expect(element(by.id('address'))).toHaveText('Address: sample-data')
    await Utils.scrollTo('address2', 'customerDetailScrollView')
    await expect(element(by.id('address2'))).toHaveText('Address2: sample-data')
    // update
    await element(by.text('EDIT')).tap()
    await Utils.scrollTo('fullNameInput', 'customerEditScrollView')
    await element(by.id('fullNameInput')).replaceText('sample-data-2')
    await Utils.scrollTo('GenderInput', 'customerEditScrollView')
    await element(by.id('GenderInput')).replaceText('sample-data-2')
    await Utils.scrollTo('phone1Input', 'customerEditScrollView')
    await element(by.id('phone1Input')).replaceText('sample-data-2')
    await Utils.scrollTo('phone2Input', 'customerEditScrollView')
    await element(by.id('phone2Input')).replaceText('sample-data-2')
    await Utils.scrollTo('descriptionInput', 'customerEditScrollView')
    await element(by.id('descriptionInput')).replaceText('sample-data-2')
    await Utils.scrollTo('guarantorNameInput', 'customerEditScrollView')
    await element(by.id('guarantorNameInput')).replaceText('sample-data-2')
    await Utils.scrollTo('guarantorPhoneInput', 'customerEditScrollView')
    await element(by.id('guarantorPhoneInput')).replaceText('sample-data-2')
    await Utils.scrollTo('addressInput', 'customerEditScrollView')
    await element(by.id('addressInput')).replaceText('sample-data-2')
    await Utils.scrollTo('address2Input', 'customerEditScrollView')
    await element(by.id('address2Input')).replaceText('sample-data-2')
    await element(by.id('submitButton')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('fullName'))).toHaveText('FullName: sample-data-2')
    await expect(element(by.id('Gender'))).toHaveText('Gender: sample-data-2')
    await expect(element(by.id('phone1'))).toHaveText('Phone1: sample-data-2')
    await expect(element(by.id('phone2'))).toHaveText('Phone2: sample-data-2')
    await expect(element(by.id('description'))).toHaveText('Description: sample-data-2')
    await expect(element(by.id('guarantorName'))).toHaveText('GuarantorName: sample-data-2')
    await expect(element(by.id('guarantorPhone'))).toHaveText('GuarantorPhone: sample-data-2')
    await expect(element(by.id('address'))).toHaveText('Address: sample-data-2')
    await expect(element(by.id('address2'))).toHaveText('Address2: sample-data-2')
    // delete
    await element(by.text('DELETE')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('customerScreen'))).toBeVisible()
  })
})