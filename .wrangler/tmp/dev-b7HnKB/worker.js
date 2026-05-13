var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker.ts
var worker_default = {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowedOrigins = [
      "https://ylc-grap.onrender.com",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001"
    ];
    const corsHeaders = {
      "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "https://ylc-grap.onrender.com",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json"
    };
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }
    const url = new URL(request.url);
    if (url.pathname === "/register") {
      if (request.method === "POST") {
        return handleRegister(request, env, corsHeaders);
      }
      return new Response(JSON.stringify({ success: false, message: "Method not allowed. Use POST /register." }), {
        status: 405,
        headers: corsHeaders
      });
    }
    if (url.pathname === "/registrations" && request.method === "GET") {
      return handleRegistrations(env, corsHeaders);
    }
    if ((url.pathname === "/" || url.pathname === "/health") && request.method === "GET") {
      return new Response(JSON.stringify({ success: true, message: "Worker is healthy" }), {
        status: 200,
        headers: corsHeaders
      });
    }
    return new Response(JSON.stringify({ success: false, message: "Not found" }), {
      status: 404,
      headers: corsHeaders
    });
  }
};
async function handleRegister(request, env, corsHeaders) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return new Response(JSON.stringify({ success: false, message: "Invalid request body" }), {
        status: 400,
        headers: corsHeaders
      });
    }
    const { formType, payload } = body;
    if (!["attendee", "school"].includes(formType || "") || !payload || typeof payload !== "object") {
      return new Response(JSON.stringify({ success: false, message: "Invalid formType or payload" }), {
        status: 400,
        headers: corsHeaders
      });
    }
    const requiredFields = formType === "school" ? ["schoolName", "students", "staff", "address"] : ["name", "email", "tel"];
    const missingFields = requiredFields.filter((field) => {
      const value = payload[field];
      return value === void 0 || value === null || String(value).trim() === "";
    });
    if (missingFields.length) {
      return new Response(JSON.stringify({ success: false, message: `Missing required fields: ${missingFields.join(", ")}` }), {
        status: 400,
        headers: corsHeaders
      });
    }
    if (formType === "attendee") {
      const { email } = payload;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email || "")) {
        return new Response(JSON.stringify({ success: false, message: "Invalid email format" }), {
          status: 400,
          headers: corsHeaders
        });
      }
      const existing = await env.DB.prepare("SELECT id FROM attendees WHERE email = ?").bind(email).first();
      if (existing) {
        return new Response(JSON.stringify({ success: false, message: "Email already registered" }), {
          status: 409,
          headers: corsHeaders
        });
      }
      const result = await env.DB.prepare(
        "INSERT INTO attendees (name, email, tel, institution, position, payload) VALUES (?, ?, ?, ?, ?, ?)"
      ).bind(
        String(payload.name || ""),
        String(payload.email || ""),
        String(payload.tel || ""),
        payload.institution ? String(payload.institution) : null,
        payload.position ? String(payload.position) : null,
        JSON.stringify(payload)
      ).run();
      if (result.success) {
        return new Response(JSON.stringify({ success: true, message: "Attendee registration successful" }), {
          status: 201,
          headers: corsHeaders
        });
      } else {
        return new Response(JSON.stringify({ success: false, message: "Database insertion failed" }), {
          status: 500,
          headers: corsHeaders
        });
      }
    } else if (formType === "school") {
      const result = await env.DB.prepare(
        "INSERT INTO schools (school_name, students, staff, address, contact_name, contact_email, contact_phone, payload) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      ).bind(
        String(payload.schoolName || ""),
        parseInt(String(payload.students || "0")),
        parseInt(String(payload.staff || "0")),
        String(payload.address || ""),
        payload.contactName ? String(payload.contactName) : null,
        payload.contactEmail ? String(payload.contactEmail) : null,
        payload.contactPhone ? String(payload.contactPhone) : null,
        JSON.stringify(payload)
      ).run();
      if (result.success) {
        return new Response(JSON.stringify({ success: true, message: "School registration successful" }), {
          status: 201,
          headers: corsHeaders
        });
      } else {
        return new Response(JSON.stringify({ success: false, message: "Database insertion failed" }), {
          status: 500,
          headers: corsHeaders
        });
      }
    } else {
      return new Response(JSON.stringify({ success: false, message: "Invalid form type" }), {
        status: 400,
        headers: corsHeaders
      });
    }
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(JSON.stringify({ success: false, message: "Internal server error" }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
__name(handleRegister, "handleRegister");
async function handleRegistrations(env, corsHeaders) {
  try {
    const attendees = await env.DB.prepare("SELECT id, name, email, tel, institution, position, payload, created_at, 'attendee' as type FROM attendees ORDER BY created_at DESC").all();
    const schools = await env.DB.prepare("SELECT id, school_name as name, contact_email as email, contact_phone as tel, students, staff, address, payload, created_at, 'school' as type FROM schools ORDER BY created_at DESC").all();
    const allRegistrations = [
      ...(attendees.results ?? []).map((row) => ({ ...row, form_type: "attendee" })),
      ...(schools.results ?? []).map((row) => ({ ...row, form_type: "school" }))
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return new Response(JSON.stringify({ success: true, registrations: allRegistrations }), {
      status: 200,
      headers: corsHeaders
    });
  } catch (error) {
    console.error("Registrations debug error:", error);
    return new Response(JSON.stringify({ success: false, message: "Unable to fetch registrations" }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
__name(handleRegistrations, "handleRegistrations");

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-wSoNQK/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-wSoNQK/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=worker.js.map
