// サインイン(ログイン用のフック)

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { signinFormSchema } from "../lib/formSchema";
import { supabase } from "../lib/supabaseClient";

export const useSignInForm = () => {
  const [error, setError] = useState<string>("");
  const router = useRouter();

  // フォームの状態を管理するためのオブジェクトを生成
  // useForm → フックを使用してフォームの状態を管理
  //           フォームの入力値、バリデーション、送信処理などの操作を行うためのメソッドやプロパティを提供
  // zodResolver → フォームのバリデーションを行う
  //               Zodスキーマを使って react-hook-formのフォームバリデーションを行うための解決策(resolver)です
  //               resolver...useFormフックのオプション。フォームのバリデーションを行うための関数で、ここではzodResolverを使用
  //               zodResolver()...スキーマを受け取り、フォームデータをスキーマに従って検証
  // defaultValues ... フォームのフィールドに初期値を設定
  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // z.infer ... Zodを使用して定義したスキーマから、そのスキーマの型を推論して型を生成する
  // → これにより、スキーマで定義した構造に従っているデータを、TypeScriptで静的に型検査できるようになる。
  const onSubmit: SubmitHandler<z.infer<typeof signinFormSchema>> = async (data) => {
    const { email, password } = data;

    // Supabaseとの通信
    try {
      // ユーザーを新規登録
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if(signInError){
        // console.log(signInError.message);

        if(signInError.message.includes("Invalid login credentials" || "Email not confirmed")){
          setError("登録済みのメールアドレス、パスワードを入力してください");
        }
        return; // catch文には入れない
      }

      router.push("/");

    } catch(error){
      if(error instanceof Error){
        console.log(error.message);
      }
    }
  };

  return {
    form,
    onSubmit,
    error,
  };
};
