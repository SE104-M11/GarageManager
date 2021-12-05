import { combineReducers } from 'redux';
import user from '../Containers/LogIn/reducers/user';

const AppReducer = combineReducers({
  user,
});

export default AppReducer;
