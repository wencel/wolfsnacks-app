import { createSelector } from 'reselect';

const saleSelectorState = state => state.sale;

export const presentationsSelector = createSelector(
  saleSelectorState,
  state => {
    return state.presentations;
  }
);

export const saleTypesSelector = createSelector(saleSelectorState, state => {
  return state.saleTypes;
});

export const saleSelector = createSelector(saleSelectorState, state => {
  return state.sale;
});

export const salesSelector = createSelector(saleSelectorState, state => {
  return state.sales;
});

export const salesListSelector = createSelector(saleSelectorState, state => {
  return state.sales.data.data;
});
