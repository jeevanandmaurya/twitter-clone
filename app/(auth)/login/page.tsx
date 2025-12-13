
"use client";

import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  function signup() {
    console.log("Signing up");
    router.push("/signup");
    router.refresh();
  }

  function login() {
    console.log("Logging in");
    document.cookie = "fake-auth-token=true; path=/; max-age=3600";
    router.push("/home");
    router.refresh();
  }

  function logout() {
    console.log("Logging out");
    document.cookie = "fake-auth-token=false; path=/; max-age=0";
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex w-full items-center justify-center m-auto h-full gap-4">
      <h1 className="text-2xl font-bold">Authentication</h1>
      <div className="flex gap-4">
        <button onClick={signup}>Create Account</button>
        <button
          onClick={login}
          className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
        <button
          onClick={logout}
          className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
