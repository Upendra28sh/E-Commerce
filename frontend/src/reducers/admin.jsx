import Cookies from 'js-cookie';
const INITIAL_STATE = {
    orders:[]
};

function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'get-orders') {
        return Object.assign({}, state, {
            orders: action.payload
        })
    } else {
        return state
    }
}

export default reducer;
