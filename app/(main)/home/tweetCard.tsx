import Link from "next/link";

type Tweet = {
  tweet_id: number;
  content: string;
  created_at: string;
  users: {
    username: string;
    avatar_url: string | null;
  };
};
//Add optional param that states where tweet is loaded as list or single view
export default function TweetCard(
  { tweet }: { tweet: Tweet },
  singleView?: boolean
) {

  let marginClass = singleView ? "" : "ml-10";

  return (
    <div className="tweet-card  w-full flex flex-col gap-3 p-3 border-b border-gray-700">
      <div className="userinfo flex gap-3 text-center items-center">
        <Link
          href={`/${tweet.users.username}`}
          className="font-semibold hover:underline"
        >
          <div className="avatar w-10 h-10 p-1 rounded-full mt-1 p-1 align-center flex justify-center items-center bg-gray-200 text-gray-500 border-gray-400">
            {tweet.users.username.charAt(0).toUpperCase()}
          </div>
        </Link>
        <Link
          href={`/${tweet.users.username}`}
          className="font-semibold hover:underline"
        >
          {tweet.users.username}
        </Link>
      </div>

      <div className={`tweetContent ${marginClass}`}>
        <Link href={`/${tweet.users.username}/${tweet.tweet_id}`}>
          <div className="content whitespace-pre-wrap text-lg hover:bg-gray-800/30 rounded">
            {tweet.content}
          </div>
        </Link>
      </div>

      <div className={`tweetStats ${marginClass}`}>
        <div className="created-at text-xs text-gray-500">
          {new Date(tweet.created_at).toLocaleString()}
        </div>
        <div className="actions flex gap-4 mt-2">
          <button className="like-button text-sm text-blue-500 hover:underline">
            Like {14}
          </button>
          <button className="comment-button text-sm text-blue-500 hover:underline">
            Comments {3}
          </button>
        </div>
      </div>
    </div>
  );
}
