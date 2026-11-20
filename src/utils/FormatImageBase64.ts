

export function addBase64Prefix(base64: string, mimeType = "image/png"): string {
    if (base64.startsWith("data:")) return base64;
    return `data:${mimeType};base64,${base64}`;
}

export function stripBase64Prefix(dataUrl: string): string {
    const index = dataUrl.indexOf("base64,");
    return index === -1 ? dataUrl : dataUrl.slice(index + "base64,".length);
}


export function parseBase64(dataUrl: string): { mimeType: string; base64: string } | null {
    const match = dataUrl.match(/^data:(.+?);base64,(.*)$/s);
    if (!match) return null;
    return { mimeType: match[1], base64: match[2] };
}


export function base64ToImage(dataUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Base64 không phải hình ảnh hợp lệ"));
        img.src = dataUrl;
    });
}


export function base64ToFile(dataUrl: string, fileName = "image"): File {
    const [header, data] = dataUrl.split(",");
    const mimeType = header.match(/:(.*?);/)?.[1] ?? "image/png";
    const binary = atob(data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

    const ext = mimeType.split("/")[1] ?? "png";
    return new File([bytes], `${fileName}.${ext}`, { type: mimeType });
}