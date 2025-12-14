import { createClient } from "@/lib/supabase/server";
import TweetCard from "../home/tweetCard";
import { notFound } from "next/navigation";

type Tweet = {
  tweet_id: number;
  content: string;
  created_at: string;
  users: {
    username: string;
    avatar_url: string | null;
  };
};

// type User = {
//   user_id: string;
//   username: string;
//   avatar_url: string | null;
//   bio: string | null;
//   created_at: string;
// };

type Props = {
  params: Promise<{ username: string }>;
};

export default async function UserProfilePage({ params }: Props) {

  const { username } = await params;
  const supabase = await createClient();

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (userError || !user) {
    notFound();
  }

  const { data: tweets, error: tweetsError } = await supabase
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
    .eq("user_id", user.user_id)
    .order("created_at", { ascending: false });



    async function LoadTweets() {
      
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

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Profile Header */}
      <div className="border-b border-gray-700">
        <div className="flex flex-col justify-start items-start gap">
            <div className="cover w-full h-40  rounded-b-md">
                <svg width="100%" className="bg-gray-600"></svg>
            </div>
          <div className="avatar text-[70px] mt-[-50px] ml-4 w-35 h-35 rounded-full flex justify-center items-center bg-gray-200 text-gray-500 font-semibold">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="m-4 ml-8 text-2xl font-bold">{user.username}</h1>
            {user.bio && <p className="m-4 ml-8 text-gray-400 mt-1">{user.bio}</p>}
            <p className="m-4 ml-8 text-gray-500 text-sm mt-1">
              Joined {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* User's Tweets */}
      <div className="flex-1 ">
        <h2 className="p-3 font-semibold border-b border-gray-700">Tweets</h2>
        <LoadTweets />
      </div>
    </div>
  );
}
