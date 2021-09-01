import * as types from "../constants/ticket.constants";
import api from "../axios";

const getTickets = () => async (dispatch) => {
  dispatch({ type: types.GET_ALL_TICKETS_REQUEST, payload: null });
  try {
    // URL have  page and limit

    let resp = await api.get("/ticket");
    const data = await resp.data.data;

    dispatch({ type: types.GET_ALL_TICKETS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.GET_ALL_TICKETS_FAILURE, payload: null });
  }
};

export const ticketActions = {
  getTickets,
};
