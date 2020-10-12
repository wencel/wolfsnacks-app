import customerConstants from './customerConstants';

const initListData = {
  data: [],
  limit: 10,
  skip: 0,
};
const initState = {
  localities: [],
  customer: {
    data: null,
    loading: false,
  },
  customers: {
    data: initListData,
    loading: false,
  },
};

export const customerReducer = function (state = initState, action) {
  switch (action.type) {
    case customerConstants.SET_LOCALITIES:
      return {
        ...state,
        localities: action.payload,
      };
    case customerConstants.SUCCESS_CREATE_EDIT_CUSTOMER:
      return {
        ...state,
        customer: {
          data: action.payload,
          loading: false,
        },
      };
    case customerConstants.FAILURE_CREATE_EDIT_CUSTOMER:
      return {
        ...state,
        customer: {
          data: null,
          loading: false,
        },
      };
    case customerConstants.RESET_CUSTOMER:
      return {
        ...state,
        customer: {
          data: null,
          loading: false,
        },
      };
    case customerConstants.SUCCESS_FETCH_CUSTOMER:
      return {
        ...state,
        customer: {
          data: action.payload,
          loading: false,
        },
      };
    case customerConstants.FAILURE_FETCH_CUSTOMER:
      return {
        ...state,
        customer: {
          data: null,
          loading: false,
        },
      };
    case customerConstants.SUCCESS_DELETE_CUSTOMER:
      return {
        ...state,
        customer: {
          data: null,
          loading: false,
        },
      };
    case customerConstants.FAILURE_DELETE_CUSTOMER:
      return {
        ...state,
        customer: {
          ...state.customer,
          loading: false,
        },
      };
    case customerConstants.RESET_CUSTOMERS_LIST:
      return {
        ...state,
        customers: {
          ...state.customers,
          data: initListData,
        },
      };
    case customerConstants.SET_CUSTOMERS_LIST:
      return {
        ...state,
        customers: {
          ...state.customers,
          data: {
            ...state.customers.data,
            data: action.payload,
          },
        },
      };
    case customerConstants.SUCCESS_CUSTOMERS_LIST:
      return {
        ...state,
        customers: {
          loading: false,
          data: {
            ...action.payload,
            data: [...state.customers.data.data, ...action.payload.data],
          },
        },
      };
    case customerConstants.FAILURE_CUSTOMERS_LIST:
      return {
        ...state,
        customers: {
          ...state.customers,
          loading: false,
        },
      };
    case customerConstants.SET_CUSTOMER_LOADING:
      return {
        ...state,
        customer: {
          loading: true,
          data: null,
        },
      };
    case customerConstants.SET_CUSTOMERS_LOADING:
      return {
        ...state,
        customers: {
          ...state.customers,
          loading: true,
        },
      };
    default:
      return state;
  }
};

export default customerReducer;
