
const ChatHeader = () => {
    return (
        <header className="chat-header d-flex align-items-center justify-content-between px-4">

            <div className="d-flex align-items-center gap-3">
                <div className="chat-user-avatar">
                    T
                    <span className="chat-online-indicator"></span>
                </div>

                <div>
                    <h6 className="mb-1 fw-semibold">
                        Ti Nguyễn
                    </h6>

                    <small className="text-muted">
                        Đang hoạt động
                    </small>
                </div>
            </div>

            <div className="d-flex align-items-center gap-2">

                <button className="btn btn-link chat-action-btn" title="Tìm kiếm">
                    <i className="bi bi-search"></i>
                </button>

                <button className="btn btn-link chat-action-btn" title="Tùy chọn">
                    <i className="bi bi-three-dots"></i>
                </button>

            </div>
        </header>
    );
};

export default ChatHeader;
