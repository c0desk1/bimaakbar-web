import type { APIContext } from 'astro';

const apiUrl = import.meta.env.PUBLIC_API_URL;

export async function POST({ request }: APIContext) {
    const data = await request.json();
  
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  
    const result = await res.text();
  
    return new Response(result, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
}