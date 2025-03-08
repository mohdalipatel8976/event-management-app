import { message, Modal } from "antd";
import React from "react";
import CheckoutForm from "./CheckoutForm";

interface CheckoutModalProps {
  showCheckoutModal: boolean;
  setShowCheckoutModal: React.Dispatch<React.SetStateAction<boolean>>;
  totalAmount: number;
  userId?: string;
  eventId?: string;
  tickets: any[];
  selectedTicketsCount?: number;
  selectedTicketType?: string;
}

function CheckoutModal({
  showCheckoutModal,
  setShowCheckoutModal,
  totalAmount,
  userId = "guest_user",
  eventId = "unknown_event",
  tickets = [],
  selectedTicketsCount = 1,
  selectedTicketType = "",
}: CheckoutModalProps) {
  const handleCancel = () => {
    setShowCheckoutModal(false);
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
        <CheckoutForm
          userId={userId}
          eventId={eventId}
          tickets={tickets}
          totalAmount={totalAmount}
          selectedTicketsCount={selectedTicketsCount}
          selectedTicketType={selectedTicketType}
        />
      </div>
    </Modal>
  );
}

export default CheckoutModal;