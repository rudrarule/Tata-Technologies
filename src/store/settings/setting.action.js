/* eslint-disable prettier/prettier */
import { SETTING_END_POINTS } from 'store/serviceEndPoint';
import { ALERT_SEVERITY, DISPATCH_TYPES } from '../constant';
import { requestGet, requestPut, triggerNotification } from 'store/request';

const getSetting = () => async (dispatch) => {
    try {
        dispatch({ type: DISPATCH_TYPES.SETTING, payload: { loading: true, data: {} } });
        const { data = {}, success } = await requestGet(SETTING_END_POINTS.GET_SETTING);
        if (success) {
            dispatch({ type: DISPATCH_TYPES.SETTING, payload: { loading: false, data } });
        }
    } catch (error) {
        console.log(error.message);
    }
};

const updateSetting = (obj, callBack) => async () => {
    try {
        const { success } = await requestPut(SETTING_END_POINTS.UPDATE_SETTING, obj);
        if (success) {
            const message = 'Successfully saved';
            // triggerNotification(message, ALERT_SEVERITY.SUCCESS, { isTextOverflowClip: true });
            setTimeout(() => {
                if (callBack) callBack(true, { open: false, message: '', severity: 'error' });
            }, 100);
        }
    } catch (error) {
        console.log(error);
    }
};

export { getSetting, updateSetting };
