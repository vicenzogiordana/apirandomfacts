'use client'
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Home() {
  const [fact, setFact] = useState(null)
  const [image, setImage] = useState(null)
  const [translatedFact, setTranslatedFact] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/randomFactImage`)
      if (!response.ok) throw new Error("Failed to fetch random fact")
      const { fact, image } = await response.json()
      setFact(fact)
      setImage(image)
      setTranslatedFact(null)
    }
    fetchData()
  }, [])

  const translateFact = async () => {
    const res = await fetch('/api/translator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: fact }),
    })

    const data = await res.json()
    if (data.translatedText) {
      setTranslatedFact(data.translatedText)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen p-8 gap-8 sm:p-20">
      <main className="flex flex-col gap-8 items-center">

        <Image
          key={image}
          src={image || "/placeholder.png"}
          alt="Random fact image"
          width={200}
          height={200}
          priority
        />

        <p className="text-sm font-mono max-w-xl">{fact}</p>

        {translatedFact && (
          <p className="text-green-600 text-sm font-semibold max-w-xl">
            Traducción: {translatedFact}
          </p>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={async () => {
              const response = await fetch(`/api/randomFactImage`)
              const { fact, image } = await response.json()
              setFact(fact)
              setImage(image)
              setTranslatedFact(null)
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Get New Fact
          </button>

          <button
            disabled={!fact}
            onClick={translateFact}
            className={`px-4 py-2 rounded text-white ${
              fact ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Translate Fact
          </button>
        </div>

      </main>
    </div>
  )
}
