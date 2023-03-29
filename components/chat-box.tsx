import { useEffect, useState } from "react";
import { type Message, initialMessages, ChatMessage } from "./chat-message";
import { useCookies } from "react-cookie";

const COOKIE_NAME = "next-openai-chatgpt";

const PreLoader = () => (
  <div className="prompt left">
    <p className="name">AI</p>
    <div className="loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

const InputMessage = ({ input, setInput, sendMessage }: any) => (
  <div className="question">
    <input
      type="text"
      aria-label="chat input"
      required
      value={input}
      placeholder="Type your mental health problem here to start the conversation"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage(input);
          setInput("");
        }
      }}
      onChange={(e) => {
        setInput(e.target.value);
      }}
    />
    <button
      type="submit"
      onClick={() => {
        sendMessage(input);
        setInput("");
      }}
    >
      Ask
    </button>
  </div>
);

interface SuggestedQuestionsProps {
  sendMessage: (message: string) => void;
}
const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ sendMessage }) => {

  const questions = [
    "How can I cope with anxiety or stress?",
    "What are some effective ways to manage depression?",
    "How do I know if I need to seek professional help for my mental health?",
  ];

  return (
    <div className="suggested-questions">
      {questions.map((question, index) => (
        <button
          key={index}
          onClick={() => {
            sendMessage(question);
          }}
        >
          {question}
        </button>
      ))}
    </div>
  );
};

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, [cookie, setCookie]);

  const sendMessage = async (message: string) => {
    setLoading(true);

    const newMessages = [
      ...messages,
      { message: message, who: "user" } as Message,
    ];
    setMessages(newMessages);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: newMessages,
        user: cookie[COOKIE_NAME],
      }),
    });

    const data = await response.json();

    setMessages([
      ...newMessages,
      { message: data.text.trim(), who: "bot" } as Message,
    ]);

    setLoading(false);
  };

  return (
    <div className="dialogue">
      {messages.map(({ message, who }, index) => (
        <ChatMessage key={index} who={who} message={message} />
      ))}

      {loading && <PreLoader />}

      <InputMessage
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </div>
  );
}
