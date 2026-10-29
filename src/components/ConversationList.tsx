import React from 'react';
import type { Conversation } from "../types/chat";


interface ConversationListProps {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeId,
  onSelect,
}) => {
  return (
    <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
      <div className="p-3 border-b border-gray-100 flex items-center gap-2">
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="w-full px-3 py-1.5 text-sm bg-gray-100 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((item) => {
          const isActive = item.id === activeId;
          return (
            <div
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`flex items-center gap-3 p-3 cursor-pointer transition ${
                isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <img
                  src={item.user.avatar}
                  alt={item.user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {item.user.isOnline && (
                  <span className="w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full absolute bottom-0 right-0" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-semibold text-sm text-gray-800 truncate">
                    {item.user.name}
                  </h4>
                  <span className="text-xs text-gray-400">{item.updatedAt}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500 truncate">{item.lastMessage}</p>
                  {item.unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                      {item.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};