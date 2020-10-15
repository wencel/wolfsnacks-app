import saleConstants from './saleConstants';

const initListData = {
  data: [],
  limit: 10,
  skip: 0,
};
const initState = {
  presentations: [],
  saleTypes: [],
  sale: {
    data: null,
    loading: false,
  },
  sales: {
    data: initListData,
    loading: false,
  },
};

export const saleReducer = function (state = initState, action) {
  switch (action.type) {
    case saleConstants.SET_PRESENTATIONS:
      return {
        ...state,
        presentations: action.payload,
      };
    case saleConstants.SET_SALE_TYPES:
      return {
        ...state,
        saleTypes: action.payload,
      };
    case saleConstants.SUCCESS_CREATE_EDIT_SALE:
      return {
        ...state,
        sale: {
          data: action.payload,
          loading: false,
        },
      };
    case saleConstants.FAILURE_CREATE_EDIT_SALE:
      return {
        ...state,
        sale: {
          data: null,
          loading: false,
        },
      };
    case saleConstants.RESET_SALE:
      return {
        ...state,
        sale: {
          data: null,
          loading: false,
        },
      };
    case saleConstants.SUCCESS_FETCH_SALE:
      return {
        ...state,
        sale: {
          data: action.payload,
          loading: false,
        },
      };
    case saleConstants.FAILURE_FETCH_SALE:
      return {
        ...state,
        sale: {
          data: null,
          loading: false,
        },
      };
    case saleConstants.SUCCESS_DELETE_SALE:
      return {
        ...state,
        sale: {
          data: null,
          loading: false,
        },
      };
    case saleConstants.FAILURE_DELETE_SALE:
      return {
        ...state,
        sale: {
          ...state.sale,
          loading: false,
        },
      };
    case saleConstants.RESET_SALES_LIST:
      return {
        ...state,
        sales: {
          ...state.sales,
          data: initListData,
        },
      };
    case saleConstants.SET_SALES_LIST:
      return {
        ...state,
        sales: {
          ...state.sales,
          data: {
            ...state.sales.data,
            data: action.payload,
          },
        },
      };
    case saleConstants.SUCCESS_SALES_LIST:
      return {
        ...state,
        sales: {
          loading: false,
          data: {
            ...action.payload,
            data: [...state.sales.data.data, ...action.payload.data],
          },
        },
      };
    case saleConstants.FAILURE_SALES_LIST:
      return {
        ...state,
        sales: {
          ...state.sales,
          loading: false,
        },
      };
    case saleConstants.SET_SALE_LOADING:
      return {
        ...state,
        sale: {
          loading: true,
          data: null,
        },
      };
    case saleConstants.SET_SALES_LOADING:
      return {
        ...state,
        sales: {
          ...state.sales,
          loading: true,
        },
      };
    default:
      return state;
  }
};

export default saleReducer;
