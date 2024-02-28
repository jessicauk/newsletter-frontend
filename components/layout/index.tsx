import Header from "../header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-full h-screen grid grid-flow-row auto-rows-max grid-cols-1 gap-2">
      <Header />
      <main className="flex flex-row justify-center items-center content-center w-full h-[85vh]">
        {children}
      </main>
    </div>
  );
}
