export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex w-full items-center justify-center m-auto h-full gap-4">
      {children}
    </div>
  );
}
