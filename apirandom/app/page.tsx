import Image from "next/image";

export default async function Home() {

  const response = await fetch(`http://localhost:3000/api/randomFactImage`);
  if (!response.ok) {
    throw new Error("Failed to fetch random fact");
  }
  const { fact, image } = await response.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <Image
          src={image} // Fallback for missing image
          alt="Random fact image"
          width={180}
          height={180}
          priority
        />
        <p className="text-center sm:text-left font-[family-name:var(--font-geist-mono)] text-sm/6">
          {fact}
        </p>
      </main>
    </div>
  );
}
