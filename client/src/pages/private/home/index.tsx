import { useEffect, useState } from "react";
import usersGlobalStore, { UsersStoreType } from "../../../store/users-store";
import { message } from "antd";
import { getEvents } from "../../../api-services/events-service";
import EventCard from "./common/event-card";
import { EventType } from "../../../interfaces";
import events from "../admin/events";


function HomePage() {

  const { currentUser } = usersGlobalStore() as UsersStoreType;
  const [events, setEvent] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEvents();
      setEvent(response.data);
    } catch (error) {
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <div className="p-5">
      <p>Welcome, {currentUser?.name}!</p>

      <div className="flex flex-col gap-7">
          {events.map((event: any) => (
            <EventCard key={event._id} event={event} />
          ))}
      </div>
    </div>
  );
}

export default HomePage