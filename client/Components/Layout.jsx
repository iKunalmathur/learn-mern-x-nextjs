import Head from "next/head";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="max-w-5xl mx-auto px-4 flex flex-col justify-between min-h-screen">
      <Head>
        <title>MERN Blog</title>
      </Head>
      {children}
    </div>
  );
}
