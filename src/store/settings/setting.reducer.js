import { DISPATCH_TYPES } from '../constant';

const setting = (state = {}, action) => {
    switch (action.type) {
        case DISPATCH_TYPES.SETTING:
            return {
                ...state,
                setting: action.payload
            };
        case DISPATCH_TYPES.UPDATE_SETTING:
            return {
                ...state,
                update: action.payload
            };
        default:
            return state;
    }
};

export default setting;
