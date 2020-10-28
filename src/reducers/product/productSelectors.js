import { createSelector } from 'reselect';

const productSelectorState = state => state.product;

export const presentationsSelector = createSelector(
  productSelectorState,
  state => {
    return state.presentations;
  }
);

export const productTypesSelector = createSelector(
  productSelectorState,
  state => {
    return state.productTypes;
  }
);

export const productSelector = createSelector(productSelectorState, state => {
  return state.product;
});

export const productsSelector = createSelector(productSelectorState, state => {
  return state.products;
});

export const productsListSelector = createSelector(
  productSelectorState,
  state => {
    return state.products.data.data;
  }
);

export const productsListDropdownSelector = createSelector(
  productSelectorState,
  state => {
    return [
      { value: '' },
      ...state.products.data.data.map(p => ({
        ...p,
        value: p._id,
        label: `${p.name} ${p.presentation} ${p.weight} g`,
      })),
    ];
  }
);
