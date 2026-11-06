interface Props {
    date: string;
}

export const MessageDateSeparator = ({ date }: Props) => {
    return (
        <div className="chat-date-separator">
            <span>{date}</span>
        </div>
    );
};
