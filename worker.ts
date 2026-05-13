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

      const result = await env.DB.prepare(
        'INSERT INTO attendees (name, email, tel, institution, position, payload) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(
        String(payload.name || ''),
        String(payload.email || ''),
        String(payload.tel || ''),
        payload.institution ? String(payload.institution) : null,
        payload.position ? String(payload.position) : null,
        JSON.stringify(payload)
      ).run();

      if (result.success) {
        return new Response(JSON.stringify({ success: true, message: 'Attendee registration successful' }), {
          status: 201,
          headers: corsHeaders
        });
      } else {
        return new Response(JSON.stringify({ success: false, message: 'Database insertion failed' }), {
          status: 500,
          headers: corsHeaders
        });
      }
    } else if (formType === 'school') {
      const result = await env.DB.prepare(
        'INSERT INTO schools (school_name, students, staff, address, contact_name, contact_email, contact_phone, payload) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      ).bind(
        String(payload.schoolName || ''),
        parseInt(String(payload.students || '0')),
        parseInt(String(payload.staff || '0')),
        String(payload.address || ''),
        payload.contactName ? String(payload.contactName) : null,
        payload.contactEmail ? String(payload.contactEmail) : null,
        payload.contactPhone ? String(payload.contactPhone) : null,
        JSON.stringify(payload)
      ).run();

      if (result.success) {
        return new Response(JSON.stringify({ success: true, message: 'School registration successful' }), {
          status: 201,
          headers: corsHeaders
        });
      } else {
        return new Response(JSON.stringify({ success: false, message: 'Database insertion failed' }), {
          status: 500,
          headers: corsHeaders
        });
      }
    } else {
      // This should never be reached due to validation above, but TypeScript requires it
      return new Response(JSON.stringify({ success: false, message: 'Invalid form type' }), {
        status: 400,
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
    const attendees = await env.DB.prepare('SELECT id, name, email, tel, institution, position, payload, created_at, \'attendee\' as type FROM attendees ORDER BY created_at DESC').all();
    const schools = await env.DB.prepare('SELECT id, school_name as name, contact_email as email, contact_phone as tel, students, staff, address, payload, created_at, \'school\' as type FROM schools ORDER BY created_at DESC').all();

    const allRegistrations = [
      ...(attendees.results ?? []).map((row: any) => ({ ...row, form_type: 'attendee' })),
      ...(schools.results ?? []).map((row: any) => ({ ...row, form_type: 'school' }))
    ].sort((a, b) => new Date((b as any).created_at as string).getTime() - new Date((a as any).created_at as string).getTime());

    return new Response(JSON.stringify({ success: true, registrations: allRegistrations }), {
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
