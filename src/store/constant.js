/* eslint-disable prettier/prettier */
// theme constant
export const gridSpacing = 3;
export const drawerWidth = 260;
export const appDrawerWidth = 320;

const DISPATCH_TYPES = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    NOTIFICATION: 'NOTIFICATION',
    SETTING: 'SETTING',
    UPDATE_SETTING: 'UPDATE_SETTING',
    USER_BY_ROLE: 'USER_BY_ROLE'
};

const ALERT_SEVERITY = {
    ERROR: 'error',
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning'
};

export { DISPATCH_TYPES, ALERT_SEVERITY };
