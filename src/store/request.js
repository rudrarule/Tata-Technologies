/* eslint-disable prettier/prettier */
import axios from 'axios';
import { store } from './index';
import { logout } from './auth/login.action';
import { ALERT_SEVERITY } from './constant';

const apiUrl = 'http://localhost:5000/api/v1/';

export function triggerNotification(message, type, rest) {
    return store.dispatch({
        type: DISPATCH_TYPES.NOTIFICATION,
        payload: { open: true, message, type: type || ALERT_SEVERITY.SUCCESS, ...rest }
    });
}

const NETWORK_ERROR = 'Network Error';

export function request(uri, body, callback, skipTriggers, onLoad, isLogin) {
    let method = 'POST';
    isLogin = isLogin ?? false;
    skipTriggers = skipTriggers ?? false;
    const config = {
        headers: isLogin
            ? null
            : {
                  Authorization: 'Bearer ' + sessionStorage.getItem('token')
              },
        onUploadProgress: (progressEvent) => {
            if (onLoad) onLoad(progressEvent);
        },
        baseURL: apiUrl,
        url: uri,
        data: body,
        method
    };
    return axios(config)
        .then(function (response) {
            let { data = {}, status } = response;
            if (callback) data = callback(data);

            if (data.token) {
                sessionStorage.setItem('token', data.token);
            }

            return {
                success: true,
                data,
                status
            };
        })
        .catch(function (err) {
            const { response = {} } = err;
            let { data = {}, status } = response;
            if (status === 500) {
                !skipTriggers && triggerNotification(NETWORK_ERROR, ALERT_SEVERITY.ERROR);
                return {
                    success: false,
                    status,
                    data: {
                        message: NETWORK_ERROR
                    }
                };
            }
            if (!skipTriggers && response.status === 400) {
                triggerNotification(response.data.message, ALERT_SEVERITY.ERROR);
            }
            /* If user is unauthorised dispatch logout action */
            if (!skipTriggers && response.status === 401) {
                store.dispatch(logout());
            }
            if (!skipTriggers && response.status === 403) triggerNotification(response.statusText, ALERT_SEVERITY.ERROR);
            if (!Object.keys(response).length) {
                console.log(err);
                return {};
            }
            return { success: false, data, status };
        });
}

const regulateService = (config, callback, skipTriggeres) => {
    return axios(config)
        .then((res) => {
            let { data, status } = res;
            if (callback) data = callback(data);
            return { success: true, data, status };
        })
        .catch((err) => {
            const { response = {} } = err;

            /* If user is unauthorised dispatch logout action */
            if (response.status === 401) {
                store.dispatch(logout());
                navigate('/login');
            }
            if (!skipTriggeres && response.status === 500) {
                triggerNotification(response.statusText || err.message, ALERT_SEVERITY.ERROR);
            }
            if (!skipTriggeres && response.status === 400) {
                triggerNotification(response.data.message || 'Server Error', ALERT_SEVERITY.ERROR);
            }
            if (!skipTriggeres && response.status === 403) triggerNotification(response.statusText || 'Forbidden', ALERT_SEVERITY.ERROR);
            let { data = {}, status } = response;
            return { success: false, data, status };
        });
};

export function requestGet(uri, callback, baseUrl = apiUrl, skipTriggeres = false) {
    let config = {
        url: uri,
        baseURL: baseUrl,
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        data: {}
    };
    return regulateService(config, callback, skipTriggeres);
}

export function requestPatch(uri, body, callback, skipTriggers) {
    let method = 'PATCH';
    let config = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        },
        baseURL: apiUrl,
        url: uri,
        data: body,
        method
    };

    return regulateService(config, callback, skipTriggers || false);
}

export function requestPut(uri, body, callback, baseUrl = apiUrl, skipTriggeres = false) {
    let method = 'PUT';
    let config = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        baseURL: baseUrl,
        url: uri,
        data: body,
        method
    };
    return regulateService(config, callback, skipTriggeres);
}

export function requestDelete(uri, body, callback, baseUrl = apiUrl, skipTriggeres = false) {
    let method = 'delete';
    let config = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        baseURL: baseUrl,
        url: uri,
        data: body,
        method
    };
    return regulateService(config, callback, skipTriggeres);
}
