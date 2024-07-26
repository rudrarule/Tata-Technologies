import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import login from './auth/login.reducer';
import setting from './settings/setting.reducer';
import user from './user/user.reducer';
import report from './reports/reports.reducer';
import { DISPATCH_TYPES } from './constant';

// ==============================|| COMBINE REDUCER ||============================== //

const RootReducer = combineReducers({
    customization: customizationReducer,
    login,
    setting,
    user,
    report
});

const appReducer = (state, action = { type: {}, payload: {} }) => {
    if (action.type === DISPATCH_TYPES.LOGOUT) {
        /**Only keep the below destructured objects */
        const { usr } = state;
        usr.token = '';
        state = { usr };
        return RootReducer(state, action);
    } else {
        return RootReducer(state, action);
    }
};

export default appReducer;
