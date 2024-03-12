"use client";
import "../styles/Home.module.css";
import Layout from "../components/layout";
import AppContext from "./context/app";
import Compose from "../pages/compose";

export default function Page() {
  return (
    <AppContext>
      <Layout>
        <Compose />
        {/* <div className="box-border bg-slate-200 p-8 rounded-xl shadow-2xl col-span-full w-3/4 sm:w-2/4 lg:w-2/4 xl:w-2/4 h-5/6 flex flex-col justify-evenly content-center items-center">
          <Form />
        </div> */}
      </Layout>
    </AppContext>
  );
}
