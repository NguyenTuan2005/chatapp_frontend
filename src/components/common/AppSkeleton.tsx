function SkeletonBox({ w, h, circle = false, className = "" }: {
    w?: number | string;
    h?: number | string;
    circle?: boolean;
    className?: string;
}) {
    return (
        <div
            className={`skeleton ${circle ? "skeleton-circle" : ""} ${className}`}
            style={{ width: w, height: h }}
        />
    );
}

function ConversationItemSkeleton() {
    return (
        <div className="d-flex align-items-center gap-3 px-3 py-3 border-bottom">
            <SkeletonBox w={48} h={48} circle />
            <div className="flex-grow-1">
                <SkeletonBox w="60%" h={14} className="mb-2" />
                <SkeletonBox w="35%" h={12} />
            </div>
        </div>
    );
}

function MessageSkeleton({ width }: { width: string }) {
    return (
        <div className="d-flex gap-2 mb-4">
            <SkeletonBox w={36} h={36} circle />
            <div style={{ width }}>
                <SkeletonBox w="100%" h={56} className="rounded-3" />
            </div>
        </div>
    );
}

export default function AppSkeleton() {
    return (
        <div className="d-flex vh-100 overflow-hidden">
            <div className="border-end bg-white" style={{ width: 300 }}>
                <div className="p-3 border-bottom">
                    <SkeletonBox w="70%" h={24} />
                </div>
                {Array.from({ length: 7 }).map((_, i) => (
                    <ConversationItemSkeleton key={i} />
                ))}
            </div>

            <div className="flex-grow-1 d-flex flex-column">
                <div className="d-flex align-items-center gap-3 p-3 border-bottom bg-white">
                    <SkeletonBox w={56} h={56} circle />
                    <div className="flex-grow-1">
                        <SkeletonBox w={200} h={18} className="mb-2" />
                        <SkeletonBox w={140} h={14} />
                    </div>
                </div>

                <div className="flex-grow-1 p-3 chat-bg">
                    <MessageSkeleton width="40%" />
                    <MessageSkeleton width="55%" />
                    <MessageSkeleton width="30%" />
                </div>

                <div className="p-3 bg-white border-top">
                    <SkeletonBox w="100%" h={40} className="rounded-2" />
                </div>
            </div>

            <div className="border-start bg-white d-none d-xl-block p-3" style={{ width: 360 }}>
                <SkeletonBox w="50%" h={22} className="mb-4" />
                <div className="d-flex justify-content-center mb-3">
                    <SkeletonBox w={80} h={80} circle />
                </div>
                <div className="d-flex justify-content-center mb-4">
                    <SkeletonBox w="70%" h={20} />
                </div>
                <div className="d-flex justify-content-around mb-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <SkeletonBox key={i} w={40} h={40} circle />
                    ))}
                </div>
                <SkeletonBox w="100%" h={16} className="mb-3" />
                <SkeletonBox w="80%" h={16} className="mb-3" />
                <SkeletonBox w="90%" h={16} />
            </div>
        </div>
    );
}