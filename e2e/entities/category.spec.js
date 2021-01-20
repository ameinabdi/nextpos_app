const Utils = require('../utils')

describe('Category Screen Tests', () => {
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
    await navigateToCategoryScreen()
  })

  const navigateToCategoryScreen = async () => {
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await element(by.id('entitiesDrawerButton')).tap()
    await Utils.scrollTo('categoryEntityScreenButton', 'entityScreenScrollList')
    await element(by.id('categoryEntityScreenButton')).tap()
  }

  it('should allow you to create an entity', async () => {
    await expect(element(by.id('categoryScreen'))).toBeVisible()
    await expect(element(by.text('Create'))).toBeVisible()
    // create
    await element(by.id('categoryCreateButton')).tap()
    await Utils.scrollTo('categoryInput', 'categoryEditScrollView')
    await element(by.id('categoryInput')).replaceText('sample-data')
    await Utils.scrollTo('descriptionInput', 'categoryEditScrollView')
    await element(by.id('descriptionInput')).replaceText('sample-data')
    await Utils.scrollTo('imageFullInput', 'categoryEditScrollView')
    await element(by.id('imageFullInput')).replaceText('sample-data')
    await Utils.scrollTo('imageFullUrlInput', 'categoryEditScrollView')
    await element(by.id('imageFullUrlInput')).replaceText('sample-data')
    await Utils.scrollTo('imageThumbInput', 'categoryEditScrollView')
    await element(by.id('imageThumbInput')).replaceText('sample-data')
    await Utils.scrollTo('imageThumbUrlInput', 'categoryEditScrollView')
    await element(by.id('imageThumbUrlInput')).replaceText('sample-data')
    await element(by.id('submitButton')).tap()
    await element(by.text('View')).tap()
    await Utils.scrollTo('category', 'categoryDetailScrollView')
    await expect(element(by.id('category'))).toHaveText('Category: sample-data')
    await Utils.scrollTo('description', 'categoryDetailScrollView')
    await expect(element(by.id('description'))).toHaveText('Description: sample-data')
    await Utils.scrollTo('imageFull', 'categoryDetailScrollView')
    await expect(element(by.id('imageFull'))).toHaveText('ImageFull: sample-data')
    await Utils.scrollTo('imageFullUrl', 'categoryDetailScrollView')
    await expect(element(by.id('imageFullUrl'))).toHaveText('ImageFullUrl: sample-data')
    await Utils.scrollTo('imageThumb', 'categoryDetailScrollView')
    await expect(element(by.id('imageThumb'))).toHaveText('ImageThumb: sample-data')
    await Utils.scrollTo('imageThumbUrl', 'categoryDetailScrollView')
    await expect(element(by.id('imageThumbUrl'))).toHaveText('ImageThumbUrl: sample-data')
    // update
    await element(by.text('EDIT')).tap()
    await Utils.scrollTo('categoryInput', 'categoryEditScrollView')
    await element(by.id('categoryInput')).replaceText('sample-data-2')
    await Utils.scrollTo('descriptionInput', 'categoryEditScrollView')
    await element(by.id('descriptionInput')).replaceText('sample-data-2')
    await Utils.scrollTo('imageFullInput', 'categoryEditScrollView')
    await element(by.id('imageFullInput')).replaceText('sample-data-2')
    await Utils.scrollTo('imageFullUrlInput', 'categoryEditScrollView')
    await element(by.id('imageFullUrlInput')).replaceText('sample-data-2')
    await Utils.scrollTo('imageThumbInput', 'categoryEditScrollView')
    await element(by.id('imageThumbInput')).replaceText('sample-data-2')
    await Utils.scrollTo('imageThumbUrlInput', 'categoryEditScrollView')
    await element(by.id('imageThumbUrlInput')).replaceText('sample-data-2')
    await element(by.id('submitButton')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('category'))).toHaveText('Category: sample-data-2')
    await expect(element(by.id('description'))).toHaveText('Description: sample-data-2')
    await expect(element(by.id('imageFull'))).toHaveText('ImageFull: sample-data-2')
    await expect(element(by.id('imageFullUrl'))).toHaveText('ImageFullUrl: sample-data-2')
    await expect(element(by.id('imageThumb'))).toHaveText('ImageThumb: sample-data-2')
    await expect(element(by.id('imageThumbUrl'))).toHaveText('ImageThumbUrl: sample-data-2')
    // delete
    await element(by.text('DELETE')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('categoryScreen'))).toBeVisible()
  })
})
