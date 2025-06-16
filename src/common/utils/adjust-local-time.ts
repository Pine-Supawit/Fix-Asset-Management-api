export function adjustToLocalTime(date: Date | string | null): Date | null {
    if (!date) return null;
    const dt = new Date(date);
    dt.setHours(dt.getHours() + 7);
    return dt;
}