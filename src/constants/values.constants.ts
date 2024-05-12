import { Option } from "../types/propes.types";

var today = new Date();
export const TodayDate = today.toISOString().substring(0,10)
var oneYearFromNow = new Date();
oneYearFromNow.setFullYear(today.getFullYear() + 1);
export const ExpireformattedDateFormNow = oneYearFromNow.toISOString().substring(0,10)

export const IssuesformattedDate = today.toISOString().substring(0, 10)

const dobValidation = new Date();
dobValidation.setFullYear(today.getFullYear() - 16);
export const dobDateValidation = dobValidation.toISOString().substring(0, 10);

export const addMonths = (date: string, months: number): any => {
    console.log(date,months);
    
    if (date === "") return "";
    const newDate = new Date(date);
    if (months) {
        newDate.setMonth(newDate.getMonth() + months ?? 0);
        return newDate.toISOString().split("T")[0]
    } else {
        return null
    }
    // return newDate.toISOString().split("T")[0];
};
  
export const createOption = (label: string, value: string) => ({
    label,
    value,
}) as Option;