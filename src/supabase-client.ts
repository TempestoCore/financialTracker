import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  import.meta.env.VITE_API_ADDRESS,
  import.meta.env.VITE_API_KEY
);
