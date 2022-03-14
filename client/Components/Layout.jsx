import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="max-w-5xl mx-auto px-4 flex flex-col justify-between min-h-screen">
      <Head>
        <title>MERN Blog</title>
      </Head>
      <header className="flex justify-between flex-wrap py-8 mb-12">
        <div>
          <div>
            <span className="text-4xl font-semibold text-lime-600">MERN </span>

            <span>With </span>
            <span className="bg-black text-white px-2 font-semibold">
              Next JS
            </span>
          </div>
        </div>
        <nav className="flex gap-4">
          <Link href="/">
            <a className="mx-2 capitalize">Home</a>
          </Link>
          <Link href="/posts">
            <a className="mx-2 capitalize">Posts</a>
          </Link>
        </nav>
      </header>
      {children}
      <footer className="mt-auto py-6">v1.0.0</footer>
    </div>
  );
}
