export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') || '';
    const allowedOrigins = [
      'https://ylc-grap.onrender.com',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001'
    ];

    const corsHeaders = {
      'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : 'https://ylc-grap.onrender.com',
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

    if (url.pathname === '/registrations' && request.method === 'GET') {
      return handleRegistrations(env, corsHeaders);
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

    if (!['attendee', 'school'].includes(formType || '') || !payload || typeof payload !== 'object') {
      return new Response(JSON.stringify({ success: false, message: 'Invalid formType or payload' }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const requiredFields = formType === 'school'
      ? ['schoolName', 'students', 'staff', 'address']
      : ['name', 'email', 'tel'];

    const missingFields = requiredFields.filter((field) => {
      const value = payload[field];
      return value === undefined || value === null || String(value).trim() === '';
    });

    if (missingFields.length) {
      return new Response(JSON.stringify({ success: false, message: `Missing required fields: ${missingFields.join(', ')}` }), {
        status: 400,
        headers: corsHeaders
      });
    }

    if (formType === 'attendee') {
      const { email } = payload as { email?: string };
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email || '')) {
        return new Response(JSON.stringify({ success: false, message: 'Invalid email format' }), {
          status: 400,
          headers: corsHeaders
        });
      }

      const existing = await env.DB.prepare('SELECT id FROM attendees WHERE email = ?').bind(email).first();
      if (existing) {
        return new Response(JSON.stringify({ success: false, message: 'Email already registered' }), {
          status: 409,
          headers: corsHeaders
        });
      }
    }

    const result = await env.DB.prepare(
      'INSERT INTO attendees (name, email, tel, form_type, payload) VALUES (?, ?, ?, ?, ?)'
    ).bind(
      formType === 'school' ? String(payload.schoolName || '') : String(payload.name || ''),
      formType === 'school' ? null : (payload.email ? String(payload.email) : null),
      formType === 'school' ? null : (payload.tel ? String(payload.tel) : null),
      formType,
      JSON.stringify(payload)
    ).run();

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

async function handleRegistrations(env: Env, corsHeaders: Record<string, string>): Promise<Response> {
  try {
    const rows = await env.DB.prepare('SELECT id, name, email, tel, form_type, payload, created_at FROM attendees ORDER BY created_at DESC LIMIT 100').all();
    return new Response(JSON.stringify({ success: true, registrations: rows.results ?? [] }), {
      status: 200,
      headers: corsHeaders
    });
  } catch (error) {
    console.error('Registrations debug error:', error);
    return new Response(JSON.stringify({ success: false, message: 'Unable to fetch registrations' }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
