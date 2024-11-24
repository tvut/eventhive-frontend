
const timezoneOffset = new Date().getTimezoneOffset();
const getAdjustedDate = (s) => {
    return new Date((new Date(s)).getTime() - timezoneOffset * 60000);
};

const getampm = (s) => {
    let d = getAdjustedDate(s);
    return (d.getHours() > 12 ? d.getHours() - 12 : d.getHours()) + ":" + d.getMinutes().toString().padStart(2, '0') + " " + (d.getHours() >= 12 ? "PM" : "AM");
};

export default {getAdjustedDate, getampm}