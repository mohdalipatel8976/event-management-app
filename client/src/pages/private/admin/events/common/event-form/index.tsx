import Tickets from "./tickets"
import General from "./general"
import LocationAndDate from "./location-and-date"
import Media from "./media"
import { Form, message, Steps } from "antd"
import { useState } from "react"
import { uploadFileAndReturnURL } from "../../../../../../api-services/storage-service"
import { createEvent, updateEvent } from "../../../../../../api-services/events-service"
import { useNavigate, useParams } from "react-router-dom"


export interface EventFormStepProps {
    eventData: any;
    setEventData: any;
    setCurrentStep: any;
    currentStep: number;
    selectedMediaFiles: any;
    setSelectedMediaFiles: any;
    loading: boolean;
    onFinish: any;
}
function EventForm({ initialData = {}, type = 'create' }: {
    initialData?: any;
    type?: 'create' | 'edit'
}) {

    const [currentStep, setCurrentStep] = useState(0)
    const [eventData, setEventData] = useState<any>(initialData)
    const [selectedMediaFiles, setSelectedMediaFiles] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const params: any = useParams()


    const onFinish = async () => {
        try {
            setLoading(true);
            const [...urls] = await Promise.all(selectedMediaFiles.map(async (file: any) => {
                return await uploadFileAndReturnURL(file);
            }));

            eventData.media = [...(eventData?.media || []), ...urls];
            if (type === "edit") {
                await updateEvent(params.id, eventData);
                message.success("Event updated successfully");
            } else {
                await createEvent(eventData);
                message.success("Event created successfully");
            }

            console.log("Final Event Data:", eventData); // Log the final data to check its structure


            navigate("/admin/events");
        } catch (error: any) {
            console.error("Error during event creation:", error);
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };



    const commonProps = {
        eventData,
        setEventData,
        setCurrentStep,
        currentStep,
        selectedMediaFiles,
        setSelectedMediaFiles,
        loading,
        setLoading,
        onFinish
    }
    const stepsData = [

        {
            name: "General",
            component: <General
                {...commonProps} />
        },
        {
            name: "Location and Date",
            component: <LocationAndDate
                {...commonProps} />
        },
        {
            name: "Media",
            component: <Media
                {...commonProps} />
        },
        {
            name: "Tickets",
            component: <Tickets
                {...commonProps} />
        }
    ];

    return (
        <Form layout="vertical">
            <Steps current={currentStep}
                onChange={(step) => setCurrentStep(step)}>
                {stepsData.map((step, index) => (
                    <Steps.Step key={index} title={step.name}
                        disabled={index > currentStep} />
                ))}
            </Steps>
            <div className="mt-5">{stepsData[currentStep].component}</div>
        </Form>
    )
}

export default EventForm