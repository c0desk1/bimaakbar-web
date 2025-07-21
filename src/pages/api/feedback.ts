// src/pages/api/feedback.ts
export async function POST({ request }: { request: Request }) {
    const { vote, slug } = await request.json();
    console.log("Feedback diterima:", vote, "untuk:", slug);
  
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
      
    });
  }
  