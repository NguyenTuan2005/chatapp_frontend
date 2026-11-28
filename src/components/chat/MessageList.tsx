import {useEffect, useLayoutEffect, useRef} from "react";
import type {ChatMessage} from "../../types/Chat.ts";
import {getChatDateKey} from "../../utils/DateUtils.ts";
import {getChatMessageType} from "../../utils/MessageTypeDetector.ts";
import {ChatMessageFactory} from "../../utils/ChatMassageFacatory.tsx";

interface Props {
    messages: ChatMessage[];
    showSender?: boolean;
    hasMoreMessages: boolean;
    loadingMoreMessages: boolean;
    onLoadMore: () => void;
}

const MessageList = ({
    messages,
    showSender = false,
    hasMoreMessages,
    loadingMoreMessages,
    onLoadMore
}: Props) => {
    const containerRef = useRef<HTMLElement>(null);
    const topSentinelRef = useRef<HTMLDivElement>(null);

    const initialScrollDone = useRef(false);
    const wasAtBottom = useRef(true);

    const previousHeight = useRef(0);
    const previousTop = useRef(0);
    const shouldRestoreScroll = useRef(false);

    const requestingRef = useRef(false);

    const previousLastMessageId = useRef<ChatMessage["id"] | null>(null);


    useEffect(() => {
        const container = containerRef.current;
        const sentinel = topSentinelRef.current;

        if (!container || !sentinel) return;

        const observer = new IntersectionObserver(([entry]) => {

                if (!entry.isIntersecting || !initialScrollDone.current || !hasMoreMessages || loadingMoreMessages || requestingRef.current) {
                    return;
                }

                previousHeight.current = container.scrollHeight;
                previousTop.current = container.scrollTop;

                shouldRestoreScroll.current = true;
                requestingRef.current = true;

                onLoadMore();
            },
            {
                root: container,
                rootMargin: "100px 0px 0px 0px",
                threshold: 0
            }
        );

        observer.observe(sentinel);

        return () => observer.disconnect();

    }, [hasMoreMessages, loadingMoreMessages, onLoadMore]);


    useEffect(() => {
        if (!loadingMoreMessages) {
            requestingRef.current = false;
        }
    }, [loadingMoreMessages]);


    useLayoutEffect(() => {
        const container = containerRef.current;

        if (!container || messages.length === 0) return;

        const lastMessageId = messages[messages.length - 1].id;


        if (!initialScrollDone.current) {
            container.scrollTop = container.scrollHeight;

            initialScrollDone.current = true;
            wasAtBottom.current = true;
            previousLastMessageId.current = lastMessageId;

            return;
        }


        if (shouldRestoreScroll.current) {
            container.scrollTop = container.scrollHeight - previousHeight.current + previousTop.current;

            shouldRestoreScroll.current = false;
            previousLastMessageId.current = lastMessageId;

            return;
        }

        if (lastMessageId !== previousLastMessageId.current && wasAtBottom.current) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth"
            });
        }

        previousLastMessageId.current = lastMessageId;

    }, [messages]);

    const handleScroll = () => {
        const container = containerRef.current;

        if (!container) return;

        const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;

        wasAtBottom.current = distanceFromBottom <= 80;
    };

    return (
        <main ref={containerRef} onScroll={handleScroll} className="chat-message-list flex-grow-1 overflow-auto">
            <div className="chat-message-content-area">

                <div ref={topSentinelRef}/>

                {loadingMoreMessages && (
                    <div className="text-center py-2 text-secondary">
                        Đang tải tin nhắn cũ...
                    </div>
                )}

                <div className="d-flex flex-column gap-3">
                    {messages.map((message, index) => {
                        const previousMessage = messages[index - 1];

                        const showDateSeparator =
                            !previousMessage ||
                            getChatDateKey(previousMessage.createdAt) !==
                            getChatDateKey(message.createdAt);

                        const type = getChatMessageType(message.content);

                        return (
                            <div key={message.id}>
                                <ChatMessageFactory
                                    type={type}
                                    chatMessage={message}
                                    showDateSeparator={showDateSeparator}
                                    showSender={showSender}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
};

export default MessageList;