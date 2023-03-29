export type Message = {
  who: "bot" | "user" | undefined;
  message?: string;
};

export const initialMessages: Message[] = [
  {
    who: "bot",
    message: "Share your mental health concerns or ask any questions you may have. I'm here to help and provide step-by-step guidance on your emotional well-being journey!",
  },
];


export function ChatMessage({ who = "bot", message }: Message) {
  if (!message) {
    return null;
  }

  return (
    <div className={`prompt ${who != "bot" ? "right" : "left"}`}>
      <div>
        <p className="name">{who != "bot" ? "You" : "AI"}</p>
        <p className="msg">{message}</p>
      </div>
    </div>
  );
}
