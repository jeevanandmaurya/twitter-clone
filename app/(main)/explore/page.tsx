import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex w-full h-full ">
        <div className="explore flex h-full flex-col gap-4 p-[10px] ">
        <input type="text" placeholder="Search..." className="flex min-h-[40px] border border-gray-300 rounded-[60px] mt-[10px] m-auto w-full p-[10px] antialiased" />
        <h2 className="h-1/8">Explore</h2>
        <div className="exploreContent h-full" >
          <p>
            Welcome to the Explore page. Here you can discover new content and
            trends.
          </p>
        </div>
      </div>
    </div>
  );
}
