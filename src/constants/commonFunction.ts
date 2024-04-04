import moment from 'moment';


export function isObjectEmpty(obj: Object) {
    for (var i in obj) return false;
    return true;
}
  
export function displayDate(date: Date) {
  if (date) {
    const formattedDate = moment(date).format('DD-MMM-YYYY');
    return formattedDate
  }
  return date
}