export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = {
      'Access-Control-Allow-Origin': 'https://ylc-grap.onrender.com',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    const url = new URL(request.url);

    if (url.pathname === '/register') {
      if (request.method === 'POST') {
        return handleRegister(request, env, corsHeaders);
      }

      return new Response(JSON.stringify({ success: false, message: 'Method not allowed. Use POST /register.' }), {
        status: 405,
        headers: corsHeaders
      });
    }

    if ((url.pathname === '/' || url.pathname === '/health') && request.method === 'GET') {
      return new Response(JSON.stringify({ success: true, message: 'Worker is healthy' }), {
        status: 200,
        headers: corsHeaders
      });
    }

    return new Response(JSON.stringify({ success: false, message: 'Not found' }), {
      status: 404,
      headers: corsHeaders
    });
  }
};

async function handleRegister(request: Request, env: Env, corsHeaders: Record<string, string>): Promise<Response> {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return new Response(JSON.stringify({ success: false, message: 'Invalid request body' }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const { formType, payload } = body as { formType?: string; payload?: Record<string, unknown> };

    if (formType !== 'attendee' || !payload || typeof payload !== 'object') {
      return new Response(JSON.stringify({ success: false, message: 'Invalid formType or payload' }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const { name, email, tel } = payload as { name?: string; email?: string; tel?: string };

    if (!name?.trim() || !email?.trim() || !tel?.trim()) {
      return new Response(JSON.stringify({ success: false, message: 'Missing required fields: name, email, tel' }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ success: false, message: 'Invalid email format' }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // Check for duplicate email
    const existing = await env.DB.prepare('SELECT id FROM attendees WHERE email = ?').bind(email).first();
    if (existing) {
      return new Response(JSON.stringify({ success: false, message: 'Email already registered' }), {
        status: 409,
        headers: corsHeaders
      });
    }

    // Insert into database
    const result = await env.DB.prepare(
      'INSERT INTO attendees (name, email, tel, form_type, payload) VALUES (?, ?, ?, ?, ?)'
    ).bind(name, email, tel, formType, JSON.stringify(payload)).run();

    if (result.success) {
      return new Response(JSON.stringify({ success: true, message: 'Registration successful' }), {
        status: 201,
        headers: corsHeaders
      });
    } else {
      return new Response(JSON.stringify({ success: false, message: 'Database insertion failed' }), {
        status: 500,
        headers: corsHeaders
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal server error' }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
