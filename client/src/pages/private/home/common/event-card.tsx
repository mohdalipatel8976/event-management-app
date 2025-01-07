import { EventType } from "../../../../interfaces";

function EventCard({event} : {event: EventType}) {
    return <div>
        {event.name}
    </div>
}

export default EventCard;