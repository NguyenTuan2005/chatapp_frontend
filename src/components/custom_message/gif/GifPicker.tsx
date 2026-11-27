import { useState } from "react";
import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Search, Smile } from "lucide-react";

interface GifPickerProps {
    onSelect: (url: string) => void;
    onClose?: () => void;
}

type PickerTab = "GIF" | "STICKER";

export function GifPicker({
                              onSelect,
                              onClose,
                          }: GifPickerProps) {
    const [tab, setTab] = useState<PickerTab>("GIF");
    const [keyword, setKeyword] = useState("");

    const apiKey = import.meta.env.VITE_GIPHY_API_KEY;

    const gf = new GiphyFetch(apiKey);

    const fetchGifs = (offset: number) => {
        const query = keyword.trim() || (tab === "STICKER" ? "cat" : "funny");

        if (tab === "STICKER") {
            return gf.search(query + " sticker", {
                offset,
                limit: 12,
            });
        }

        return gf.search(query, {
            offset,
            limit: 12,
        });
    };

    const handleSearch = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        // Grid sẽ gọi fetchGifs lại khi render
        setKeyword((value) => value.trim());
    };

    return (
        <div
            className="bg-white border rounded-3 shadow"
            style={{
                width: 360,
                maxHeight: 450,
                overflow: "hidden",
            }}
        >
            {/* Header */}
            <div className="p-2 border-bottom">
                <form onSubmit={handleSearch}>
                    <div className="input-group input-group-sm">
                        <span className="input-group-text bg-white">
                            <Search size={16} />
                        </span>

                        <input
                            type="text"
                            className="form-control"
                            placeholder={
                                tab === "GIF"
                                    ? "Tìm GIF..."
                                    : "Tìm sticker..."
                            }
                            value={keyword}
                            onChange={(e) =>
                                setKeyword(e.target.value)
                            }
                        />
                    </div>
                </form>
            </div>

            {/* Tabs */}
            <div className="d-flex border-bottom">
                <button
                    type="button"
                    className={`btn btn-sm flex-fill rounded-0 ${
                        tab === "GIF"
                            ? "fw-bold text-primary"
                            : "text-secondary"
                    }`}
                    onClick={() => setTab("GIF")}
                >
                    GIF
                </button>

                <button
                    type="button"
                    className={`btn btn-sm flex-fill rounded-0 ${
                        tab === "STICKER"
                            ? "fw-bold text-primary"
                            : "text-secondary"
                    }`}
                    onClick={() => setTab("STICKER")}
                >
                    <Smile size={15} className="me-1" />
                    Sticker
                </button>
            </div>

            {/* Content */}
            <div
                style={{
                    height: 340,
                    overflowY: "auto",
                    padding: 6,
                }}
            >
                <Grid
                    width={340}
                    columns={3}
                    gutter={6}
                    fetchGifs={fetchGifs}
                    noResultsMessage="Không tìm thấy"
                    hideAttribution={false}
                    onGifClick={(gif, e) => {
                        e.preventDefault();

                        onSelect(
                            gif.images.original.url
                        );

                        onClose?.();
                    }}
                />
            </div>

            {/* Attribution */}
            <div
                className="text-center border-top py-1"
                style={{
                    fontSize: 10,
                    color: "#999",
                }}
            >
                Powered by GIPHY
            </div>
        </div>
    );
}