"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("");

  const createTree = () => {
    if (!text.trim()) return;
    router.push(`/generate?handle=${text}`);
  };

  return (
    <main className="bg-[#f6f6f6]">
      <section className="bg-lime-300 min-h-screen pt-20 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="flex flex-col gap-5 max-w-2xl">
          <h1 className="text-green-800 font-extrabold text-5xl md:text-7xl">
            A link in bio built for you.
          </h1>

          <p className="text-green-800 text-lg md:text-xl">
            Join 70M+ people using Linktree for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 text-black border"
              type="text"
              placeholder="Enter your Handle"
            />
            <button
              onClick={createTree}
              className="bg-pink-300 rounded-full px-6 py-3 font-semibold text-black hover:opacity-90 transition cursor-pointer"
            >
              Get started for free
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center mt-10 md:mt-0">
          <Image
            src="/home.png"
            alt="Homepage preview"
            width={500}
            height={500}
            className="w-full max-w-md object-contain"
          />
        </div>
      </section>

      <section className="bg-blue-500 min-h-screen pt-20 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="flex items-center justify-center mt-10 md:mt-0">
          <Image
            src="/section.webp"
            alt="Homepage preview"
            width={500}
            height={500}
            className="w-full max-w-md object-contain"
          />
        </div>

        <div className="flex flex-col gap-5 max-w-2xl">
          <h1 className="text-yellow-300 font-extrabold text-5xl md:text-7xl">
            Create and customize your Linktree in minutes
          </h1>

          <p className="text-white text-lg md:text-xl">
            Join 70M+ people using Linktree for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>
          <button
            onClick={createTree}
            className="bg-yellow-300 rounded-full px-6 py-3 font-semibold text-black hover:opacity-90 transition cursor-pointer w-1/2"
          >
            Get started for free
          </button>
        </div>
      </section>
    </main>
  );
}
