import dayjs from "dayjs";

export const getDateFormat = (date: string) => {
    if(!date) return "";
    return dayjs(date).format("DD MMMM YYYY");
}

export const getDateTimeFormat = (date: string) => {  
    return dayjs(date).format("DD MMMM YYYY, hh:mm A");
}