

import Image from "next/image";
import Link from "next/link";

import { supabase } from "./features/auth/lib/supabaseClient";
import Button from "./components/buttons/Button";
import ToBlogCreatePageButton from "./components/buttons/ToCreateBlogPageButton";
import Signout from "./components/Signout";

function Home() {

  // getSession
  // ユーザーのセッション情報を取得することで、現在のユーザーの状態を確認できる。
  // これにより、ユーザーがログインしているかどうか、または特定のアクションを許可するかどうかなどを判断できる
  // dataオブジェクトの中のsessionプロパティを分割代入で取得

  // const handleBlogPost = async () => {
  //   const { data: { session } } = await supabase.auth.getSession();
  //   console.log(session) // { session: null }

  // }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      
      <h2 className="font-medium mb-5">RHF & Zod</h2>

      <div className="mb-5">
        {/* 新規登録 signup */}
        <Link 
          href={"/auth/signup"}
          className="mr-4 inline-block bg-red-500 py-3 px-6 rounded-md text-white hover:bg-red-600 duration-200"
        >
          Signup( 新規登録 )
        </Link>

        {/* ログイン */}
        <Link
          href={"/auth/signin"}
          className="inline-block bg-blue-500 py-3 px-6 rounded-md text-white hover:bg-blue-600 duration-200"
        >
          Signin( ログイン )
        </Link>

        <div className="mt-16 text-center">
          <Signout />
        </div>

      </div>

      {/* TODO これをクライアントコンポーネントに切り分ける */}
      {/* <Button 
        colorClass="bg-green-500 mt-4" 
        type="button" 
        onClick={ () => handleBlogPost() }
      >
        ブログ投稿
      </Button> */}

      {/* セッション情報を取得するボタンコンポーネント */}
      <ToBlogCreatePageButton
        colorClass="bg-green-500 mt-4"
        // type="button"
      >
        ブログ投稿ページへ
      </ToBlogCreatePageButton>

    </main>
  );
}

export default Home;