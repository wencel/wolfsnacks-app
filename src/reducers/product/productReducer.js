import productConstants from './productConstants';

const initListData = {
  data: [],
  limit: 10,
  skip: 0,
};
const initState = {
  presentations: [],
  productTypes: [],
  product: {
    data: null,
    loading: false,
  },
  products: {
    data: initListData,
    loading: false,
  },
};

export const productReducer = function (state = initState, action) {
  switch (action.type) {
    case productConstants.SET_PRESENTATIONS:
      return {
        ...state,
        presentations: action.payload,
      };
    case productConstants.SET_PRODUCT_TYPES:
      return {
        ...state,
        productTypes: action.payload,
      };
    case productConstants.SUCCESS_CREATE_EDIT_PRODUCT:
      return {
        ...state,
        product: {
          data: action.payload,
          loading: false,
        },
      };
    case productConstants.FAILURE_CREATE_EDIT_PRODUCT:
      return {
        ...state,
        product: {
          data: null,
          loading: false,
        },
      };
    case productConstants.RESET_PRODUCT:
      return {
        ...state,
        product: {
          data: null,
          loading: false,
        },
      };
    case productConstants.SUCCESS_FETCH_PRODUCT:
      return {
        ...state,
        product: {
          data: action.payload,
          loading: false,
        },
      };
    case productConstants.FAILURE_FETCH_PRODUCT:
      return {
        ...state,
        product: {
          data: null,
          loading: false,
        },
      };
    case productConstants.SUCCESS_DELETE_PRODUCT:
      return {
        ...state,
        product: {
          data: null,
          loading: false,
        },
      };
    case productConstants.FAILURE_DELETE_PRODUCT:
      return {
        ...state,
        product: {
          ...state.product,
          loading: false,
        },
      };
    case productConstants.RESET_PRODUCTS_LIST:
      return {
        ...state,
        products: {
          ...state.products,
          data: initListData,
        },
      };
    case productConstants.SET_PRODUCTS_LIST:
      return {
        ...state,
        products: {
          ...state.products,
          data: {
            ...state.products.data,
            data: action.payload,
          },
        },
      };
    case productConstants.SUCCESS_PRODUCTS_LIST:
      return {
        ...state,
        products: {
          loading: false,
          data: {
            ...action.payload,
            data: [...state.products.data.data, ...action.payload.data],
          },
        },
      };
    case productConstants.FAILURE_PRODUCTS_LIST:
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
        },
      };
    case productConstants.SET_PRODUCT_LOADING:
      return {
        ...state,
        product: {
          loading: true,
          data: null,
        },
      };
    case productConstants.SET_PRODUCTS_LOADING:
      return {
        ...state,
        products: {
          ...state.products,
          loading: true,
        },
      };
    default:
      return state;
  }
};

export default productReducer;
