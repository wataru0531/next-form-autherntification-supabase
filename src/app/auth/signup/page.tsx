
// 新規登録フォーム
"use client"

import Link from "next/link";

import InputField from '@/app/features/auth/components/inputField'
import Button from '@/app/components/buttons/Button'
import { useSignUpForm } from '@/app/features/auth/hooks/useSignUpForm';

const Signup = () => {
  // form ... フォームの入力値、バリデーション、送信処理などの操作を行うためのメソッドやプロパティを格納
  const { form, onSubmit, error } = useSignUpForm();
  // console.log(form) // {control: {…}, trigger: ƒ, register: ƒ, handleSubmit: ƒ, watch: ƒ, …}
  
  return (
    <div className='mx-auto max-w-sm my-14 '>
      <h2 className="text-center font-medium text-2xl mb-4">Sign Up 新規登録</h2>

      <p className="text-red-500 text-center">{ error }</p>

      <form onSubmit={ form.handleSubmit(onSubmit) }>
        <InputField 
          label="ユーザー名" 
          name="username" 
          type="text" 
          placeholder="ユーザー名" 
          // register ... バリデーションを設定
          // registerオブジェクトを渡してやる
          register={ form.register } 
        />
        { form.formState.errors.username?.message && 
          <p className='text-red-500'>{ form.formState.errors.username?.message }</p> 
        }
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
            Signup
          </Button>
        </div>
        
      </form>

      <Link
        href="/auth/signin"
        className="mt-4 block text-center text-blue-400"
      >
        すでに登録済みの方はこちら
      </Link>

    </div>
  )
}

export default Signup