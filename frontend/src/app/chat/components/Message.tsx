interface MessageProps {
    sender: string;
    text: string;
    isOwnMessage: boolean;
  }
  
  const Message = ({ sender, text, isOwnMessage }: MessageProps) => {
    return (
      <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} my-2`}>
        <div className={`p-3 rounded-lg max-w-xs ${isOwnMessage ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
          <p className="text-sm font-bold">{sender}</p>
          <p>{text}</p>
        </div>
      </div>
    );
  };
  
  export default Message;
  