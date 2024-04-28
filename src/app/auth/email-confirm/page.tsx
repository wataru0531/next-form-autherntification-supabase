

// 

"use client";

import { useRouter } from "next/navigation";

import Button from "../../components/buttons/Button";


const ConfirmEmail = () => {
  const router = useRouter();
  
  return(
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="max-w-xl w-full bg-white p-8 border border-gray-300 text-center rounded-lg shadow-md">
        <h2 className="font-extrabold mb-6 text-3xl text-gray-700">メールアドレスの確認が必要です。</h2>
        <p className="mb-4 text-gray-700 font-sm">
          登録時に入力したメールアドレスに確認メールを送信しました。
          メール内のリンクをクリックしてアカウントの確認を行なってください。
        </p>

        <Button
          colorClass=" bg-blue-500 hover:bg-blue-600"
          onClick={ () => router.push("/auth/signin") }
          type="button"
        >
          Sign in(ログイン)ページへ
        </Button>
      </div>
    </div>
  )
}

export default ConfirmEmail;