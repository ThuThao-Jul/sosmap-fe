import { combineReducers } from "redux";
import ticketReducer from "./ticket.reducer";

export default combineReducers({
    ticketReducer: ticketReducer
})