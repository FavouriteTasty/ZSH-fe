import { CalendarDate } from "@internationalized/date";

export function string2calenderDate(dateString: string) {
    return date2calenderDate(new Date(dateString));
}

export function date2calenderDate(date: Date) {
    return new CalendarDate(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
    );
}

export function calendarDate2Date(calendarDate: CalendarDate): Date {
    return new Date(
        calendarDate.year,
        calendarDate.month - 1,
        calendarDate.day,
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertDates(obj: any) {
    const isoDateRegex =
        /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|([+-]\d{2}:\d{2}))?)?$/;
    if (obj && typeof obj === "object") {
        Object.keys(obj).forEach((key) => {
            const value = obj[key];
            if (typeof value === "string" && isoDateRegex.test(value)) {
                obj[key] = new Date(value);
            } else if (typeof value === "object") {
                convertDates(value);
            }
        });
    }
    return obj;
}
