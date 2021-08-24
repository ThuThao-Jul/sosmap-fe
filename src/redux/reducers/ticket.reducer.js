import * as types from "../constants/ticket.constants"

const initialState = {
    tickets: []
}

const ticketReducer = (state = initialState, action) =>{
    const {type, payload} = action

    switch (type) {
        // GET ALL PRODUCT
        case types.GET_ALL_TICKETS_REQUEST:
            return {
                ...state 
            }
        case types.GET_ALL_TICKETS_SUCCESS:
            return {
                ...state, tickets: payload
            }
        case types.GET_ALL_TICKETS_FAILURE:
            return {
                ...state
            }
        default:
            return state
    }    
}

export default ticketReducer