import moment from "moment-timezone";

export const getDate = async() => {
    const timezone = 'America/Mexico_City';
    return moment().tz(timezone).format('YYYY-MM-DD');
};

export const getTime = async() => {
    const timezone = 'America/Mexico_City';
    return moment().tz(timezone).format('HH:mm:ss');
}