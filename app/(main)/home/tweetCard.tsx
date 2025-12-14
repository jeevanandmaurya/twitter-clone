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

export default function TweetCard({ tweet }: { tweet: Tweet }) {
  return (
    <div className="tweet-card flex  gap-3 p-3 border-b border-gray-700">
      <Link
        href={`/${tweet.users.username}`}
        className="font-semibold hover:underline"
      >
        <div className="avatar w-10 h-10 p-1 rounded-full mt-1 p-1 align-center flex justify-center items-center bg-gray-200 text-gray-500 border-gray-400">
          {tweet.users.username.charAt(0).toUpperCase()}
        </div>
      </Link>

      <div className="tweet-content flex-1">
        <Link
          href={`/${tweet.users.username}`}
          className="font-semibold hover:underline"
        >
          {tweet.users.username}
        </Link>

        <Link href={`/${tweet.users.username}/${tweet.tweet_id}`}>
          <div className="content whitespace-pre-wrap text-lg hover:bg-gray-800/30 rounded p-1 -ml-1">
            {tweet.content}
          </div>
        </Link>
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
