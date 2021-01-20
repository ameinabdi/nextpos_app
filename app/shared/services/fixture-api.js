export default {
  // Functions return fixtures

  // entity fixtures
  updateCategory: (category) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-category.json'),
    }
  },
  getCategories: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-categories.json'),
    }
  },
  getCategory: (categoryId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-category.json'),
    }
  },
  deleteCategory: (categoryId) => {
    return {
      ok: true,
    }
  },
  searchCategories: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-categories.json'),
    }
  },
  updateProduct: (product) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-product.json'),
    }
  },
  getProducts: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-products.json'),
    }
  },
  getProduct: (productId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-product.json'),
    }
  },
  deleteProduct: (productId) => {
    return {
      ok: true,
    }
  },
  searchProducts: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-products.json'),
    }
  },
  updateCustomer: (customer) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-customer.json'),
    }
  },
  getCustomers: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-customers.json'),
    }
  },
  getCustomer: (customerId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-customer.json'),
    }
  },
  deleteCustomer: (customerId) => {
    return {
      ok: true,
    }
  },
  searchCustomers: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-customers.json'),
    }
  },
  // ignite-jhipster-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../fixtures/update-user.json'),
    }
  },
  getUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/get-users.json'),
    }
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../fixtures/get-user.json'),
    }
  },
  deleteUser: (userId) => {
    return {
      ok: true,
    }
  },
  // auth fixtures
  setAuthToken: () => {},
  removeAuthToken: () => {},
  login: (authObj) => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../fixtures/login.json'),
      }
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials',
      }
    }
  },
  register: ({ user }) => {
    if (user === 'user') {
      return {
        ok: true,
      }
    } else {
      return {
        ok: false,
        data: {
          title: 'Invalid email',
        },
      }
    }
  },
  forgotPassword: ({ email }) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true,
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email',
      }
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      data: require('../fixtures/get-account.json'),
    }
  },
  updateAccount: () => {
    return {
      ok: true,
    }
  },
  changePassword: ({ currentPassword }) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true,
      }
    } else {
      return {
        ok: false,
        data: 'Password error',
      }
    }
  },
}
