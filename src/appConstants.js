const lighterWolfGreen = '#007f99';
const brightGreen = '#05e8b8';

export const textConstants = {
  login: {
    EMAIL_LABEL: 'Correo Electrónico',
    PASSWORD_LABEL: 'Contraseña',
    MISSING_FIELDS: 'Por favor ingrese correo electrónico y contraseña',
    TITLE: 'Inicia sesión',
    DESCRIPTION: 'Inicia sesión con tu cuenta de inventario de Wolf Snacks',
    LOGIN_ERROR:
      'Hubo un error en el ingreso, por favor revise su conexion e intentelo de nuevo',
    BUTTON_TEXT: 'Ingresar',
    REMEMBER_ME: 'Recordarme en este dispositivo',
  },
  user: {
    IS_PERSISTED: 'persisted',
    IS_TEMPORAL: 'temporal',
  },
  addCustomer: {
    TITLE: 'Agregar nuevo cliente',
    ADD_CUSTOMER: 'Agregar cliente',
  },
  addProduct: {
    TITLE: 'Agregar nuevo producto',
    ADD_PRODUCT: 'Agregar producto',
    WARNING_EDIT:
      'Los campos Nombre, Presentacion y Peso no pueden ser editados',
  },
  addOrder: {
    TITLE: 'Agregar pedido',
    ADD_ORDER: 'Agregar pedido',
    ADD_PRODUCT: 'Agregar producto',
  },
  addSale: {
    TITLE: 'Agregar venta',
    ADD_SALE: 'Agregar venta',
    ADD_PRODUCT: 'Agregar producto',
    SEARCH_CUSTOMER: 'Buscar cliente',
  },
  editCustomer: {
    TITLE: 'Editar cliente',
  },
  editProduct: {
    TITLE: 'Editar producto',
  },
  editOrder: {
    TITLE: 'Editar pedido',
  },
  editSale: {
    TITLE: 'Editar venta',
  },
  customer: {
    STORE_NAME: 'Nombre de la tienda',
    NAME: 'Nombre del contacto',
    ADDRESS: 'Dirección',
    EMAIL: 'Correo electrónico',
    PHONE_NUMBER: 'Numero telefónico',
    LOCALITY: 'Localidad',
    TOWN: 'Barrio',
    ID_NUMBER: 'Cedula o NIT',
  },
  product: {
    NAME: 'Nombre',
    PRESENTATION: 'Presentación',
    WEIGHT: 'Peso (g)',
    BASE_PRICE: 'Precio base',
    SELLING_PRICE: 'Precio de venta',
    STOCK: 'Cantidad en inventario',
  },
  order: {
    TOTAL_PRICE: 'Total',
    ORDER_TOTAL_PRICE: 'Total de la pedido',
    PRODUCT_TOTAL_PRICE: 'Total por producto',
    PRICE: 'Precio individual del producto',
    QUANTITY: 'Cantidad',
    PRODUCT: 'Producto',
    PRODUCTS: 'Productos',
  },
  sale: {
    TOTAL_PRICE: 'Total',
    SALE_TOTAL_PRICE: 'Total de la venta',
    PRODUCT_TOTAL_PRICE: 'Total por producto',
    PRICE: 'Precio individual del producto',
    OWES: 'Debe',
    IS_THIRTEEN_DOZEN: 'Docena de 13',
    PARTIAL_PAYMENT: 'Abono',
    REMAINING_PAYMENT: 'Saldo',
    QUANTITY: 'Cantidad',
    PRODUCT: 'Producto',
    PRODUCTS: 'Productos',
    CUSTOMER: 'Cliente',
  },
  customerPage: {
    TITLE: 'Clientes',
    CUSTOMER: 'Cliente',
    DESCRIPTION:
      'Esta es la lista de tus clientes, utiliza los filtros para ayudarte en su busqueda',
    EMPTY_TITLE: 'No se encontraron clientes',
    EMPTY_DESCRIPTION:
      'No existen clientes con los párametros que pusiste en los filtros, si no existe el cliente que buscas puedes agregar uno nuevo con el botón en la parte de abajo',
    DELETE_SUCCESS: 'El cliente ha sido eliminado con exito',
    DELETE_CONFIRMATION_TITLE: 'Eliminar cliente',
    DELETE_CONFIRMATION: 'Confirmas que deseas eliminar el cliente',
  },
  productPage: {
    TITLE: 'Productos',
    PRODUCT: 'Producto',
    DESCRIPTION:
      'Esta es la lista de productos, utiliza los filtros para ayudarte en su busqueda',
    EMPTY_TITLE: 'No se encontraron productos',
    EMPTY_DESCRIPTION:
      'No existen productos con los parámetros que pusiste en los filtros, si no existe el producto que buscas puedes agregar uno nuevo con el botón en la parte de abajo',
    DELETE_SUCCESS: 'El producto ha sido eliminado con exito',
    DELETE_CONFIRMATION_TITLE: 'Eliminar producto',
    DELETE_CONFIRMATION: 'Confirmas que deseas eliminar el producto',
  },
  orderPage: {
    TITLE: 'Pedidos',
    ORDER: 'Pedido',
    DESCRIPTION:
      'Esta es la lista de pedidos, utiliza los filtros para ayudarte en su busqueda',
    EMPTY_TITLE: 'No se encontraron pedidos',
    EMPTY_DESCRIPTION:
      'No existen pedidos con los parámetros que pusiste en los filtros, si no existe la pedido que buscas puedes agregar una nueva con el botón en la parte de abajo',
    DELETE_SUCCESS: 'La pedido ha sido eliminada con exito',
    DELETE_CONFIRMATION_TITLE: 'Eliminar pedido',
    DELETE_CONFIRMATION: 'Confirmas que deseas eliminar el pedido',
  },
  salePage: {
    TITLE: 'Ventas',
    SALE: 'Venta',
    DESCRIPTION:
      'Esta es la lista de ventas, utiliza los filtros para ayudarte en su busqueda',
    EMPTY_TITLE: 'No se encontraron ventas',
    EMPTY_DESCRIPTION:
      'No existen ventas con los parámetros que pusiste en los filtros, si no existe la venta que buscas puedes agregar una nueva con el botón en la parte de abajo',
    DELETE_SUCCESS: 'La venta ha sido eliminada con exito',
    DELETE_CONFIRMATION_TITLE: 'Eliminar venta',
    DELETE_CONFIRMATION: 'Confirmas que deseas eliminar la venta',
    OWES: 'Debe?',
    IS_THIRTEEN_DOZEN: 'Es docena de 13?',
  },
  misc: {
    SAVE: 'Guardar',
    EDIT: 'Editar',
    DELETE: 'Eliminar',
    YES: 'Sí',
    NO: 'No',
    ALL: 'Todos',
    DATES: 'Fechas',
    WARNING: 'Advertencia',
    UNITS: 'Unidades',
    DIRECTION: 'Dirección',
    REMEMBER_ME: 'Recordarme',
    FILTERS: 'Filtros',
    FILTERS_TEXT: 'Ingresa los filtros que deseas aplicar',
    RESET_FILTERS: 'Limpiar filtros',
    CANCEL: 'Cancelar',
    APPLY: 'Aplicar',
    SEARCH_TERM: 'Término de busqueda',
    ORDER_BY: 'Ordernar por',
    ASCENDING: 'Ascendente',
    DESCENDING: 'Descendente',
  },
  navbar: {
    SALES: 'Ventas',
    ORDERS: 'Pedidos',
    CUSTOMERS: 'Clientes',
    PRODUCTS: 'Productos',
    LOGOUT: 'Cerrar sesión',
  },
};

