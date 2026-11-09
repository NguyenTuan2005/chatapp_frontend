
import { Container } from 'react-bootstrap';

export function DisplayMembersRoom() {
    const groupData = {
        groupName: 'Nhom chat haha',
        members: [
            { id: 1, name: 'Member 1', avatar: 'https://i.pravatar.cc/150?img=1' },
            { id: 2, name: 'Member 2', avatar: 'https://i.pravatar.cc/150?img=2' },
            { id: 3, name: 'Member 3', avatar: 'https://i.pravatar.cc/150?img=3' },
            { id: 4, name: 'Member 4', avatar: 'https://i.pravatar.cc/150?img=4' },
            { id: 5, name: 'Member 5', avatar: 'https://i.pravatar.cc/150?img=5' },
            { id: 6, name: 'Member 6', avatar: 'https://i.pravatar.cc/150?img=6' },
            { id: 7, name: 'Member 7', avatar: 'https://i.pravatar.cc/150?img=7' },
            { id: 8, name: 'Member 8', avatar: 'https://i.pravatar.cc/150?img=8' },
            { id: 9, name: 'Member 9', avatar: 'https://i.pravatar.cc/150?img=9' },
            { id: 10, name: 'Member 10', avatar: 'https://i.pravatar.cc/150?img=10' },
        ],
    };

    return (
        <Container
            fluid
            className="d-flex flex-column align-items-center justify-content-center p-4 rounded"
            style={{ backgroundColor: '#EEF2F6', minHeight: '250px' }}
        >
            <h2
                className="fw-bold mb-4"
                style={{ color: '#0F2942', fontSize: '2rem' }}
            >
                {groupData.groupName}
            </h2>

            <div
                className="d-flex flex-wrap justify-content-center gap-3"
                style={{ maxWidth: '360px' }}
            >
                {groupData.members.map((member) => (
                    <div
                        key={member.id}
                        className="rounded-circle overflow-hidden shadow-sm"
                        style={{
                            width: '64px',
                            height: '64px',
                            border: '2px solid #D0D5DD',
                            flexShrink: 0,
                        }}
                        title={member.name}
                    >
                        <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-100 h-100 object-fit-cover"
                        />
                    </div>
                ))}
            </div>
        </Container>
    );
}