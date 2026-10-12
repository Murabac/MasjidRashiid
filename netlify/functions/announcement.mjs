import { getStore } from "@netlify/blobs";

const MAX_BYTES = 4 * 1024 * 1024;

function liveOrigin(origin) {
  return origin === "https://rashiid.m2btek.com";
}

export default async function handler(request) {
  var origin = request.headers.get("origin") || "";
  var live = liveOrigin(origin);

  if (request.method === "OPTIONS") {
    if (!live) return new Response(null, { status: 403 });
    return new Response(null, {
      status: 204,
      headers: {
        "access-control-allow-origin": origin,
        "access-control-allow-methods": "GET, PUT, DELETE, OPTIONS",
        "access-control-allow-headers": "content-type",
        vary: "Origin"
      }
    });
  }

  var store = getStore("masjid-rashiid");

  if (request.method === "GET") {
    var meta = await store.get("announcement-meta", { type: "json" });
    var bytes = meta && meta.type ? await store.get("announcement-image", { type: "arrayBuffer" }) : null;
    if (!bytes) {
      return new Response(null, {
        status: 404,
        headers: { "access-control-allow-origin": "*", "cache-control": "no-store" }
      });
    }
    return new Response(bytes, {
      status: 200,
      headers: {
        "content-type": meta.type,
        "cache-control": "no-store",
        "access-control-allow-origin": "*"
      }
    });
  }

  if (request.method === "PUT" || request.method === "DELETE") {
    if (origin && !live) return new Response("forbidden", { status: 403 });
  }

  if (request.method === "PUT") {
    var type = (request.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
    if (type.indexOf("image/") !== 0) return new Response("invalid", { status: 400 });
    var buf = await request.arrayBuffer();
    if (buf.byteLength < 32 || buf.byteLength > MAX_BYTES) return new Response("too large", { status: 413 });
    await store.set("announcement-image", buf);
    await store.setJSON("announcement-meta", { type: type, bytes: buf.byteLength });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json", "cache-control": "no-store" }
    });
  }

  if (request.method === "DELETE") {
    try { await store.delete("announcement-image"); } catch (err) {}
    try { await store.delete("announcement-meta"); } catch (err) {}
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json", "cache-control": "no-store" }
    });
  }

  return new Response("method", { status: 405 });
}

export const config = { path: "/api/announcement" };
