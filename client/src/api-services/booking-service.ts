import axios from "axios";

export const createBooking = async (data: any) => {
    const token = localStorage.getItem("token");  // ✅ Get token from localStorage
    const response = await axios.post("/api/bookings/create-booking", data, {
        headers: {
            Authorization: `Bearer ${token}`,  // ✅ Send token in headers
            "Content-Type": "application/json",
        },
    });
    return response.data;
};
