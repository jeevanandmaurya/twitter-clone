import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

async function Todos() {
  const supabase = await createClient();

  const { data: todos } = await supabase.from("todos").select("name");
  return todos ? (
    <ol>
      {todos.map((todo, index) => (
        <li key={index}>{todo.name}</li>
      ))}
    </ol>
  ) : (
    <p>No todos found.</p>
  );
}

export default function HomePage() {
  return (
    <div className="tabs">
      <div className="following">
        <h2>Following</h2>
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
          <br />
           <p>Here is a list of todos:</p>
           <Todos />
            
        </div>
      </div>
    </div>
  );
}
