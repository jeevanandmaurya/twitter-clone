"use client";

import { signInUser } from "@/lib/supabase/server";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter(); // ✅ Call hook at top level

  function signup() {
    router.push("/signup");
  }

  function login() {
    console.log("Logging in...");
    const form = document.querySelector("form");
    if (form) {
      const formData = new FormData(form);
      signInUser(formData).then((result) => {
        console.log(result);
        if (!result.error) {
          alert("Login successful!");
          router.push("/");
        } else {
          alert("Login failed: " + result.error?.message);
        }
      });
    }
  }

  return (
    <div className="flex flex-col w-full items-center justify-center m-auto h-full gap-4">
      <h1 className="text-2xl font-bold">Authentication</h1>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <form className="flex flex-col gap-4">
            <input type="email" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            {/* <input type="text" placeholder="Username" name="username" /> */}
            {/* <input type="date" placeholder="Date of Birth" name="dob" /> */}
          </form>

          <button
            onClick={login}
            className="p-1 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </div>
        <button
          onClick={signup}
          className="p-1 cursor-pointer bg-gray-900 rounded hover:bg-blue-400"
        >
          Create Account
        </button>
        <br />
        <br />
      </div>
    </div>
  );
}
