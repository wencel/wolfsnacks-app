export const makeErrorMessage = error => {
  if (typeof error === 'string') {
    return error;
  }
  if (error?.error && typeof error.error === 'string') {
    return error.error;
  }
  if (error?.message && typeof error.message === 'string') {
    return error.message;
  }
  if (error?.error?.message && typeof error.error.message === 'string') {
    return error.error.message;
  }
  return 'Ocurrio un error, por favor intenta de nuevo';
};

export const idGenerator = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const checkObjectsDiff = (o1, o2) => {
  const diff = Object.keys(o2).reduce((diff, key) => {
    if (o1[key] === o2[key]) return diff;
    return {
      ...diff,
      [key]: o2[key],
    };
  }, {});
  return diff;
};
