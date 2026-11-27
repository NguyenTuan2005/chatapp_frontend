import { useEffect, useRef, useState } from "react";
import {GifPicker} from "./gif/GifPicker.tsx";

interface GifPickerButtonProps {
    onSelect: (url: string) => void;
}

export function GifPickerButton({ onSelect }: GifPickerButtonProps) {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Nhấn ra ngoài hoặc nhấn Esc thì đóng picker
    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    return (
        <div ref={wrapperRef} className="position-relative d-inline-block">
            {/* Nút icon GIF */}
            <button
                type="button"
                className="btn btn-sm btn-link text-secondary p-1"
                title="Gửi GIF / Sticker"
                onClick={() => setOpen((value) => !value)}
            >
                <span
                    className={`border rounded px-1 fw-bold ${
                        open ? "text-primary border-primary" : ""
                    }`}
                    style={{ fontSize: 11 }}
                >
                    GIF
                </span>
            </button>

            {/* Picker chỉ hiện khi open = true, nổi lên phía trên nút */}
            {open && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "100%",
                        left: 0,
                        marginBottom: 8,
                        zIndex: 1050,
                    }}
                >
                    <GifPicker
                        onSelect={onSelect}
                        onClose={() => setOpen(false)}
                    />
                </div>
            )}
        </div>
    );
}