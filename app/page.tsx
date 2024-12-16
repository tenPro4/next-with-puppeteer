"use client";

import Image from "next/image";
import InfoCard from "./components/info-card";

export default function Home() {
  const name = "John";
  const bio = "Singer | Actor";
  const socialLink = "https://linkedin.com/in/johndoe";
  const imageLink =
    "https://upload.wikimedia.org/wikipedia/commons/f/fc/John_Legend_2019_by_Glenn_Francis_%28cropped%29.jpg";

  const handleTakeSs = async () => {
    await fetch("/api/scraper/screenshot", {
      method: "POST",
      body: JSON.stringify({
        siteUrl: "http://localhost:3001",
      }),
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element to initiate the download
        const a = document.createElement("a");
        a.href = url;
        a.download = "ss.png";
        document.body.appendChild(a);

        // Trigger the download
        a.click();

        // Clean up the URL object
        window.URL.revokeObjectURL(url);
      });
  };

  const handleGrabPageTitle = async () => {
    await fetch("/api/scraper/basic", {
      method: "POST",
      body: JSON.stringify({
        siteUrl: "http://localhost:3001",
      }),
    });
  };

  const handleGrabUnitComponent = async () => {
    await fetch("/api/scraper/unit", {
      method: "POST",
      body: JSON.stringify({
        name,
        bio,
        socialLink,
        imageLink,
      }),
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element to initiate the download
        const a = document.createElement("a");
        a.href = url;
        a.download = "ss.png";
        document.body.appendChild(a);

        // Trigger the download
        a.click();

        // Clean up the URL object
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            onClick={handleGrabPageTitle}
            className="bg-orange-400 border-1 border-white border-solid p-4 rounded-full"
          >
            Grab Page Title
          </button>
          <button
            onClick={handleTakeSs}
            className="bg-blue-400 p-4 rounded-full"
          >
            Take Screenshot
          </button>
          <button
            onClick={handleGrabUnitComponent}
            className="bg-purple-400 p-4 rounded-full"
          >
            Grab Unit Component
          </button>
        </div>
        <InfoCard
          name={name}
          bio={bio}
          socialLink={socialLink}
          imageLink={imageLink}
        />
      </main>
    </div>
  );
}
