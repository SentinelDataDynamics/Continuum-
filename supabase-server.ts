import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null | undefined;

/**
 * Returns a service-role Supabase client for server-side writes (API routes
 * only — this file is guarded by `server-only` and will fail to build if
 * ever imported into a Client Component).
 *
 * Returns `null` when Supabase hasn't been configured yet, so the app can
 * be deployed and demoed before those environment variables exist. Callers
 * should treat `null` as "skip the write, tell the caller it wasn't saved."
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  if (cachedClient !== undefined) return cachedClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    cachedClient = null;
    return cachedClient;
  }

  cachedClient = createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
  return cachedClient;
}
