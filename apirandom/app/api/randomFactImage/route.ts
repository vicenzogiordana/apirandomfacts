import { NextRequest } from 'next/server';
 
export async function GET() {


  const data = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
  const fact = await data.json()

  return new Response(
    JSON.stringify({ 
      fact: fact.text, 
      image: `https://picsum.photos/200/300`, 
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
}