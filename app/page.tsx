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
      </Layout>
    </AppContext>
  );
}
