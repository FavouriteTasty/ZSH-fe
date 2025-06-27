export function capitalize(s: string, isLowerCase: boolean = true) {
    return s
        ? s.charAt(0).toUpperCase() +
              (isLowerCase ? s.slice(1).toLowerCase() : s.slice(1))
        : "";
}

export function date2string(inputDate: Date) {
    return `${inputDate.getFullYear()}-${inputDate.getMonth() + 1}-${inputDate.getDate()}`;
}

export function capitalizeUpper(str: string): string {
    return capitalize(str.toLowerCase());
}
