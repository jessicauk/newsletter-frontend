"use client";
import Form from "@/../../components/form";

export default function Page() {
  return (
    <main className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-full h-screen flex flex-row justify-center items-center">
      <div className="bg-slate-200 shadow-2xl col-span-full w-3/4 flex flex-col justify-evenly content-center items-center">
        <h2 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight sm:text-4xl">
          Send Newsletter.
        </h2>
        <Form />
      </div>
    </main>
  );
}
