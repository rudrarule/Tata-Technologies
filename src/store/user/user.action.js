import { USER_END_POINTS } from 'store/serviceEndPoint';
import { DISPATCH_TYPES } from '../constant';
import { requestGet } from 'store/request';

const geUserByRole = (role) => async (dispatch) => {
    try {
        dispatch({ type: DISPATCH_TYPES.USER_BY_ROLE, payload: { loading: true, data: {} } });
        const { data = {}, success } = await requestGet(`${USER_END_POINTS.USERBYROLE}${role}`);
        if (success) {
            dispatch({ type: DISPATCH_TYPES.USER_BY_ROLE, payload: { loading: false, data } });
        }
    } catch (error) {
        console.log(error.message);
    }
};

export { geUserByRole };
