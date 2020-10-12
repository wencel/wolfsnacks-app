import orderConstants from './orderConstants';

const initListData = {
  data: [],
  limit: 10,
  skip: 0,
};
const initState = {
  presentations: [],
  orderTypes: [],
  order: {
    data: null,
    loading: false,
  },
  orders: {
    data: initListData,
    loading: false,
  },
};

export const orderReducer = function (state = initState, action) {
  switch (action.type) {
    case orderConstants.SET_PRESENTATIONS:
      return {
        ...state,
        presentations: action.payload,
      };
    case orderConstants.SET_ORDER_TYPES:
      return {
        ...state,
        orderTypes: action.payload,
      };
    case orderConstants.SUCCESS_CREATE_EDIT_ORDER:
      return {
        ...state,
        order: {
          data: action.payload,
          loading: false,
        },
      };
    case orderConstants.FAILURE_CREATE_EDIT_ORDER:
      return {
        ...state,
        order: {
          data: null,
          loading: false,
        },
      };
    case orderConstants.RESET_ORDER:
      return {
        ...state,
        order: {
          data: null,
          loading: false,
        },
      };
    case orderConstants.SUCCESS_FETCH_ORDER:
      return {
        ...state,
        order: {
          data: action.payload,
          loading: false,
        },
      };
    case orderConstants.FAILURE_FETCH_ORDER:
      return {
        ...state,
        order: {
          data: null,
          loading: false,
        },
      };
    case orderConstants.SUCCESS_DELETE_ORDER:
      return {
        ...state,
        order: {
          data: null,
          loading: false,
        },
      };
    case orderConstants.FAILURE_DELETE_ORDER:
      return {
        ...state,
        order: {
          ...state.order,
          loading: false,
        },
      };
    case orderConstants.RESET_ORDERS_LIST:
      return {
        ...state,
        orders: {
          ...state.orders,
          data: initListData,
        },
      };
    case orderConstants.SET_ORDERS_LIST:
      return {
        ...state,
        orders: {
          ...state.orders,
          data: {
            ...state.orders.data,
            data: action.payload,
          },
        },
      };
    case orderConstants.SUCCESS_ORDERS_LIST:
      return {
        ...state,
        orders: {
          loading: false,
          data: {
            ...action.payload,
            data: [...state.orders.data.data, ...action.payload.data],
          },
        },
      };
    case orderConstants.FAILURE_ORDERS_LIST:
      return {
        ...state,
        orders: {
          ...state.orders,
          loading: false,
        },
      };
    case orderConstants.SET_ORDER_LOADING:
      return {
        ...state,
        order: {
          loading: true,
          data: null,
        },
      };
    case orderConstants.SET_ORDERS_LOADING:
      return {
        ...state,
        orders: {
          ...state.orders,
          loading: true,
        },
      };
    default:
      return state;
  }
};

export default orderReducer;
