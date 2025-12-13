import Link from "next/link";

export default function AIChatPage() {
  return (
    <div className="aichat flex w-full h-full flex-col gap-4 p-[10px]">
      <h2 className="h-1/8">AI Chat</h2>
      <div className="chat h-full" >
        <p>
          Welcome to the AI Chat page. Here you can interact with our AI-powered
          chat system.
        </p>
      </div>
      <input
        type="text"
        className="flex h-1/5 border border-gray-300 rounded-md p-2"
      />
    </div>
  );
}
