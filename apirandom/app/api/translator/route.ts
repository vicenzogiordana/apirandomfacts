import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()

    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|es`
    )

    if (!response.ok) {
      console.error("Error de MyMemory:", await response.text())
      return new Response(JSON.stringify({ error: 'Error con MyMemory API' }), { status: 500 })
    }

    const data = await response.json()
    const translatedText = data.responseData.translatedText

    return new Response(JSON.stringify({ translatedText }), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (err) {
    console.error("Error en /translator:", err)
    return new Response(JSON.stringify({ error: 'Error interno' }), { status: 500 })
  }
}
