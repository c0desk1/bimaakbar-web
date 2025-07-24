import type { APIContext } from 'astro';

export async function POST({ request }: APIContext) {
    const data = await request.json();
  
    const res = await fetch("https://script.google.com/macros/s/AKfycbwO-juMj6NKMszdcNDZBK2WkSck7E8C1p_ttaRJhxrG5D3mxsKjpU77BhkUmYBW6o42/exec", {
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
  
