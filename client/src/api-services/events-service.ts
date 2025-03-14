import axios from "axios";

export const createEvent = async (data: any) => {
  try {
    const response:any = axios.post('/api/events/create-event', data);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const getEvents = async (filters: any) => {
  try {
    const response:any = await axios.get(`/api/events/get-events?searchText=${filters.searchText}&date=${filters.date}`);
    return response.data;
  } catch (error) {
    console.error("Error getting events:", error);
    throw error;
  }
}

export const getEventById = async (id: string) => {
  const response: any = await axios.get(`/api/events/get-events/${id}`)
  return response.data
}

export const updateEvent = async (id: string, data: any) => {
  const response: any = await axios.put(`/api/events/edit-event/${id}`, data)
  return response.data
}

export const deleteEvent = async (id: string) => {
  const response: any = await axios.delete(`/api/events/delete-event/${id}`)
  return response.data
}