
// サインイン(ログイン)ページ

"use client"

import Link from "next/link";

import InputField from '@/app/features/auth/components/inputField'
import Button from '@/app/components/buttons/Button'
import { useSignInForm } from '@/app/features/auth/hooks/useSignInForm'

const Signin = () => {
  // form ... フォームの入力値、バリデーション、送信処理などの操作を行うためのメソッドやプロパティを格納
  const { form, onSubmit, error} = useSignInForm();
  // console.log(form) // {control: {…}, trigger: ƒ, register: ƒ, handleSubmit: ƒ, watch: ƒ, …}
  
  return (
    <div className='mx-auto max-w-sm my-14 '>
      <h2 className="text-center font-medium text-2xl mb-4">Sign In ログイン</h2>

      <p className="text-red-500 text-center">{ error }</p> 

      <form onSubmit={ form.handleSubmit(onSubmit) }>
        {/* TODO すでにユーザーが存在していた場合のバリデーションを追加 */}

        <InputField 
          label="メールアドレス"
          name="email"
          type="email"
          placeholder="メールアドレス"
          register={ form.register }
        />
        { form.formState.errors.email?.message && 
          <p className="text-red-500">{ form.formState.errors.email?.message }</p> 
        }

        <InputField
          label="パスワード"
          name="password"
          type="password"
          placeholder="パスワード"
          register={ form.register }
        />
        { form.formState.errors.password?.message &&
          <p className="text-red-500">{ form.formState.errors.password?.message }</p>
        }

        <div className='mt-4'>
          {/* フォームで */}
          <Button type="submit" colorClass="bg-blue-500 hover:bg-blue-700 duration-200">
            Signin
          </Button>
        </div>
        
      </form>

      <Link 
        href="/auth/signup"
        className="mt-4 block text-center text-blue-400"
      >
        初めてご利用の方はこちら
      </Link>
    </div>
  )
}

export default Signin