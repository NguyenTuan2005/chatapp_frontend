import { useEffect, useState } from "react";
import { Card, Image, Placeholder, Ratio } from "react-bootstrap";
import {MessageRow} from "./MessageRow.tsx";
import type {ChatMessage} from "../../types/Chat.ts";

export interface LinkPreviewMessageProps {
    url: string;
    time?: string;
    className?: string;
    message : ChatMessage;
}

interface LinkMeta {
    title?: string;
    imageUrl?: string;
    domain: string;
}

const getDomain = (url: string) => {
    try {
        return new URL(url).hostname;
    } catch {
        return url;
    }
};


async function fetchLinkMeta(url: string, signal: AbortSignal): Promise<LinkMeta> {
    const res = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`, { signal });
    if (!res.ok) throw new Error(`Preview API lỗi ${res.status}`);
    const json = await res.json();
    const d = json.data ?? {};
    return {
        title: d.title,
        imageUrl: d.image?.url,
        domain: d.url ? getDomain(d.url) : getDomain(url),
    };
}


export function LinkPreviewMessage ({ url, className = "", message }: LinkPreviewMessageProps ){
    const [meta, setMeta] = useState<LinkMeta | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setMeta(null);

        fetchLinkMeta(url, controller.signal)
            .then(setMeta)
            .catch((e) => {
                if (e.name !== "AbortError") setMeta({ domain: getDomain(url) });
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });

        return () => controller.abort();
    }, [url]);

    const title = meta?.title;


    return (
        <MessageRow isMine={message.isMine} createdAt={message.createdAt} >
            <Card
                className={`bg-primary-subtle border-0 shadow-sm rounded-3 ${className ?? ""}`}
                style={{ width: 564, maxWidth: "100%" }}
            >
                <Card.Body className="d-flex flex-column gap-3">
                    <p className="mb-0 fs-5 text-break">
                        {title && <>{title} </>}
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary text-decoration-none"
                        >
                            {url}
                        </a>
                    </p>

                    {loading ? (
                        <Placeholder as="div" animation="glow" className="d-flex flex-column gap-2">
                            <Placeholder xs={12} className="rounded-4" style={{ aspectRatio: "16 / 9" }} />
                            <Placeholder xs={6} />
                            <Placeholder xs={3} />
                        </Placeholder>
                    ) : (
                        meta && (
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="d-flex flex-column gap-2 text-decoration-none text-body"
                            >
                                {meta.imageUrl && (
                                    <Ratio aspectRatio="16x9">
                                        <Image
                                            src={meta.imageUrl}
                                            alt={title ?? meta.domain}
                                            loading="lazy"
                                            className="object-fit-cover rounded-4"
                                        />
                                    </Ratio>
                                )}
                                {title && <span className="fs-5 fw-semibold">{title}</span>}
                                <span className="fs-6 text-primary">{meta.domain}</span>
                            </a>
                        )
                    )}
                </Card.Body>
            </Card>
        </MessageRow>
    );
};