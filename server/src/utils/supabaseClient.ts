import {createClient} from "@supabase/supabase-js";
import {env} from "../env";

const supabaseUrl = env.SUPABASE_URL;
const supabaseKey = env.SUPABASE_KEY; // service role biar bisa write
export const supabase = createClient(supabaseUrl, supabaseKey);
