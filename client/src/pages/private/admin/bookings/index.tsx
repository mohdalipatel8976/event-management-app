import { message, Table } from "antd";
import PageTitle from "../../../../components/page-title";
import { useEffect, useState } from 'react';
import { getAllBookings, getUserBookings } from "../../../../api-services/booking-service";
import { BookingType } from "../../../../interfaces";
import { getDateFormat } from "../../../../helpers/date-time-formats";

function AdminBookingsPage() {
    const [bookings, setbookings] = useState<BookingType[]>([]);
    const [loading, setloading] = useState(false);
    const getData = async () => {
        try {
            setloading(true)
            const response = await getAllBookings();
            setbookings(response.data)
            setloading(false)
        } catch (error: any) {
            message.error(error.message)
        } finally {
            setloading(false)
            }
    }

    useEffect(() => {
        getData()
    }, [])

    const columns = [
        {
            title : "Event Name",
            dataIndex : "event",
            key : "event",
            render : (event: any) => event.name
        },
        {
            title : "User Name",
            dataIndex : "user",
            key : "user",
            render : (user: any) => user.name
        },
        {
            title : "Event Date & time",
            dataIndex : "event",
            key : "event",
            render : (event: any) => getDateFormat(`${event.date} ${event.time}`)
        },
        {
            title : "Ticket Type",
            dataIndex : "ticketType",
            key : "ticketType",
        },
        {
            title : "Ticket Quantity",
            dataIndex : "ticketsCount",
            key : "ticketsCount",
        },
        { 
            title : "Total Amount",
            dataIndex : "ticketAmount",
            key : "ticketAmount",
        },
        {
            title : "Booking Date",
            dataIndex : "createdAt",
            key : "createdAt",
            render : (createdAt: string) => getDateFormat(createdAt)
        },
        {
            title : "Status",
            dataIndex : "status",
            key : "status",
        },
        
    ]
    return (
        <div >
            <PageTitle title="Bookings" />
            <Table
                dataSource={bookings}
                columns={columns}
                loading={loading}
                rowKey="_id"
                pagination={false}
            />
        </div>
    )
}
export default AdminBookingsPage;