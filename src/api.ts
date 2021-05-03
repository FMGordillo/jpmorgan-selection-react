import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/";

export const getCategories = () => axios.get("/categories");

export const getEvents = () => axios.get("/events");

export const resetDb = () => {
  console.log("Not implemented yet");
};

export const createEvent = (event: { name: string; category: number }) =>
  axios.post("/events", event);
