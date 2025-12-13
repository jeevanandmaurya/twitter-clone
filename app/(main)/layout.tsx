import Link from "next/link";
import styles from "./main.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`flex w-full h-full gap-[8px]`}>
      <div id="leftPanel" className="flex flex-col w-1/4 h-full p-[16px] border-r-[1px] border-[rgba(105,105,105,0.49)]">
        <div className="menuItem">
          <Link href="/home">
            <div id="home" className={styles.item}>
              Home
            </div>
          </Link>
          <Link href="/explore">
            <div id="explore" className={styles.item}>
              Explore
            </div>
          </Link>
          <Link href="/notifications">
            <div id="notifications" className={styles.item}>
              Notifications
            </div>
          </Link>
          <Link href="/chat">
            <div id="chat" className={styles.item}>
              Chat
            </div>
          </Link>
          <Link href="/aichat">
            <div id="aichat" className={styles.item}>
              AI Chat
            </div>
          </Link>
          <Link href="/profile">
            <div id="profile" className={styles.item}>
              Profile
            </div>
          </Link>
          <Link href="/settings">
            <div id="settings" className={styles.item}>
              Settings
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-1/2 h-full border-r-[1px] border-[rgba(105,105,105,0.49)]">{children}</div>

      <div id="rightPanel" className="flex flex-col h-full p-[16px] border-r-[1px] border-[rgba(105,105,105,0.49)]">
        <div className="trending">Trending</div>
        <div className="recommended">Recommended</div>
        <div className="follow">Follow</div>
      </div>
    </div>
  );
}
