import { combineReducers } from "redux";
import status from '../Containers/TestPage/reducers/status'
import lstProduct from '../Containers/TestPage/reducers/lstProduct'

const AppReducer=combineReducers({
    status,
    lstProduct
})

export default AppReducer;
