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

export function getFilenameFromContentDisposition(headerValue?: string) {
    if (!headerValue) return null;
    // 处理 RFC5987 (filename*=UTF-8'') 和 普通 filename="..."
    const filenameStarMatch = headerValue.match(
        /filename\*\s*=\s*UTF-8''([^;]+)/i,
    );
    if (filenameStarMatch) {
        try {
            return decodeURIComponent(filenameStarMatch[1]);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return filenameStarMatch[1];
        }
    }
    const filenameMatch = headerValue.match(
        /filename\s*=\s*["']?([^"';]+)["']?/i,
    );
    if (filenameMatch) return filenameMatch[1];
    return null;
}
