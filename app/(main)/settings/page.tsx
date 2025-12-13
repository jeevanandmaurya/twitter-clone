import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="flex w-full h-full ">
       
        <div className="settings flex h-full flex-col gap-4 p-[10px] ">
        <h2 className="h-1/8">Settings</h2>
        <div className="settingsContent h-full" >
          <p>
            Welcome to the Settings page. Here you can adjust your preferences
            and account settings.
          </p>
        </div>
      </div>
    </div>
  );
}
