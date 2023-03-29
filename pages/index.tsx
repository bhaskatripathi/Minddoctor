import { ChatBox } from "../components/chat-box";

function Home() {
  return (
    <div className="background">
      <div className="wrapper">
        <section>
          <h1>Mind-Doctor</h1>
          <p>
            ...your AI-powered mental health assistant designed to provide insights, guidance, and support for your emotional well-being journey.
          </p>
        </section>
        <section>
          <ChatBox />
        </section>
      </div>
    </div>
  );
}

export default Home;
