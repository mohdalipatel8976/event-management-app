import dayjs from "dayjs";

export const getDate = (date: string) => {
    return dayjs(date).format("DD MMMM YYYY");
}

export const getDateTimeFormat = (date: string) => {  
    return dayjs(date).format("DD MMMM YYYY, hh:mm A");
}