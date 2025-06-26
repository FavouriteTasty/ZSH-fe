import { CalendarDate } from "@internationalized/date";

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
