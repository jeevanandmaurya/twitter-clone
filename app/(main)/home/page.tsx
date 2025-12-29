
import { revalidatePath } from "next/cache";
import TweetCard from "./tweetCard";
import { createClient } from "@/lib/supabase/server";


type Tweet = {
  tweet_id: number;
  content: string;
  created_at: string;
  users: {
    username: string;
    avatar_url: string | null;
  };
};


type TweetPost = {
  tweet_id: number;
  user_id: string;
  content: string;
  created_at: string;
};

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

async function postTweet(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const content = formData.get("content") as string;
  if (!content?.trim()) return;

  const result = await supabase.from("tweets").insert([
    {
      user_id: "deff5f06-1844-44e8-b5b0-569eb9657604",
      content: content,
    },
  ]);
  console.log("Tweet post status", result);
  if (result.error) {
    console.error("Error posting tweet:", result.error);
  } else {
    console.log("Tweet posted successfully:", result.data);
    revalidatePath("/home"); // Refresh the page to show new tweet
  }
}

export default function HomePage() {
  console.log("Rendering HomePage"); // Log when HomePage is rendered

  return (
    <div className="tabs relative boxsizing-border flex flex-col h-full">
      <div className="fixed top-0 left-1/4 w-1/2 h-15 bg-[rgba(0,0,0,0.8)] backdrop-blur-sm ">

        <h4 className="m-2 relative border-b-5 rounded w-max border-blue-600">Following</h4>

      </div>
        <div className="following h-full overflow-y-auto ">
          <div className="postTweet mt-15  flex gap-3 p-3 border-b border-gray-700">
            <div className="avatar w-10 h-10 p-1 rounded-full mt-1 p-1 align-center flex justify-center items-center bg-gray-200 text-gray-500 border-gray-400">
              J
            </div>

            <form action={postTweet} className="flex-1">
              <div className="flex flex-col w-full">
                <textarea
                  name="content"
                  id="postTweetContent"
                  className="w-full p-2 focus:border focus:row-3 border-gray-300 rounded-md resize-none"
                  placeholder="What's happening?"
                  maxLength={280}
                ></textarea>
              </div>

              <div className="actions flex justify-end mt-2">
                <button
                  type="submit"
                  className="post-button text-sm  font-semibold bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 cursor-pointer"
                >
                  Post
                </button>
              </div>
            </form>
          </div>

          <div className="tweets">
            <LoadTweets />
          </div>
        </div>
      </div>
  );
}
