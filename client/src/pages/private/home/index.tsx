import { useEffect, useState } from "react";
import usersGlobalStore, { UsersStoreType } from "../../../store/users-store";
import { message } from "antd";
import { getEvents } from "../../../api-services/events-service";
import EventCard from "./common/event-card";
import { EventType } from "../../../interfaces";
import Filters from "./common/filters";



function HomePage() {

  const { currentUser } = usersGlobalStore() as UsersStoreType;
  const [events, setEvent] = useState<EventType[]>([]);
  const [filters, setFilters] = useState({
    searchText: "", 
    date: "",
  });
  const [loading, setLoading] = useState(false);

  const getData = async (filtersObj:any) => {
    try {
      setLoading(true);
      const response = await getEvents(filters);
      setEvent(response.data);
    } catch (error) {
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }

  
  useEffect(() => {
    // Fetch initial data
    getData(filters);
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    // Refetch data whenever filters change
    getData(filters);
  }, [filters]);
  
  return (
    <div className="p-5">
      <p>Welcome, {currentUser?.name}!</p>

      <Filters filters={filters} setFilters={setFilters}
      onFilter={getData}
      />

      <div className="flex flex-col gap-7 mt-7">
          {events.map((event: any) => (
            <EventCard key={event._id} event={event} />
          ))}
      </div>
    </div>
  );
}

export default HomePage