import { Button } from "antd"
import PageTitle from "../../../../components/page-title"
import { useNavigate } from "react-router-dom"

function EventsPage(){

    const navigate = useNavigate()

     return (
            <div>
    
            <div className="flex justify-between items-center">
                <PageTitle title="Events"/>
                <Button type="primary"
                onClick={() => navigate("/admin/events/create")}>
                    Create Event</Button>
            </div>
    
            </div>
        )
}

export default EventsPage