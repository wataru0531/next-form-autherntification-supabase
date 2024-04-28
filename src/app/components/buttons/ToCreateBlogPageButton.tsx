
// クリックするとSupabaseのセッション情報を取得できるボタン

"use client"

import useGetSupabaseSession from "@/app/features/auth/hooks/useGetSupabaseSession";
import React from "react";
import { useRouter } from "next/navigation";

interface ToBlogCreatePageButtonProps {
  children: React.ReactNode
  colorClass?: string
  type?: "button" | "submit" | "reset" // buttonはこの3つしか受け付けない
}

const ToBlogCreatePageButton = ({ children, type, colorClass }: ToBlogCreatePageButtonProps) => {
  const baseClasses = `text-white font-bold py-2 px-4 rounded focus:outline-none`
  const router = useRouter();

  // セッション情報を取得
  const session = useGetSupabaseSession();

  const handleConsoleSession = () => {
    console.log(session);
    // {access_token: 'eyJhbGciOiJIUzI1NiIsImtpZCI6InJ5Sys3Q04zaENQZmxuQ3…HNlfQ.tSj4LSTCAVTXbaTmS7Zy6E_CZ1teWahh_U5yAOouOOQ', token_type: 'bearer', expires_in: 3600, expires_at: 1714228901, refresh_token: 'k3QqrWw5fzB8pT3eumMvvQ', …}
    
    // セッションがあれば、ブログ投稿ページへ。なければSigninページにリダイレクト
    if(session) {
      router.push("/create-post"); 
    } else {
      router.push("/auth/login");
    }
  
  }

  return(
    <button
      type={ type }
      className={`${baseClasses} ${colorClass}`}
      onClick={ handleConsoleSession }
    >
      { children }
    </button>
  )
}

export default ToBlogCreatePageButton;