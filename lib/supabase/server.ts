'use server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
export async function signUpUser(formdata: FormData) {
  const supabase = await createClient();

  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;
  //Createing Authentication
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  //Creating user profile in the database
  if (!error) {
    const {data: insertData, error: insertError } = await supabase.from("users").insert({
      id: data.user?.id,
      username: email.split("@")[0],
    });
    if (insertError) {
      console.error("Error inserting user profile:", insertError);
    }
    return { data, error, insertData, insertError };
  }else{
    console.error("Error signing up user:", error);
    return { data, error};
  }

}
export async function signInUser(formdata: FormData) {
  const supabase = await createClient();
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}


export async function getCurrentUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}