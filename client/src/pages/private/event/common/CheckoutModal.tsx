import { message, Modal } from "antd";
import React, { useEffect } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe('pk_test_51NgsUvSFKsDqNG9GXqLt33BYxNw2kfEOtLoTO4QfyOyUl6JdWVKEcQ9c9wd9poCAnWluim6j63JugjtnxoCVuQ4Q00qDIFSkZe');

interface CheckoutModalProps {
  showCheckoutModal: boolean;
  setShowCheckoutModal: React.Dispatch<React.SetStateAction<boolean>>;
  totalAmount: number;
  userId: string;
  eventId: string;
  tickets: any[];
}

function CheckoutModal({
  showCheckoutModal,
  setShowCheckoutModal,
  totalAmount,
  userId,
  eventId,
  tickets,
}: CheckoutModalProps) {
  const [clientSecret, setClientSecret] = React.useState("");

  useEffect(() => {
    if (totalAmount > 0) {
      axios.post("/api/stripe_client_secret", { amount: totalAmount })
        .then((res) => {
          setClientSecret(res.data.client_secret);
        })
        .catch((error) => {
          console.error("Error fetching client secret:", error);
          message.error("Failed to initiate payment. Please try again.");
        });
    }
  }, [totalAmount, showCheckoutModal]); // Re-fetch client secret if modal opens or amount changes
  

  const handleCancel = () => {
    setShowCheckoutModal(false); // Close the modal on cancel
  };

  return (
    <Modal
      title={
        <div className="flex justify-between items-center font-bold text-xl">
          <span>Checkout</span>
          <span>Total: ₹{totalAmount.toFixed(2)}</span>
        </div>
      }
      open={showCheckoutModal}
      onCancel={handleCancel}
      centered
      closable={false}
      footer={null}
    >
      <hr className="my-5" />
      <div className="mt-5">
        {stripePromise && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm
              userId={userId}
              eventId={eventId}
              tickets={tickets}
              totalAmount={totalAmount}
            />
          </Elements>
        )}
      </div>
    </Modal>
  );
}

export default CheckoutModal;
