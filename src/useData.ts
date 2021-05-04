import axios from "axios";
import { useEffect, useState } from "react";
import { Category, Event } from "./types";

interface UseDataReturn {
  events: Event[];
  categories: Category[];
}

export const useData = (): UseDataReturn => {
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getInitialData = async () => {
      const rawData = await axios.get<UseDataReturn>("/db.json");
      setEvents(rawData.data.events);
      setCategories(rawData.data.categories);
    };
    getInitialData();
  }, []);

  return {
    events,
    categories,
  };
};
