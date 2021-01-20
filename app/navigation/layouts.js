import { AppState, Linking } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import { Images, Metrics } from '../shared/themes'

import createStore from '../shared/reducers'
import Colors from '../shared/themes/colors'
import '../config/reactotron-config'
import AccountActions from '../shared/reducers/account.reducer'

import LoginScreen from '../modules/login/login-screen'
import LaunchScreen from '../modules/home/launch-screen'
import LockScreen from '../modules/lock/lock-screen'
import SetlockScreen from '../modules/lock/set-lock-screen'
import PrinterScreen from '../modules/entities/printer/printer-screen'
import SwitchAccountScreen from '../modules/account/switch-account/switch-account-screen'

import DrawerContent from './drawer/drawer-content'
import SettingsScreen from '../modules/account/settings/settings-screen'
import RegisterScreen from '../modules/account/register/register-screen'
import ForgotPasswordScreen from '../modules/account/password-reset/forgot-password-screen'
import ChangePasswordScreen from '../modules/account/password/change-password-screen'
import EntitiesScreen from '../modules/entities/entities-screen'
import StorybookScreen from '../../storybook'
import CategoryEntityScreen from '../modules/entities/category/category-entity-screen'
import ProductEntityScreen from '../modules/entities/product/product-entity-screen'
import PaymentScreen from '../modules/entities/payment/payment-screen'
import OrderScreen from '../modules/entities/order/posorder-screen'
import OrderListScreen from '../modules/entities/order/orderList-screen'
import CashPaymentScreen from '../modules/entities/payment/CashPayment'
import AttendanceScreen from '../modules/entities/attendance/attendance-screen'
import CustomerEntityEditScreen from '../modules/entities/customer/customer-entity-edit-screen'
import CustomerEntityDetailScreen from '../modules/entities/customer/customer-entity-detail-screen'
import CustomerEntityScreen from '../modules/entities/customer/customer-entity-screen'


export const LOGIN_SCREEN = 'nav.LoginScreen'
export const LOCK_SCREEN = 'nav.LockScreen'
export const SET_LOCK_SCREEN = 'nav.SetlockScreen'
export const SWITCH_ACCOUNT_SCREEN = 'nav.SwitchAccountScreen'

export const REGISTER_SCREEN = 'nav.RegisterScreen'
export const PAYMENT_SCREEN = 'nav.PaymentScreen'
export const ORDER_SCREEN = 'nav.OrderScreen'
export const ORDER_LIST_SCREEN = 'nav.OrderListScreen'
export const CASH_PAYMENT_SCREEN = 'nav.CashPaymentScreen'
export const PRINTER_SCREEN = 'nav.PrinterScreen'

export const ATTENDANCE_SCREEN = 'nav.AttendanceScreen'

export const FORGOT_PASSWORD_SCREEN = 'nav.ForgotPasswordScreen'
export const CHANGE_PASSWORD_SCREEN = 'nav.ChangePasswordScreen'
export const SETTINGS_SCREEN = 'nav.SettingsScreen'
export const LAUNCH_SCREEN = 'nav.LaunchScreen'
export const DRAWER_CONTENT = 'nav.DrawerContent'
export const ENTITIES_SCREEN = 'nav.EntitiesScreen'
export const STORYBOOK_SCREEN = 'nav.StorybookScreen'
export const CATEGORY_ENTITY_SCREEN = 'nav.CategoryEntityScreen'
export const CATEGORY_ENTITY_DETAIL_SCREEN = 'nav.CategoryEntityDetailScreen'
export const CATEGORY_ENTITY_EDIT_SCREEN = 'nav.CategoryEntityEditScreen'
export const PRODUCT_ENTITY_SCREEN = 'nav.ProductEntityScreen'
export const PRODUCT_ENTITY_DETAIL_SCREEN = 'nav.ProductEntityDetailScreen'
export const PRODUCT_ENTITY_EDIT_SCREEN = 'nav.ProductEntityEditScreen'
export const CUSTOMER_ENTITY_SCREEN = 'nav.CustomerEntityScreen'
export const CUSTOMER_ENTITY_DETAIL_SCREEN = 'nav.CustomerEntityDetailScreen'
export const CUSTOMER_ENTITY_EDIT_SCREEN = 'nav.CustomerEntityEditScreen'
// ignite-jhipster-navigation-declaration-needle

