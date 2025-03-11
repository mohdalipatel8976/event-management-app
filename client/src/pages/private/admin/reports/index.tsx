import { useEffect, useState } from "react";
import PageTitle from "../../../../components/page-title";
import AdminReportsFilters from "./filters";
import { message } from "antd";
import { getEvents } from "../../../../api-services/events-service";
import { getAdminReports } from "../../../../api-services/reports-route";
import ReportCard from "./report-card";


function AdminReports() {
    const [reports, setReports] = useState<any>([]);
    const [events, setEvents] = useState([]);
    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        eventId: ""
    });

    const getReports = async () => {
        try {
            const response = await getAdminReports(filters);
            setReports(response.data);
            console.log("Fetched Reports:", response);
        }
        catch (error: any) {
            console.error("Error fetching reports:", error);
            message.error(error.message);
        }
    }
    
    const getEventsData = async () => {
        try {
            const response = await getEvents({ searchText: "", date: "" });
            console.log("Fetched Events:", response);
            setEvents(response.data);
        } catch (error: any) {
            console.error("Error fetching events:", error);
            message.error(error.message);
        }
    };

    useEffect(() => { 
        getEventsData();
    }, []);

    useEffect(() => {
        if (events.length > 0) {
            getReports();
        }
    }, [events]);


    return (
        <div>
            <PageTitle title="Reports" />
            <AdminReportsFilters
                events={events}
                filters={filters}
                setFilters={setFilters}
                onFilter={() => { }}
            />

            <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <ReportCard title="Total Bookings" description="Total number of bookings" value={reports.totalBookings} isAmountProperty={false} />
                <ReportCard title="Total Revenue" description="Total revenue generated" value={reports.totalRevenue} isAmountProperty={true} />
                <ReportCard title="Tickets Sold" description="Total number of tickets sold" value={reports.totalTickets} isAmountProperty={false} />
                
            </div>
        </div>

        
    );

}

export default AdminReports;