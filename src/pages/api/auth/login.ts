import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies }) => {
  const { password } = await request.json();

  if (password !== import.meta.env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ ok: false }), { status: 401 });
  }

  cookies.set('admin', '1', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    secure: import.meta.env.PROD,
  });

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
