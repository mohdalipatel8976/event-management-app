import React, { useState } from "react";
import { EventType } from "../../../../interfaces";
import { Button, Input } from "antd";
import CheckoutModal from "./CheckoutModal";

function TicketsSelection({ eventData }: { eventData: EventType }) {
  const ticketTypes = eventData.ticketTypes;

  const [selectedTicketType, setSelectedTicketType] = useState<string>("");
  const [maxCount, setMaxCount] = useState<number>(1);
  const [selectedTicketCount, setSelectedTicketCount] = useState<number>(1);
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);

  const selectedTicket = ticketTypes.find(
    (ticketType) => ticketType.name === selectedTicketType
  );
  const selectedTicketPrice = selectedTicket?.price || 0;
  const totalAmount = selectedTicketPrice * selectedTicketCount;

  // Handles selecting a ticket type
  const handleTicketTypeChange = (ticketType: string) => {
    setSelectedTicketType(ticketType);
    const selected = ticketTypes.find((t) => t.name === ticketType);
    const available = selected?.available ?? selected?.limit ?? 1;
    setMaxCount(available);
    setSelectedTicketCount(1); // Reset quantity to 1 on new selection
  };

  // Handles ticket quantity changes with NaN prevention
  const handleTicketCountChange = (value: string) => {
    const parsedValue = parseInt(value) || 0; // Default to 0 if input is invalid
    setSelectedTicketCount(Math.min(Math.max(parsedValue, 1), maxCount));
  };

  // Construct the tickets array based on the selected type and count
  const ticketsArray = selectedTicketType
    ? [{ ticketType: selectedTicketType, quantity: selectedTicketCount, price: selectedTicketPrice }]
    : [];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-5xl mx-auto">
      <h1 className="text-xl font-semibold text-red-600">Select Ticket Type</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
        {ticketTypes.map((ticketType, index) => {
          const available = ticketType.available ?? ticketType.limit;
          return <div
            key={index}
            className={`border p-2 rounded-lg cursor-pointer transition-all duration-300 
              ${selectedTicketType === ticketType.name
                ? "border-red-500 bg-red-100 shadow-lg"
                : "border-gray-300 bg-gray-100"
              }`}
            onClick={() => handleTicketTypeChange(ticketType.name)}
          >
            <h2 className="text-lg font-bold text-gray-800">
              {ticketType.name}
            </h2>
            <div className="flex justify-between mt-1">
              <p className="text-base font-bold text-gray-700">
                ₹{ticketType.price}
              </p>
              <p className="text-sm font-bold text-gray-500">
                {available} Left
              </p>
            </div>
          </div>
        }
        )}
      </div>

      <h1 className="text-lg font-semibold text-red-600 mt-8">
        Select Ticket Quantity
      </h1>
      <div className="mt-3">
        <Input
          type="number"
          value={selectedTicketCount}
          onChange={(e) => handleTicketCountChange(e.target.value)}
          max={maxCount}
          min={1}
          className="w-full md:w-1/2 border border-gray-300 rounded-lg"
        />
      </div>


      <div className="mt-8 flex flex-col md:flex-row justify-between items-center bg-gray-100 border border-gray-300 p-5 rounded-lg">
        <h2 className="text-xl font-bold text-gray-700">
          Total Amount:{" "}
          <span className="text-red-600">₹{totalAmount.toFixed(2)}</span>
        </h2>
        <Button
          type="primary"
          className="bg-red-600 hover:bg-red-700 text-white border-none mt-4 md:mt-0"
          disabled={!selectedTicketType || !selectedTicketCount || selectedTicketCount > maxCount} 
          onClick={() => setShowCheckoutModal(true)}
        >
          Book Now
        </Button>
      </div>

      {showCheckoutModal && (
        <CheckoutModal
          showCheckoutModal={showCheckoutModal}
          setShowCheckoutModal={setShowCheckoutModal}
          totalAmount={totalAmount}  // Ensure this is correctly calculated
          userId={eventData._id || "fallback_user"}
          eventId={eventData._id || "fallback_event"}
          tickets={ticketsArray}
          selectedTicketsCount={selectedTicketCount}
          selectedTicketType={selectedTicketType}
        />
      )}
    </div>
  );
}

export default TicketsSelection;
