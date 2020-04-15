import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/";

export const getCategories = () => axios.get("/categories");

export const getEvents = () => axios.get("/events");

/**
 *
 * @param {{name: String, category: Number}} event
 */
export const createEvent = event => axios.post({ url: "/events", data: event });
