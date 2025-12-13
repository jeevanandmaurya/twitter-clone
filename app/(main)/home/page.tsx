import Link from "next/link";

export default function HomePage() {
  return (
    <div className="tabs">
      <div className="following">
        <h2 >Following</h2>
        <hr />
        <div id="tweet0" className="tweet">
          <Link href="/profile/user2">User2</Link>
          <p>This is the first tweet.</p>
        </div>

        <div id="tweet1" className="tweet">
          <Link href="/profile/user2">User2</Link>
          <p>This is the Second tweet.</p>
        </div>
        <div id="tweet1" className="tweet">
          <Link href="/profile/user3">User3</Link>
          <p>This is the Third tweet.</p>
        </div>


      </div>
    </div>
  );
}
