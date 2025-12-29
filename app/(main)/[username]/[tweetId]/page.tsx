import { createClient } from "@/lib/supabase/server";
import TweetCard from "../../home/tweetCard";

type Tweet = {
  tweet_id: number;
  content: string;
  created_at: string;
  users: {
    username: string;
    avatar_url: string | null;
  };
};

type Props = {
  params: Promise<{ username: string; tweetId: string }>;
};

export default async function TweetPage({ params }: Props) {
  const { username, tweetId } = await params;
  const supabase = await createClient();

  async function LoadTweet() {
    // const supabase = await createClient();

    const { data: tweet, error } = await supabase
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
      .eq("tweet_id", tweetId)
      .single();

    console.log("Tweets data:", tweet);
    if (error) console.error("Tweets error:", error);

    if (error) {
      return <p>Error loading tweets: {error.message}</p>;
    }

    return tweet ? (
      <div>
        <TweetCard tweet={tweet as unknown as Tweet}  />
      </div>
    ) : (
      <p>No tweets found.</p>
    );
  }
  async function LoadComments() {
    return(
      <TweetCard tweet={{
        tweet_id: 1,
        content: "This is a comment",
        created_at: new Date().toISOString(),
        users: {
          username: "commenter",
          avatar_url: null,
        },
      }} />)
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="Tweet border-b border-gray-700 p-3">
        <LoadTweet />
      </div>
      <div className="Comments flex overflow-y-auto p-3">
        <LoadComments />
      </div>
    </div>
  );
}
