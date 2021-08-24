import * as types from "../constants/ticket.constants";
import axios from "axios";

const getTickets = () => async (dispatch) => {
  dispatch({ type: types.GET_ALL_TICKETS_REQUEST, payload: null });
  try {
    // URL have  page and limit
    let url = `http://localhost:5000/api/ticket`;

    let resp = await axios.get(url);
    const data = await resp.data.data;
    console.log(data);

    dispatch({ type: types.GET_ALL_TICKETS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.GET_ALL_TICKETS_FAILURE, payload: null });
  }
};

export const ticketActions = {
  getTickets,
};
