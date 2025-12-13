import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="flex w-full h-full ">
       
        <div className="profile flex h-full flex-col gap-4 p-[10px] ">
        <h2 className="h-1/8">Profile</h2>
        <div className="profileContent h-full" >
          <p>
            Welcome to the Profile page. Here you can view and edit your profile information.
          </p>
        </div>
      </div>
    </div>
  );
}
