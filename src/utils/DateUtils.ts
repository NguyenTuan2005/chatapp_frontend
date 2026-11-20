
const TIME_ZONE = "Asia/Ho_Chi_Minh";

export function parseChatDate(dateString: string): Date {
    if (dateString.includes("T")) {
        return new Date(dateString);
    }
    const [datePart, timePart] = dateString.split(" ");

    if (!datePart || !timePart) {
        throw new Error(`Invalid chat date: ${dateString}`);
    }

    return new Date(`${datePart}T${timePart}+07:00`);
}

export function getChatDateKey(dateString: string): string {
    const date = parseChatDate(dateString);

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

export function formatMessageTime(dateString: string): string {
    return new Intl.DateTimeFormat("vi-VN", {
        timeZone: TIME_ZONE,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(parseChatDate(dateString));
}

export function formatMessageDate(dateString: string): string {
    const today = getChatDateKey(new Date().toISOString());

    const yesterdayDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const yesterday = getChatDateKey(yesterdayDate.toISOString());

    const messageDate = getChatDateKey(dateString);

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
    }).format(parseChatDate(dateString));
}
