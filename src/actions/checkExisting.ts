"use server";

import { supabase } from "@/utils/supabase/server";

export async function checkExisting(email: string) {
    const { data, error } = await supabase
    .rpc('get_or_create_user', { user_email: email });
    if(error) {
        throw new Error(error.message);
    }
    console.log("data", data);
    return data;
}