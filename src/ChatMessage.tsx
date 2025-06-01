const ChatMessage = ({
  message,
  fromWhom,
}: {
  message: string;
  fromWhom: "domocup" | "user";
}) => (
  <div
    className={`${fromWhom === "domocup" ? "domocup-message" : "user-message"}`}
  >
    <p className="message-text">
      {message}
    </p>
  </div>
);

export default ChatMessage;
