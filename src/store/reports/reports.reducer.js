import { DISPATCH_TYPES } from '../constant';

const report = (state = {}, action) => {
    switch (action.type) {
        case DISPATCH_TYPES.REPORTS:
            return {
                ...state,
                reports: action.payload
            };
        default:
            return state;
    }
};

export default report;
