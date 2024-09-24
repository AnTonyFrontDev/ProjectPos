import axios from "axios";
import { URL } from "../Common/url";

export const getNoteCredits = async () => {
  try {
    const response = await axios.get(
      `${URL}/NoteCredit/GetAll?Page=1&ItemsPerPage=30`);
    console.log('Response:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error checking order:", error);
    throw error;
  }
};

export const getNoteCreditId = async (CreditId : number) => {
  try {
    const response = await axios.get(`${URL}/NoteCredit/GetById?id=${CreditId}`);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo la orden:", error);
    throw error;
  }
};

export const getNoteCreditClientId = async (ClientId : number) => {
  try {
    const response = await axios.get(`${URL}/NoteCredit/GetNotesByIdClient?id=${ClientId}`);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo la orden:", error);
    throw error;
  }
};




