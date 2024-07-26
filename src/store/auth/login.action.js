/* eslint-disable prettier/prettier */
import { USER_END_POINTS } from 'store/serviceEndPoint';
import { DISPATCH_TYPES } from '../constant';
import { request } from 'store/request';

const login = (formData, callback) => async (dispatch) => {
    try {
        dispatch({ type: DISPATCH_TYPES.LOGIN, payload: { loading: true, data: {} } });
        const { data = {}, success } = await request(
            USER_END_POINTS.LOGIN,
            { user_name: formData.user_name, password: formData.password },
            null,
            true,
            null,
            true
        );

        if (success) {
            console.log(data);
            dispatch({ type: DISPATCH_TYPES.LOGIN, payload: data });
            sessionStorage.setItem('token', data?.data?.token);
            if (callback) callback(success, data?.data);
        }
    } catch (error) {
        console.log(error.message);
    }
};

const logout = () => {
    sessionStorage.removeItem('token');
    return {
        type: DISPATCH_TYPES.LOGOUT,
        payload: { isAuthenticated: false, from: window.location.pathname }
    };
};

export { login, logout };
