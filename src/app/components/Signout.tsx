

// サインアウトするためのコンポーネント

"use client"

import { supabase } from "../features/auth/lib/supabaseClient";
import Button from "./buttons/Button";

import { useRouter } from "next/navigation";

const Signout = () => {
  const router = useRouter();
  
  const onClickSignout = async () => {
    console.log("signout done!!")

    await supabase.auth.signOut();

    // router.refresh(); 
  }

  return(
    <div>
      <Button
        colorClass="bg-pink-500 hover:bg-pink-600"
        type="button"
        onClick={ onClickSignout }
      >
        Sign out(ログアウト)
      </Button>
    </div>
  )

}

export default Signout;