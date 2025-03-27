'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
export default function Home() {
  const [fact, setFact] = useState(null);
  const [image, setImage] = useState(null);
  // const response = await fetch(`http://localhost:3000/api/randomFactImage`);
  // if (!response.ok) {
  //   throw new Error("Failed to fetch random fact");
  // }
  // const { fact, image } = await response.json();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/api/randomFactImage`);
      if (!response.ok) {
        throw new Error("Failed to fetch random fact");
      }
      const { fact, image } = await response.json();
      setFact(fact);
      setImage(image);
    };
    fetchData();
  }, []);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <Image
          key={image} // Force re-render when image changes
          src={image || "/placeholder.png"} // Fallback for missing image
          alt="Random fact image"
          width={180}
          height={180}
          priority
        />
        <p className="text-center sm:text-left font-[family-name:var(--font-geist-mono)] text-sm/6">
          {fact}
        </p>
        <button
          onClick={async () => {
            const response = await fetch(`http://localhost:3000/api/randomFactImage`);
            if (!response.ok) {
              throw new Error("Failed to fetch random fact");
            }
            const { fact, image } = await response.json();
            setFact(fact);
            setImage(image);
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Get New Fact
        </button>
      </main>
    </div>
  );
}
