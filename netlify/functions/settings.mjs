import { getStore } from "@netlify/blobs";
import { purgeCache } from "@netlify/cache";

const TAG = "masjid-screen";

const MAX_BYTES = 120000;

function json(body, status, origin) {
  var headers = {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  };
  if (origin) headers["access-control-allow-origin"] = origin;
  return new Response(JSON.stringify(body), { status: status || 200, headers: headers });
}

export default async function handler(request) {
  var origin = request.headers.get("origin") || "";
  var live = origin === "https://rashiid.m2btek.com";

  if (request.method === "OPTIONS") {
    if (!live) return new Response(null, { status: 403 });
    return new Response(null, {
      status: 204,
      headers: {
        "access-control-allow-origin": origin,
        "access-control-allow-methods": "GET, PUT, OPTIONS",
        "access-control-allow-headers": "content-type",
        vary: "Origin"
      }
    });
  }

  var store = getStore("masjid-rashiid");

  if (request.method === "GET") {
    var saved = await store.get("screen", { type: "json" });
    var res = json(saved || { settings: null, athkaar: null, updatedAt: null }, 200, "*");
    // Browsers always re-check, but Netlify's CDN keeps the answer until a PUT purges it,
    // so polling screens are served from cache and do not run this function.
    res.headers.set("cache-control", "public, max-age=0, must-revalidate");
    res.headers.set("netlify-cdn-cache-control", "public, durable, s-maxage=31536000");
    res.headers.set("netlify-cache-tag", TAG);
    return res;
  }

  if (request.method === "PUT") {
    if (origin && !live) return json({ error: "forbidden" }, 403);
    var text = await request.text();
    if (text.length > MAX_BYTES) return json({ error: "too large" }, 413);
    var body;
    try {
      body = JSON.parse(text);
    } catch (err) {
      return json({ error: "invalid" }, 400);
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) return json({ error: "invalid" }, 400);
    var current = (await store.get("screen", { type: "json" })) || {};
    var next = {
      settings: body.settings && typeof body.settings === "object" && !Array.isArray(body.settings) ? body.settings : (current.settings || null),
      athkaar: body.athkaar && typeof body.athkaar === "object" && !Array.isArray(body.athkaar) ? body.athkaar : (current.athkaar || null),
      updatedAt: new Date().toISOString()
    };
    await store.setJSON("screen", next);
    try { await purgeCache({ tags: [TAG] }); } catch (err) {}
    return json(next, 200, live ? origin : "");
  }

  return json({ error: "method" }, 405);
}

export const config = { path: "/api/settings" };
