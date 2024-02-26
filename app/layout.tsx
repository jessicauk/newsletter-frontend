import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../styles/globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Newsletter App",
  description: "Homepage for Newsletter App",
  keywords: "newsletter, productivity, app, email, send, receive, read, write",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
