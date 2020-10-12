import { createSelector } from 'reselect';

const orderSelectorState = state => state.order;

export const presentationsSelector = createSelector(
  orderSelectorState,
  state => {
    return state.presentations;
  }
);

export const orderTypesSelector = createSelector(orderSelectorState, state => {
  return state.orderTypes;
});

export const orderSelector = createSelector(orderSelectorState, state => {
  return state.order;
});

export const ordersSelector = createSelector(orderSelectorState, state => {
  return state.orders;
});

export const ordersListSelector = createSelector(orderSelectorState, state => {
  return state.orders.data.data;
});
