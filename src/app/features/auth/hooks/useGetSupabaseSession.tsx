
// Supabasのセッション情報を取得してコンソールに出すフック


"use client";

import {  useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const useGetSupabaseSession = () => {
  const router = useRouter();

  // Session ... セッション情報の型
  // null ... 最初はセッション情報がないためnullとなる
  const [ session, setSession ] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      setSession(session);
    }

    fetchSession();
  }, []);

  return session;
}

export default useGetSupabaseSession;