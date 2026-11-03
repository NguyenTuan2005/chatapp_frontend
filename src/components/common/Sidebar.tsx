import React from 'react';

export const Sidebar: React.FC = () => {
    return (
        <div className="w-16 bg-[#0068ff] flex flex-col items-center py-4 justify-between text-white select-none">
            <div className="flex flex-col items-center gap-6">
                <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=MyProfile"
                    alt="Avatar"
                    className="w-10 h-10 rounded-full cursor-pointer hover:opacity-90 transition border-2 border-white"
                />
                <nav className="flex flex-col gap-4">
                    <button className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 transition" title="Tin nhắn">

                    </button>
                    <button className="p-2.5 rounded-xl hover:bg-white/10 transition" title="Danh bạ">

                    </button>
                </nav>
            </div>
            <div className="flex flex-col gap-4">
                <button className="p-2.5 rounded-xl hover:bg-white/10 transition" title="Cài đặt">

                </button>
            </div>
        </div>
    );
};