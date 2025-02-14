import axios from "axios"

export const createBooking = async (data:any) => {
    const response = await axios.post("/api/bookings/create-booking", data)
    return response.data
}