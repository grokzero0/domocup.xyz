import { SendHorizontal } from "lucide-react";
import "./App.css";
import picture from "./assets/domocup.png";
import { useState } from "react";
import ChatMessage from "./ChatMessage";

function App() {
  const [message, setMessage] = useState("");
  const [formDisabled, setFormDisabled] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    { message: string; from: "user" | "domocup" }[]
  >([
    {
      message: "what do you want",
      from: "domocup",
    },
  ]);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const m = message;
    setChatHistory((c) => [...c, { message: m, from: "user" }]);
    setFormDisabled(true);
    setMessage("");
    setTimeout(() => {
      setChatHistory((c) => [
        ...c,
        { message: "thinking...", from: "domocup" },
      ]);
    }, 500);

    setTimeout(() => {
      setChatHistory((chat) => chat.filter((c) => c.message !== "thinking..."));
      if (m.includes("domo cup")) {
        setChatHistory((c) => [
          ...c,
          { message: "ok with extra sugar", from: "domocup" },
        ]);
      } else {
        setChatHistory((c) => [
          ...c,
          { message: "ok fuck off then", from: "domocup" },
        ]);
      }
    }, 1000);
  };
  // console.log(chatHistory);
  return (
    <div className="container-container">
      <div className="container">
        <div className="chatbot-header">
          <h2
            style={{
              textAlign: "center",
              color: "#181825",
            }}
          >
            Domo Cup
          </h2>
          <img src={picture} width={200} height={150} />
        </div>
        <div className="chat">
          {chatHistory.map((message) => (
            <ChatMessage
              key={message.message}
              message={message.message}
              fromWhom={message.from}
            ></ChatMessage>
          ))}
        </div>

        <div className="chatbot-form-container">
          <form className="chatbot-form" onSubmit={(e) => onSubmit(e)}>
            <input
              disabled={formDisabled}
              placeholder="type a message"
              value={message}
              onChange={(e) => setMessage(e.currentTarget.value)}
            ></input>
            <button disabled={formDisabled}>
              <SendHorizontal />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
