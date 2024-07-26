import { DISPATCH_TYPES } from '../constant';

const user = (state = {}, action) => {
    switch (action.type) {
        case DISPATCH_TYPES.USER_BY_ROLE:
            return {
                ...state,
                userByRole: action.payload
            };

        default:
            return state;
    }
};

export default user;
