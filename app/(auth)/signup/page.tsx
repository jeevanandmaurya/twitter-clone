"use client";

import { useRouter } from "next/navigation";

export default function SignUp() {

  const router = useRouter();
  
  
  function createAccount() {
    console.log("Creating account");
    document.cookie = "fake-auth-token=true; path=/; max-age=3600";
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex flex-col w-full items-center justify-center m-auto h-full gap-4">
      <h1 className="text-2xl font-bold">Creating New Account</h1>
      <div className="flex flex-col gap-4">
        <form action="name" className="flex flex-col gap-4">
          <input type="text" placeholder="Username" name="username" />
          <input type="password" placeholder="Password" name="password" />
          <input type="email" placeholder="Email" name="email" />
          <input type="date" placeholder="Date of Birth" name="dob" />
        </form>

        <button onClick={createAccount} className="hover:bg-gray-600">
          Create Account
        </button>
      </div>
    </div>
  );
}
