var today = new Date();
export const TodayDate = today.toISOString().substring(0,10)
var oneYearFromNow = new Date();
oneYearFromNow.setFullYear(today.getFullYear() + 1);
export const ExpireformattedDateFormNow = oneYearFromNow.toISOString().substring(0,10)

export const IssuesformattedDate = today.toISOString().substring(0, 10)

const dobValidation = new Date();
dobValidation.setFullYear(today.getFullYear() - 16);
export const dobDateValidation = dobValidation.toISOString().substring(0, 10);

export const addMonths = (date: string, months: number): string => {
    if (date === "") return "";
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate.toISOString().split("T")[0];
  };