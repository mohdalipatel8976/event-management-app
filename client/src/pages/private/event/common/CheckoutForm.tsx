import { Button, message } from "antd";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../../../../api-services/booking-service";

function CheckoutForm({
  userId,
  eventId,
  tickets,
  totalAmount,
  selectedTicketsCount,
  selectedTicketType,
}: {
  userId: string;
  eventId: string;
  tickets: any[];
  totalAmount: number;
  selectedTicketsCount: number;
  selectedTicketType: string;
}) {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();

      const mappedTickets = tickets.map(ticket => ({
        // Since the ticket object already uses 'ticketType', we use it directly.
        ticketType: ticket.ticketType,
        quantity: ticket.quantity,
        price: ticket.price,
      }));
      
      const orderPayload = {
        users: userId || "default_user",     // Note: your backend expects "users"
        event: eventId || "default_event",     // Your backend expects "event"
        tickets: mappedTickets,
        totalAmount,
        paymentStatus: "Paid",
        paymentIntentId: "bypass_stripe",
        shippingAddress: {
          line1: "123 Main St",
          city: "New York",
          country: "US",
          postal_code: "10001",
        },
      };
      
      console.log("Mapped Tickets:", mappedTickets);
      console.log("Sending Order Payload:", orderPayload);
      

      console.log("📦 Sending Order Payload:", orderPayload);

      const response = await axios.post("/api/orders", orderPayload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        message.success("Order placed successfully!");

        const bookingPayload = {
          event: eventId,
          ticketType: selectedTicketType,
          ticketsCount: selectedTicketsCount, // Add this field
          ticketAmount: totalAmount, // Add this field
          paymentID: "bypass_stripe", // Add this field (or use a real payment ID if available)
          status: "booked",
        };
        await createBooking(bookingPayload);
        message.success("Booking Successful");
        navigate("/profile");
      } else {
        throw new Error("Failed to place order!");
      }
    } catch (error: any) {
      console.error("Error placing order:", error.response?.data || error.message);
      message.error(error.response?.data?.message || error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full mt-5 block"
          loading={loading}
        >
          Pay ₹{totalAmount.toFixed(2)}
        </Button>
      </form>
    </div>
  );
}

export default CheckoutForm;