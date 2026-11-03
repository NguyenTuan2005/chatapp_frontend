// import {useState} from "react";


import {RoomInfoSidebar} from "./RoomInfoSidebar.tsx";
import {RoomHeader} from "./RoomHeader.tsx";
import {useState} from "react";

export function RoomConversation() {

    // const [showSidebar, setShowSidebar] = useState(true);
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="d-flex w-100 vh-100 overflow-hidden bg-light">

            <div className="d-flex flex-column flex-grow-1 h-100 border-end overflow-hidden">

                <div className="flex-shrink-0 bg-white border-bottom">
                    <RoomHeader isExpanded={expanded} onToggle={() => setExpanded((v) => !v)} />
                </div>

                {/* MOCK data */}
                <div className="flex-grow-1 overflow-y-auto p-3" style={{ backgroundColor: '#EBF2F7' }}>
                    {/* Mock tin nhắn 1 */}
                    <div className="d-flex align-items-start gap-2 mb-3">
                        <img src="https://i.pravatar.cc/150?img=12" className="rounded-circle" width={36} height={36} alt="avatar" />
                        <div>
                            <div className="bg-white p-2.5 rounded-3 shadow-sm border" style={{ maxWidth: '420px' }}>
                                <small className="fw-bold text-dark d-block mb-1">Nguyễn Đức Dũng</small>
                                <p className="mb-0 text-dark">
                                    <span className="text-primary fw-medium">@Huỳnh Thị Thảo Vy</span> chú treo cổng r nha bạn
                                </p>
                            </div>
                            <small className="text-muted ms-1" style={{ fontSize: '0.75rem' }}>12:31</small>
                        </div>
                    </div>

                    {/* Mock tin nhắn Reply */}
                    <div className="d-flex align-items-start gap-2 mb-3">
                        <img src="https://i.pravatar.cc/150?img=33" className="rounded-circle" width={36} height={36} alt="avatar" />
                        <div>
                            <div className="bg-white p-2.5 rounded-3 shadow-sm border" style={{ maxWidth: '420px' }}>
                                <small className="fw-bold text-dark d-block mb-1">Cẩm Hương</small>
                                <div className="p-2 mb-2 rounded bg-light border-start border-primary border-3" style={{ fontSize: '0.85rem' }}>
                                    <span className="fw-bold text-secondary d-block">Thảo Vy</span>
                                    <span className="text-muted">Lấy con 1 bún riêu (rau trụng), treo Cỏ May</span>
                                </div>
                                <p className="mb-0 text-dark">
                                    <span className="text-primary fw-medium">@Huỳnh Thị Thảo Vy</span> chư đang ra con
                                </p>
                            </div>
                            <small className="text-muted ms-1" style={{ fontSize: '0.75rem' }}>12:32</small>
                        </div>
                    </div>

                    <div className="text-center my-3">
                    <span className="badge bg-secondary-subtle text-secondary px-3 py-1 rounded-pill fw-normal" style={{ fontSize: '0.75rem' }}>
                      14:00 Hôm nay
                    </span>
                    </div>

                    <div className="d-flex align-items-start gap-2 mb-3">
                        <img src="https://i.pravatar.cc/150?img=12" className="rounded-circle" width={36} height={36} alt="avatar" />
                        <div>
                            <div className="bg-white p-2.5 rounded-3 shadow-sm border" style={{ maxWidth: '420px' }}>
                                <small className="fw-bold text-dark d-block mb-1">Nguyễn Đức Dũng</small>
                                <p className="mb-0 text-dark">Quán nghỉ trưa tới 16h ạ</p>
                            </div>
                            <small className="text-muted ms-1" style={{ fontSize: '0.75rem' }}>14:00</small>
                        </div>
                    </div>
                </div>

                <div className="bg-white border-top p-2 flex-shrink-0">
                    <div className="d-flex align-items-center gap-2 px-2 py-1 text-secondary">
                    </div>
                    <div className="d-flex align-items-center px-2 py-1">
                        <input
                            type="text"
                            className="form-control border-0 shadow-none px-1"
                            placeholder="Nhập @, tin nhắn tới Quán cơm Cô Hương"
                            style={{ fontSize: '0.95rem' }}
                        />
                        <button className="btn btn-link text-primary p-1 border-0 ms-2">
                            hehe
                        </button>
                    </div>
                </div>
            </div>

            <RoomInfoSidebar/>
        </div>
    );
}