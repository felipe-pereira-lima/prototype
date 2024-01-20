import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";

dayjs.extend(relativeTime);

type DateInput = string | number | Date | undefined;

interface FormatDateOptions {
  /**
   * Empty locale results in the sytems locale beeing used
   */
  locales?: string | string[] | undefined;
  /**
   * Should the formatted date include the time
   */
  showTime?: boolean;
}

export function formatDate(
  date: DateInput,
  { locales = "en-UK", showTime = true }: FormatDateOptions = {}
): string {
  if (!date || isNaN(new Date(date).getTime())) return "";

  return new Intl.DateTimeFormat(locales, {
    dateStyle: "short",
    ...(showTime && { timeStyle: "medium" }),
  }).format(new Date(date));
}

export function formatDateFromNow(date: DateInput): string {
  if (!date) return "";

  return dayjs(date).fromNow();
}
