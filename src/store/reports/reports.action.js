/* eslint-disable prettier/prettier */
//import { DISPATCH_TYPES_CP } from "../constant";
import { request } from 'store/request';
import { DISPATCH_TYPES } from '../constant';
import { REPORTS_END_POINTS } from 'store/serviceEndPoint';

const search = (parameters, callback) => async (dispatch) => {
    try {
        dispatch({ type: DISPATCH_TYPES.REPORTS, payload: { loading: true, data: {} } });
        const { data = {}, success } = await request(REPORTS_END_POINTS.GET_REPORTS, parameters, null, true, null, false);
        if (success) {
            dispatch({ type: DISPATCH_TYPES_CP.CHANGE_PASSWORD, payload: data });
            if (callback) callback(success, data);
        }
    } catch (error) {
        console.log(error.message);
    }
};

export { search };
