import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);

dayjs.extend(customParseFormat);

export function formatDate(date) {
   return dayjs.utc(date).format("YYYY-MM-DD");
}

export function formatAPIDate(date) {
   return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}

export function formatDueDate(date) {
   return dayjs(date).format("YYYY-MM-DD")
}