export const errorSuccessConstants = {
  MANDATORY_FIELDS: 'Los siguientes campos son obligatorios:',
  SAVED_CUSTOMER: 'El cliente ha sido guardado exitosamente',
  SAVED_PRODUCT: 'El producto ha sido guardado exitosamente',
  SAVED_ORDER: 'La pedido ha sido guardada exitosamente',
  NO_PRODUCT: 'Todos los productos deben tener los campos diligenciados',
  NO_QUANTITY: 'La cantidad de los productos debe ser mayor a cero',
  NO_EMPTY_PRODUCTS: 'Debe agregar al menos un producto',
};

export const appConstants = {
  snackbarOptions: {
    position: 'bottom-center',
    style: {
      backgroundColor: brightGreen,
      border: `2px solid ${lighterWolfGreen}`,
      color: lighterWolfGreen,
      fontFamily: 'Roboto, sans-serif',
      fontSize: '1em',
      textAlign: 'center',
      'font-weight': '500',
    },
    closeStyle: {
      color: lighterWolfGreen,
      fontSize: '1em',
    },
  },
};

export const urlConstants = {
  user: {
    LOGIN: `${process.env.REACT_APP_API_URL}/users/login`,
    LOGOUT: `${process.env.REACT_APP_API_URL}/users/logout`,
  },
  customer: {
    GET_LOCALITIES: `${process.env.REACT_APP_API_URL}/utils/localities`,
    CUSTOMER_URL: `${process.env.REACT_APP_API_URL}/customers`,
  },
  product: {
    GET_PRESENTATIONS: `${process.env.REACT_APP_API_URL}/utils/presentations`,
    GET_PRODUCT_TYPES: `${process.env.REACT_APP_API_URL}/utils/productTypes`,
    PRODUCT_URL: `${process.env.REACT_APP_API_URL}/products`,
  },
  order: {
    ORDER_URL: `${process.env.REACT_APP_API_URL}/orders`,
  },
  sale: {
    SALE_URL: `${process.env.REACT_APP_API_URL}/sales`,
  },
};
