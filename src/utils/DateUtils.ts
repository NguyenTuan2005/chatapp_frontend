const TIME_ZONE = "Asia/Ho_Chi_Minh";

export function parseChatDate(dateString: string): Date {
    const [datePart, timePart] = dateString.split(" ");

    if (!datePart || !timePart) {
        throw new Error(`Invalid chat date: ${dateString}`);
    }

    return new Date(`${datePart}T${timePart}+07:00`);
}

export function getChatDateKey(date: Date): string {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: TIME_ZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(date);

    const values = Object.fromEntries(
        parts.map(part => [part.type, part.value])
    );

    return `${values.year}-${values.month}-${values.day}`;
}

export function formatMessageTime(date: Date): string {
    return new Intl.DateTimeFormat("vi-VN", {
        timeZone: TIME_ZONE,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(date);
}

export function formatMessageDate(date: Date): string {
    const today = getChatDateKey(new Date());
    const yesterdayDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const yesterday = getChatDateKey(yesterdayDate);

    const messageDate = getChatDateKey(date);

    if (messageDate === today) {
        return "Hôm nay";
    }

    if (messageDate === yesterday) {
        return "Hôm qua";
    }

    return new Intl.DateTimeFormat("vi-VN", {
        timeZone: TIME_ZONE,
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date);
}

