import { createSelector } from 'reselect';

const customerSelectorState = state => state.customer;

export const localitiesSelector = createSelector(
  customerSelectorState,
  state => {
    return state.localities;
  }
);

export const customerSelector = createSelector(customerSelectorState, state => {
  return state.customer;
});

export const customersSelector = createSelector(
  customerSelectorState,
  state => {
    return state.customers;
  }
);

export const customersListSelector = createSelector(
  customerSelectorState,
  state => {
    return state.customers.data.data;
  }
);
