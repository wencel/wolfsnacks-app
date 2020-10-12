import userBaseReducer from './userBaseReducer';

export const persistedUserReducer = userBaseReducer(true);

export default persistedUserReducer;