const store = createStore()

export const AuthLoad = {
  root: {
    stack: {
      id: 'center',
      children: [
        {
          component: {
            name: LOGIN_SCREEN,
            options: {
              topBar: {
                visible: false,
                drawBehind: true,
              },
            },
          },
        },
      ],
    },
  },
}

export const appStack = () =>
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            name: DRAWER_CONTENT,
          },
        },
        options: {
          sideMenu: {
            left: {
              width: Metrics.screenWidth / 2.2,
            },
          },
        },
        center: {
          stack: {
            id: 'center',
            children: [
              {
                component: {
                  name: LAUNCH_SCREEN,
                  options: {
                    topBar: {
                      drawBehind: true,
                      visible: false,
                      // background: {
                      //   color: Colors.white,
                      // },
                      // title: {
                      //   text: 'Dashboard',
                      //   color: Colors.primary,
                      // },
                      // elevation: 0,
                      // leftButtons: [
                      //   {
                      //     id: 'menuButton',
                      //     icon: Images.menuIcon,
                      //     testID: 'menuButton',
                      //     color: Colors.primary,
                      //   },
                      // ],
                      // rightButtons: [
                      // {
                      //   id: 'attendenceButton',
                      //   icon: Images.clock,
                      //   testID: 'attendenceButton',
                      //   color: Colors.secondary,
                      //  },
                      // ],
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  })

// export const appStack = () =>
// Navigation.setRoot({
//   root: {
//     sideMenu: {
//       left: {
//         component: {
//           name: DRAWER_CONTENT,
//         },

//       },
//       options: {
//         sideMenu: {
//           left: {
//           }
//         }
//       },
//       center: {
//     splitView: {
//       id: 'dashboard',
//       master: {
//         stack: {
//           id: 'order',
//           children: [
//             {
//               component: {
//                 name: ORDER_SCREEN,
//                 options: {
//                   topBar: {
//                     drawBehind: true,
//                     visible: true,
//                     title: {
//                       text: 'Order',
//                       color: Colors.white,
//                     },

//                     background: {
//                       color: Colors.secondary,
//                       translucent: true,
//                     },
//                     // buttonColor: colours.topBarText,
//                     backButton: {
//                       color: Colors.primary,
//                       showTitle: false,
//                     },
//                     rightButtons: [
//                       {
//                         id: 'clearButton',
//                         icon: Images.clear,
//                         testID: 'clearButton',
//                         color: Colors.white,
//                       },
//                     ],
//                   },
//                 },
//               },
//             },
//           ],
//         },
//       },
//       detail: {
//         stack: {
//           id: 'product',
//           children: [
//             {
//               component: {
//                 name:  LAUNCH_SCREEN,
//                 options: {
//                   topBar: {
//                     drawBehind: true,
//                     visible: true,
//                     background: {
//                       color: Colors.secondary,
//                       translucent: true,
//                     },
//                     rightButtons: [
//                       {
//                         id: 'attendenceButton',
//                         icon: Images.clock,
//                         testID: 'attendenceButton',
//                         color: Colors.white,
//                       },
//                     ],
//                     leftButtons: [
//                       {
//                         id: 'menuButton',
//                         icon: Images.menuIcon,
//                         testID: 'menuButton',
//                         color: Colors.white,
//                       },
//                     ],
//                     // buttonColor: colours.topBarText,
//                     backButton: {
//                       color: Colors.primary,
//                       showTitle: false,
//                     },
//                     title: {
//                       text:'Product',
//                       color: Colors.white,
//                     },
//                   },
//                 },
//               },
//             },
//           ],
//         },
//       },
//       options: {
//         topBar: {
//           drawBehind: true,
//           visible: true,
//           background: {
//             color: Colors.secondary,
//             translucent: true,
//           },
//           // buttonColor: colours.topBarText,
//           backButton: {
//             color: Colors.white,
//             showTitle: false,
//           },
//           title: {
//             color:Colors.primary,
//           },
//         },
//         splitView: {
//           displayMode: 'visible',
//           primaryEdge: 'leading', // Master view side: `leading` or `trailing`
//           minWidth: Metrics.screenWidth/1.8, // Minimum width of master view
//           maxWidth: Metrics.screenWidth/1.8, // Maximum width of master view
//         },
//       },
//     },
//   },
// },
// },
// })

let lastAppState = 'active'
function handleAppStateChange(nextAppState) {
  if (lastAppState.match(/inactive|background/) && nextAppState === 'active') {
    refreshAccount(store)
  }
  lastAppState = nextAppState
}

function refreshAccount() {
  // store.dispatch(AccountActions.accountRequest(null))
}
// for deep linking
function handleOpenURL(event) {
  console.tron.log(event.url)
  let splitUrl = event.url.split('/') // ['https:', '', 'domain', 'route', 'params']
  let importantParameters = splitUrl.splice(3) // ['route', 'params']
  if (importantParameters.length === 0) {
    console.tron.log('Sending to home page')
    return null
  }
  if (importantParameters.length === 1) {
    switch (importantParameters[0]) {
      case 'register':
        console.tron.log('Sending to Register Page')
        registerScreen()
        break
      default:
        console.tron.warn(`Unhandled deep link: ${event.url}`)
      // default code block
    }
  }
}

export function registerScreensAndStartApp() {
  Navigation.registerComponentWithRedux(LOGIN_SCREEN, () => LoginScreen, Provider, store)
  Navigation.registerComponentWithRedux(LOCK_SCREEN, () => LockScreen, Provider, store)
  Navigation.registerComponentWithRedux(SET_LOCK_SCREEN, () => SetlockScreen, Provider, store)
  Navigation.registerComponentWithRedux(SWITCH_ACCOUNT_SCREEN, () => SwitchAccountScreen, Provider, store)

  Navigation.registerComponentWithRedux(REGISTER_SCREEN, () => RegisterScreen, Provider, store)
  Navigation.registerComponentWithRedux(PAYMENT_SCREEN, () => PaymentScreen, Provider, store)
  Navigation.registerComponentWithRedux(ORDER_SCREEN, () => OrderScreen, Provider, store)
  Navigation.registerComponentWithRedux(ORDER_LIST_SCREEN, () => OrderListScreen, Provider, store)
  Navigation.registerComponentWithRedux(CASH_PAYMENT_SCREEN, () => CashPaymentScreen, Provider, store)
  Navigation.registerComponentWithRedux(PRINTER_SCREEN, () => PrinterScreen, Provider, store)

  Navigation.registerComponentWithRedux(ATTENDANCE_SCREEN, () => AttendanceScreen, Provider, store)

  Navigation.registerComponentWithRedux(FORGOT_PASSWORD_SCREEN, () => ForgotPasswordScreen, Provider, store)
  Navigation.registerComponentWithRedux(CHANGE_PASSWORD_SCREEN, () => ChangePasswordScreen, Provider, store)
  Navigation.registerComponentWithRedux(SETTINGS_SCREEN, () => SettingsScreen, Provider, store)
  Navigation.registerComponentWithRedux(DRAWER_CONTENT, () => DrawerContent, Provider, store)
  Navigation.registerComponentWithRedux(LAUNCH_SCREEN, () => LaunchScreen, Provider, store)
  Navigation.registerComponentWithRedux(ENTITIES_SCREEN, () => EntitiesScreen, Provider, store)
  Navigation.registerComponent(STORYBOOK_SCREEN, () => StorybookScreen)
  Navigation.registerComponentWithRedux(CATEGORY_ENTITY_SCREEN, () => CategoryEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(CATEGORY_ENTITY_DETAIL_SCREEN, () => CategoryEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(CATEGORY_ENTITY_EDIT_SCREEN, () => CategoryEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(PRODUCT_ENTITY_SCREEN, () => ProductEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(PRODUCT_ENTITY_DETAIL_SCREEN, () => ProductEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(PRODUCT_ENTITY_EDIT_SCREEN, () => ProductEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(CUSTOMER_ENTITY_SCREEN, () => CustomerEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(CUSTOMER_ENTITY_DETAIL_SCREEN, () => CustomerEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(CUSTOMER_ENTITY_EDIT_SCREEN, () => CustomerEntityEditScreen, Provider, store)
  // ignite-jhipster-navigation-registration-needle

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      topBar: {
        topBar: {
          title: {
            color: Colors.snow,
          },
        },
        backButton: {
          showTitle: false,
          testID: 'backButton',
          icon: Images.chevronLeftIcon,
          color: Colors.white,
          iconColor: Colors.white,
        },
        background: {
          color: Colors.secondary,
        },
      },
      sideMenu: {
        left: {
          enabled: false,
        },
      },
    })

    Navigation.setRoot(AuthLoad)

    // handle app state and deep links
    AppState.addEventListener('change', handleAppStateChange)
    Linking.addEventListener('url', handleOpenURL)
  })
}

export const lockScreen = (account) =>
  Navigation.push('center', {
    component: {
      name: LOCK_SCREEN,
      passProps: {
        account,
      },
      options: {
        topBar: {
          visible: false,
          drawBehind: true,
        },
      },
    },
  })

export const switchAccountScreen = () =>
  Navigation.push('center', {
    component: {
      name: SWITCH_ACCOUNT_SCREEN,
      options: {
        topBar: {
          visible: false,
          drawBehind: true,
        },
      },
    },
  })
export const setlockScreen = () =>
  Navigation.push('center', {
    component: {
      name: SET_LOCK_SCREEN,
      options: {
        topBar: {
          visible: false,
          drawBehind: true,
        },
      },
    },
  })

export const registerScreen = () =>
  Navigation.push('center', {
    component: {
      name: REGISTER_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Sign Up',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const forgotPasswordScreen = () =>
  Navigation.push('center', {
    component: {
      name: FORGOT_PASSWORD_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Forgot Password',
            color: Colors.snow,
          },
        },
      },
    },
  })
export const changePasswordScreen = () =>
  Navigation.push('center', {
    component: {
      name: CHANGE_PASSWORD_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Change Password',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const customerScreen = () =>
  Navigation.push('center', {
    component: {
      name: CUSTOMER_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Customer',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const customerEditScreen = () =>
  Navigation.push('center', {
    component: {
      name: CUSTOMER_ENTITY_EDIT_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Customer Form',
            color: Colors.snow,
          },
        },
      },
    },
  })

  export const customerDetailScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: CUSTOMER_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Customer Profile',
            color: Colors.snow,
          },
        },
      },
    },
  })
export const printerScreen = () =>
  Navigation.push('center', {
    component: {
      name: PRINTER_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Printers',
            color: Colors.snow,
          },
        },
      },
    },
  })
export const settingsScreen = () =>
  Navigation.push('center', {
    component: {
      name: SETTINGS_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Settings',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const entitiesScreen = () =>
  Navigation.push('center', {
    component: {
      name: ENTITIES_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Entities',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const paymentScreen = (order,customer) =>
  Navigation.push('center', {
    component: {
      name: PAYMENT_SCREEN,
      passProps: {
        order,
        customer
      },
      options: {
        topBar: {
          title: {
            text: 'Payment',
            color: Colors.white,
          },
          background: {
            color: Colors.secondary,
            translucent: true,
          },
          backButton: {
            color: Colors.white,
            showTitle: false,
          },
        },
      },
    },
  })

export const attendanceScreen = (order) =>
  Navigation.push('center', {
    component: {
      name: ATTENDANCE_SCREEN,
      passProps: {
        order,
      },
      options: {
        topBar: {
          title: {
            text: 'Attendance',
            color: Colors.white,
          },
          background: {
            color: Colors.secondary,
            translucent: true,
          },
          backButton: {
            color: Colors.white,
            showTitle: false,
          },
        },
      },
    },
  })

export const cashPaymentScreen = (order, screenId) =>
  Navigation.push('center', {
    component: {
      name: CASH_PAYMENT_SCREEN,
      passProps: {
        order,
        screenId,
      },
      options: {
        topBar: {
          title: {
            text: '',
            color: Colors.white,
          },
          background: {
            color: Colors.secondary,
            translucent: true,
          },
          backButton: {
            color: Colors.white,
            showTitle: false,
          },
        },
      },
    },
  })

export const orderListScreen = (order) =>
  Navigation.push('center', {
    component: {
      name: ORDER_LIST_SCREEN,
      passProps: {
        order,
      },
      options: {
        topBar: {
          title: {
            text: 'Order List',
            color: Colors.white,
          },
          background: {
            color: Colors.secondary,
            translucent: true,
          },
          backButton: {
            color: Colors.white,
            showTitle: false,
          },
        },
      },
    },
  })
export const storybookScreen = () => {
  Navigation.push('center', {
    component: {
      name: STORYBOOK_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Storybook',
            color: Colors.snow,
          },
        },
      },
    },
  })
}
