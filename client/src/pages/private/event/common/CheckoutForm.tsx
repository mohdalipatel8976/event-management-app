import { PaymentElement, AddressElement, useElements, useStripe } from "@stripe/react-stripe-js";
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
  selectedTicketType
}: {
  userId: string;
  eventId: string;
  tickets: any[];
  totalAmount: number;
  selectedTicketsCount: number;
  selectedTicketType: string;
}) {
  const [loading, setLoading] = React.useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
  
      if (!stripe || !elements) {
        throw new Error("Stripe.js has not been loaded!");
      }
  
      // Validate shipping address before confirming the payment
      const addressElement = elements.getElement("address");
      if (!addressElement) {
        throw new Error("Shipping address is required!");
      }
  
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:5173/success",
        },
        redirect: "if_required",
      });
  
      if (result.error) {
        if (result.error.type === "invalid_request_error") {
          message.error("Only domestic payments in INR are supported. Please switch to INR.");
        }
        throw result.error;
      }
  
      // Proceed with order creation
      const orderPayload = {
        user: userId,
        event: eventId,
        tickets: tickets.map((ticket) => ({
          ticketType: ticket.type,
          quantity: ticket.quantity,
          price: ticket.price,
        })),
        totalAmount,
        paymentStatus: result.paymentIntent?.status || "Pending",
        paymentIntentId: result.paymentIntent?.id || "",
        shippingAddress: result.paymentIntent?.shipping || {},
      };
  
      const response = await axios.post("/api/orders", orderPayload);
  
      if (response.status === 201) {
        message.success("Order placed successfully!");
        const bookingPayload = {
          event : eventId,
          ticketType : selectedTicketType,
          ticketsCounts : selectedTicketsCount,
          totalAmount,
          paymentId : result.paymentIntent?.id || "",
          status: "booked",
        };
        await createBooking(bookingPayload)
        message.success("Booking Successful") 
        navigate("/profile");
      } else {
        throw new Error("Failed to place order!");
      }
    } catch (error: any) {
      message.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <div className="mt-5">
          <AddressElement
            options={{
              allowedCountries: ["US", "IN"],
              mode: "shipping",
            }}
          />
        </div>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full mt-5 block"
          loading={loading}
          disabled={!stripe || !elements}
        >
          Pay ₹{totalAmount.toFixed(2)}
        </Button>

      </form>
    </div>
  );
}

export default CheckoutForm;
