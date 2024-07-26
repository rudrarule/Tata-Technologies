import { DISPATCH_TYPES } from '../constant';

const login = (state = {}, action) => {
    switch (action.type) {
        case DISPATCH_TYPES.LOGIN:
            return {
                ...state,
                login: action.payload
            };
        case DISPATCH_TYPES.NOTIFICATION:
            return {
                ...state,
                notification: action.payload
            };
        default:
            return state;
    }
};

export default login;
