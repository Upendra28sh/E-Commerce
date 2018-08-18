import Cookies from 'js-cookie';
const INITIAL_STATE = {
    orders:[]
};

function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'get-orders') {
        temp=[],
        action.payload.map((order,index)=>{
             temporder={
                date: "09-08-2018",
                id: order.id,
                name: order.user.name,
                city: order.city,
                confirmed: order.Confirmed,
                packed: order.Packed,
                shipped: false,
                delivered: false,
                total: "Rs. 3500",
                status: order.PayStatus,
                age: "1d 15h"
             };
             temp.push_back(temp);
             console.log("test",temp);
        })
        return Object.assign({}, state, {
            orders: temp
        })
    } else {
        return state
    }
}

export default reducer;
