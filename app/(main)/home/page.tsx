import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

import TweetCard from "./tweetCard";

// async function Todos() {
//   const supabase = await createClient();

//   const { data: todos, error } = await supabase.from("todos").select("name");

//   console.log("Todos data:", todos);
//   if (error) console.error("Todos error:", error);

//   return todos ? (
//     <ol>
//       {todos.map((todo, index) => (
//         <li key={index}>{todo.name}</li>
//       ))}
//     </ol>
//   ) : (
//     <p>No todos found.</p>
//   );
// }

type Tweet = {
  tweet_id: number;
  content: string;
  created_at: string;
  users: {
    username: string;
    avatar_url: string | null;
  };
};

async function Tweets() {
  const supabase = await createClient();

  const { data: tweets, error } = await supabase
    .from("tweets")
    .select(
      `
      tweet_id,
      content,
      created_at,
      users (
        username,
        avatar_url
      )
    `
    )
    .order("created_at", { ascending: false });

  console.log("Tweets data:", tweets);
  if (error) console.error("Tweets error:", error);

  if (error) {
    return <p>Error loading tweets: {error.message}</p>;
  }

  return tweets ? (
    <div>
      {tweets.map((tweet) => (
        <TweetCard key={tweet.tweet_id} tweet={tweet as unknown as Tweet} />
      ))}
    </div>
  ) : (
    <p>No tweets found.</p>
  );
}

export default function HomePage() {
  console.log("Rendering HomePage"); // Log when HomePage is rendered

  return (
    <div className="tabs relative boxsizing-border flex flex-col h-full">
      <div className="p-2 fixed top-0 left-1/4 w-1/2 h-10 bg-[rgba(0,0,0,0.8)] backdrop-blur-sm ">
      <h2 className="border-b w-max border-blue-600">Following</h2></div>
      <div className="following scrollable-y overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
        <div className="postTweet mt-10 flex gap-3 p-3 border-b border-gray-700">
          <div className="avatar w-10 h-10 p-1 rounded-full mt-1 p-1 align-center flex justify-center items-center bg-gray-200 text-gray-500 border-gray-400">J</div>
          <div className="input flex-1 ">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              placeholder="What's happening?"
              rows={3}
            ></textarea>
            <div className="actions flex justify-end mt-2">
              <button className="post-button bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600">
                Post
              </button>
            </div>
          </div>
        </div>
        <div className="tweets max-h-96">
          <Tweets />
        </div>
        <br />
        {/* <div className="todos">
          <p>Here is a list of todos from supabase:</p>
          <Todos />
        </div> */}
      </div>
    </div>
  );
}
