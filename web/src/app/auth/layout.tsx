export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return(
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {children}
    </main>
  );
}
