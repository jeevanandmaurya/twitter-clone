"use client";
import { signUpUser } from "@/lib/supabase/server";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  function login() {
    router.push("/login");
  }

  async function createAccount() {
    console.log("Creating account...");
    const form = document.querySelector("form");
    if (form) {
      const formData = new FormData(form);
      const result = await signUpUser(formData);

      if (!result.error) {
        alert("Email verification sent! Please check your inbox.");
        router.push("/login");
      }
    }
  }

  return (
    <div className="flex flex-col w-full items-center justify-center m-auto h-full gap-4">
      <h1 className="text-2xl font-bold">Creating New Account</h1>
      <div className="flex flex-col gap-4">
        <form className="flex flex-col gap-4">
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          {/* <input type="text" placeholder="Username" name="username" /> */}
          {/* <input type="date" placeholder="Date of Birth" name="dob" /> */}
        </form>

        <button onClick={createAccount} className="p-1 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600">
          Create Account
        </button>
        <div className="flex items-center">
         <p>Already have an account?</p>
          <button onClick={login} className="px-2 m-2 rounded-full bg-blue-800 hover:bg-gray-600">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
