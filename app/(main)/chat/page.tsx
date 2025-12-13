import Link from "next/link";

export default function ChatPage() {
  return (
    <div className="flex w-full h-full ">
      <div className="chat flex w-1/4 flex-col border-r-[1px] border-[rgba(105,105,105,0.49)] p-[10px]">
        <h2 className="h-[40px] flex items-center">Users</h2>
        <div className="user p-[10px]">user1</div>
        <div className="user p-[10px]">user2</div>
        <div className="user p-[10px]">user3</div>
        <div className="user p-[10px]">user4</div>
      </div>
      <div className="chatWindow flex flex-col w-full h-full p-[10px]">
        <h2 className="h-[40px] flex items-center p-[10px]">Chat</h2>
        <div className="chat h-full">
         
        </div>
        <input
          type="text"
          className="flex min-h-[40px] border border-gray-300 rounded-[60px] mt-[10px] m-auto w-full p-[10px]"
        />
      </div>
    </div>
  );
}
