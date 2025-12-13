import Link from "next/link";

export default function NotificationsPage() {
  return (
    <div className="flex w-full h-full ">
        <div className="notifications flex h-full flex-col gap-4 p-[10px] ">
        <h2 className="h-1/8">Notifications</h2>
        <div className="notificationsContent h-full" >
          <p>
            Welcome to the Notifications page. Here you can see all your recent
            notifications.
          </p>
        </div>
      </div>
    </div>
  );
}
