import {Container, Image} from 'react-bootstrap';

export function RoomMemberList() {

    const members = [
        {id: 1, name: 'Bạn', role: 'Trưởng nhóm', isLeader: true, avatar: 'https://i.pravatar.cc/150?img=60'},
        {id: 2, name: 'Văn Hiếu', role: '', isLeader: false, avatar: 'https://i.pravatar.cc/150?img=12'},
        {id: 3, name: 'Anh Vũ', role: '', isLeader: false, avatar: 'https://i.pravatar.cc/150?img=33'},
        {id: 4, name: 'NguyenDucHuy', role: '', isLeader: false, avatar: 'https://i.pravatar.cc/150?img=68'},
        {id: 5, name: 'Thành Nhân', role: '', isLeader: false, avatar: 'https://i.pravatar.cc/150?img=15'},
        {id: 6, name: 'Trần Hữu Thêm', role: '', isLeader: false, avatar: 'https://i.pravatar.cc/150?img=53'},
        {id: 7, name: 'Văn Hiếu', role: '', isLeader: false, avatar: 'https://i.pravatar.cc/150?img=11'},
    ];

    return (
        <Container className="py-3 px-4" style={{maxWidth: '350px', backgroundColor: '#ffffff'}}>
            <h5 className="fw-bold mb-4" style={{color: '#0F2942', fontSize: '1.2rem'}}>
                Danh sách thành viên ({members.length})
            </h5>

            <div className="d-flex flex-column gap-3">
                {members.map((member) => (
                    <div key={member.id} className="d-flex align-items-center">
                        <div className="position-relative me-3" style={{width: '48px', height: '48px'}}>
                            <Image
                                src={member.avatar}
                                alt={member.name}
                                roundedCircle
                                className="w-100 h-100 object-fit-cover"
                            />
                            {/* Badge Chìa khóa dành cho Trưởng nhóm */}
                            {member.isLeader && (
                                <span
                                    className="position-absolute bottom-0 end-0 d-flex align-items-center justify-center rounded-circle border border-white"
                                    style={{
                                        backgroundColor: '#4A5568',
                                        width: '18px',
                                        height: '18px',
                                        padding: '2px',
                                        transform: 'translate(10%, 10%)'
                                    }}
                                    title="Trưởng nhóm"
                                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#ECC94B"
                      className="w-100 h-100"
                  >
                    <path
                        d="M7 14A5 5 0 1 0 7 4a5 5 0 0 0 0 10Zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm7.586-4l2-2H21v3h-2v2h-2v2h-2.414l-2-2H7v-3h7.586Z"/>
                  </svg>
                </span>
                            )}
                        </div>

                        {/* Tên & Chức vụ */}
                        <div className="d-flex flex-column justify-content-center">
              <span className="fw-bold" style={{color: '#0F2942', fontSize: '1.05rem', lineHeight: '1.2'}}>
                {member.name}
              </span>
                            {member.role && (
                                <span className="text-secondary" style={{fontSize: '0.875rem', marginTop: '2px'}}>
                  {member.role}
                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
}