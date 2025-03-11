import axios from "axios";

export const getAdminReports = async (data: any) => {
  const response = await axios.post("/api/reports/get-admin-reports", data);
  return response.data
}