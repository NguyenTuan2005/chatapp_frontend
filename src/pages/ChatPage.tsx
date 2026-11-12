
import "../styles/chat.css";
import ChatConversation from "../components/chat/ChatConversation.tsx";

const ChatPage = () => {
    return (
        <main className="chat-page">
            <ChatConversation />
        </main>
    );
};

export default ChatPage;