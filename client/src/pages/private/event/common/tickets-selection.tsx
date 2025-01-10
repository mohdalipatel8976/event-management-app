import { useState } from "react";
import { EventType } from "../../../../interfaces";
import { Button, Input } from "antd";

function TicketsSelection({ eventData }: { eventData: EventType }) {

  const ticketTypes = eventData.ticketTypes;
  const [selectedTicketType, setSelectedTicketType] = useState<string>('');
  const [maxCount, setMaxCount] = useState<number>(1);
  const selectedTicketPrice = ticketTypes.find((ticketType) => ticketType.name === selectedTicketType)?.price;
  const [selectedTicketCount, setSelectedTicketCount] = useState<number>(1);

  const totalAmount = (selectedTicketPrice || 0) * selectedTicketCount;
  return (
    <div>
      <div>
        <h1 className="text-sm text-info font-bold">Select ticket type</h1>
        <div className="flex flex-wrap gap-5 mt-3">
          {ticketTypes.map((ticketType, index) => (
            <div key={index} className={`border border-gray-200 bg-gray-100 p-2 lg:w-96 w-full cursor-pointer ${selectedTicketType === ticketType.name ? "border-primary border-solid border-2" : ""}`} onClick={() => { setSelectedTicketType(ticketType.name); setMaxCount(ticketType.limit) }}>
              <h1 className="text-sm text-gray-900 uppercase">
                {ticketType.name}
                <div className="flex justify-between">
                  <h1 className="text-sm font-bold">
                    ${ticketType.price}
                  </h1>
                  <h1 className="text-xs font-bold">
                    {ticketType.limit} Left
                  </h1>
                </div>
              </h1>
            </div>
          ))}
        </div>
        <h1 className="text-sm text-info font-bold mt-10">Select ticket type</h1>
        <Input type="number" value={selectedTicketCount} onChange={(e) => setSelectedTicketCount(parseInt(e.target.value))} max={maxCount} min={1} />
        <div className="mt-7 flex justify-between bg-gray-200 border border-solid p-3">
          <h1 className="text-xl text-gray-500 font-bold">
            Total Amount :$ {totalAmount}
          </h1>
          <Button type="primary">Book Now</Button>
        </div>
      </div>
    </div>
  );
}
export default TicketsSelection;