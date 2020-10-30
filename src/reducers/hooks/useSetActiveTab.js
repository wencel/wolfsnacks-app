const { useDispatch } = require('react-redux');
const { setActiveTabAction } = require('reducers/misc/miscActions');

const useSetActiveTab = activeTab => {
  const dispatch = useDispatch();
  dispatch(setActiveTabAction(activeTab));
};

export default useSetActiveTab;
