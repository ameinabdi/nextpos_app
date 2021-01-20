

export const Account = {
    name: 'Account',
    primaryKey: 'id',
    properties: {
    id: {type:'string'},
    fullName:{ type: 'string', optional: true},
    firstName:{ type: 'string', optional: true},
    pin:{ type: 'int', optional: true},
    password:{ type: 'string', optional: true},
    lastName:{ type: 'string', optional: true},
    phoneNumber:{ type: 'string', optional: true},
    email:{ type: 'string', optional: true},
    createdAt:{ type: 'string', optional: true},
    updatedAt:{ type: 'string', optional: true},
    deletedAt:{ type: 'string', optional: true},
    shopId:{ type: 'string', optional: true},
    paymentMethodId:{ type: 'string', optional: true},
    createdById:{ type: 'string', optional: true},
    updatedById:{ type: 'string', optional: true},
    paymentMethod:{ type: 'PaymentMethod'},
    shop:{type:'Shop'},
    token:{ type: 'string', optional: true},
    tenantId:{ type: 'string', optional: true},
    }
  }

  export const Shop = {
    name: 'Shop',
    primaryKey: 'id',
    properties: {
    id: {type:'string'},
    shopName:{ type: 'string', optional: true},
    phone:{ type: 'int', optional: true},
    description:{ type: 'string', optional: true},
    isHeadOffice:{ type: 'bool', optional: true},
    city:{ type: 'string', optional: true},
    address:{ type: 'string', optional: true},
    street:{ type: 'string', optional: true},
    createdAt:{ type: 'string', optional: true},
    updatedAt:{ type: 'string', optional: true},
    currencyId:{ type: 'string', optional: true},
    tenantId:{ type: 'string', optional: true},
    createdById:{ type: 'string', optional: true},
    updatedById:{ type: 'string', optional: true},
    }
  }


  export const PaymentMethod = {
    name: 'PaymentMethod',
    primaryKey: 'id',
    properties: {
    id: {type:'string'},
    paymentMethod:{ type: 'string', optional: true},
    description:{ type: 'string', optional: true},
    account:{ type: 'int', optional: true},
    active:{ type: 'bool', optional: true},
    createdAt:{ type: 'string', optional: true},
    updatedAt:{ type: 'string', optional: true},
    paymentProviderId:{ type: 'string', optional: true},
    paymentMethodConfigId:{ type: 'string', optional: true},
    shopId:{ type: 'string', optional: true},
    tenantId:{ type: 'string', optional: true},
    createdById:{ type: 'string', optional: true},
    updatedById:{ type: 'string', optional: true},
    }
  }


  export const Category = {
    name: 'Category',
    primaryKey: 'id',
    properties: {
    id: { type: 'string' },
    categoryName: { type: 'string', optional: true},
    description: { type: 'string', optional: true},
    importHash: { type: 'string', optional: true},
    createdAt: { type: 'string', optional: true},
    updatedAt: { type: 'string', optional: true},
    shopId: { type: 'string', optional: true},
    tenantId: { type: 'string', optional: true},
    createdById: { type: 'string', optional: true},
    updatedById: { type: 'string', optional: true},
    product: { type: 'list', objectType: 'Product'},
    }
  }

  export const Product = {
    name: 'Product',
    primaryKey: 'id',
    properties: {
    id: {type:'string'},
    productStatus:{ type: 'string', optional: true},
    productName:{ type: 'string', optional: true},
    productDescription:{ type: 'string', optional: true},
    productQuantity:{ type: 'int', optional: true},
    productPrice:{ type: 'string', optional: true},
    categoryId:{ type: 'string', optional: true},
    productTaxId:{ type: 'string', optional: true},
    createdAt:{ type: 'string', optional: true},
    updatedAt:{ type: 'string', optional: true},
    shopId:{ type: 'string', optional: true},
    tenantId:{ type: 'string', optional: true},
    createdById:{ type: 'string', optional: true},
    updatedById:{ type: 'string', optional: true},
    productTax:{ type:'ProductTax' },
    variants:{ type: 'list', objectType: 'Variant'},
    productThumbnail:{ type: 'list', objectType: 'ProductThumbnail'},
    }
  }
  export const ProductTax = {
    name: 'ProductTax',
    primaryKey: 'id',
    properties: {
    id: {type:'string'},
    title:{ type: 'string', optional: true},
    description:{ type: 'string', optional: true},
    percentage:{ type: 'int', optional: true},
    amount:{ type: 'string', optional: true},
    active:{ type: 'bool', optional: true},
    createdAt:{ type: 'string', optional: true},
    updatedAt:{ type: 'string', optional: true},
    shopId:{ type: 'string', optional: true},
    tenantId:{ type: 'string', optional: true},
    createdById:{ type: 'string', optional: true},
    updatedById:{ type: 'string', optional: true},
    }
  }
  export const Variant = {
    name: 'Variant',
    primaryKey: 'id',
    properties: {
    id: {type:'string'},
    variantName:{ type: 'string', optional: true},
    description:{ type: 'string', optional: true},
    price:{ type: 'string', optional: true},
    percentage:{ type: 'string', optional: true},
    createdAt:{ type: 'string', optional: true},
    updatedAt:{ type: 'string', optional: true},
    shopId:{ type: 'string', optional: true},
    tenantId:{ type: 'string', optional: true},
    createdById:{ type: 'string', optional: true},
    updatedById:{ type: 'string', optional: true},
    downloadUrl:{ type: 'string', optional: true},
    shop:{type:'Shop'},
    }
  }
  export const ProductThumbnail = {
    name: 'ProductThumbnail',
    primaryKey: 'id',
    properties: {
    id: {type:'string'},
    name:{ type: 'string', optional: true},
    sizeInBytes:{ type: 'int', optional: true},
    downloadUrl: { type: 'string', optional: true},
    }
  }

  export const Order = {
    name: 'Order',
    primaryKey: 'id',
    properties: {
    id: {type:'int', indexed: true},
    title:{ type: 'string', optional: true},
    totalPrice:{ type: 'string', optional: true},
    quantity:{ type: 'int', optional: true},
    totalTax:{ type: 'string', optional: true},
    orderStatus:{ type: 'string', optional: true},
    note:{ type: 'string', optional: true},
    createdAt:{ type: 'string', optional: true},
    updatedAt:{ type: 'string', optional: true},
    customer:{ type: 'string', optional: true},
    shop:{ type: 'string', optional: true},
    table:{ type: 'string', optional: true},
    createdById:{ type: 'string', optional: true},
    updatedById:{ type: 'string', optional: true},
    orderItems:{ type: 'list', objectType: 'OrderItems'},
    }
  }

  export const OrderItems = {
    name: 'OrderItems',
    primaryKey: 'id',
    properties: {
    id: {type:'string'},
    orderItemName:{ type: 'string', optional: true},
    ordetItemQuantity:{ type: 'int', optional: true},
    ordetItemPrice: { type: 'string', optional: true},
    orderItemTax: { type: 'string', optional: true},
    product: { type: 'string', optional: true},
    orderItemPercentage:{ type: 'int', optional: true},
    orderItemTaxId: { type: 'string', optional: true},
    }
  }