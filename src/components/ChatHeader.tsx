import React from 'react';
import type {User} from "../types/chat.ts";


interface ChatHeaderProps {
    user: User;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ user }) => {
    return (
        <div className="h-16 px-4 border-b border-gray-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                <div>
                    <h3 className="font-bold text-sm text-gray-800">{user.name}</h3>
                    <span className="text-xs text-gray-500">
            {user.isOnline ? 'Vừa mới truy cập' : 'Truy cập 2 giờ trước'}
          </span>
                </div>
            </div>
            <div className="flex items-center gap-4 text-gray-600">
                <button className="hover:text-blue-600">📞</button>
                <button className="hover:text-blue-600">📹</button>
                <button className="hover:text-blue-600">🔍</button>
            </div>
        </div>
    );
};