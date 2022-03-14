import Link from "next/link";
import React from "react";
import Layout from "../Components/Layout";

export default function index() {
  return (
    <div>
      <section className="min-h-screen grid place-content-center">
        <div>
          <div className="flex gap-4 justify-center items-end">
            <div className="text-6xl font-semibold text-lime-600">MERN </div>
            <div>With </div>
            <div className="bg-black text-2xl text-white px-2 font-semibold">
              Next JS
            </div>
          </div>
        </div>
        <nav className="flex gap-4 justify-center mt-8">
          <Link href="/">
            <a className="mx-2 capitalize">Home</a>
          </Link>
          <Link href="/posts">
            <a className="mx-2 capitalize">Posts</a>
          </Link>
        </nav>
      </section>
    </div>
  );
}
