export interface JwtHeader {
  alg: string;
  typ: string;
}

export type JwtPayload = Record<string, unknown> & {
  id: string;
  email: string;
  name: string;
  role: 'PARTICIPANT' | 'ADMIN';
  exp: number;
  iat: number;
};

/**
 * Decode a JWT without verifying its signature.
 * Returns header and payload objects. Do not use this for trust decisions.
 */
// TypeScript
export function decodeJwt<TPayload = JwtPayload>(
  token: string | undefined
): { header: JwtHeader; payload: TPayload } | null {
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length < 2) {
    throw new Error("Invalid JWT: token must have at least 2 segments.");
  }

  const [encodedHeader, encodedPayload] = parts;

  const headerJson = base64UrlDecodeToString(encodedHeader);
  const payloadJson = base64UrlDecodeToString(encodedPayload);

  try {
    const header = JSON.parse(headerJson) as JwtHeader;
    const payload = JSON.parse(payloadJson) as TPayload;
    return {header, payload};
  } catch {
    throw new Error("Invalid JWT: failed to parse JSON segments.");
  }
}

/* Internal helpers */

function base64UrlDecodeToString(input: string): string {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = padBase64(b64);

  // Prefer Node's Buffer if available
  if (typeof Buffer !== "undefined" && typeof Buffer.from === "function") {
    return Buffer.from(padded, "base64").toString("utf-8");
  }

  // Fallback to atob + TextDecoder in browsers
  const binary =
    typeof atob === "function"
      ? atob(padded)
      : (() => {
        throw new Error("Base64 decoding is not supported in this environment.");
      })();

  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

  if (typeof TextDecoder !== "undefined") {
    return new TextDecoder().decode(bytes);
  }

  // Final minimal fallback
  let out = "";
  for (let i = 0; i < bytes.length; i++) out += String.fromCharCode(bytes[i]);
  try {
    // Attempt to recover UTF‑8
    return decodeURIComponent(escape(out));
  } catch {
    return out;
  }
}

function padBase64(b64: string): string {
  const mod = b64.length % 4;
  return mod === 0 ? b64 : b64 + "=".repeat(4 - mod);
}