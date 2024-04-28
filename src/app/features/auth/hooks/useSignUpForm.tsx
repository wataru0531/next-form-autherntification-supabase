// 新規登録のフック

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { signupFormSchema } from "../lib/formSchema";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export const useSignUpForm = () => {
  const router = useRouter();

  const [ error, setError ] = useState<string>("")

  // フォームの状態を管理するためのオブジェクトを生成
  // useForm → フックを使用してフォームの状態を管理
  //           フォームの入力値、バリデーション、送信処理などの操作を行うためのメソッドやプロパティを提供
  // zodResolver → フォームのバリデーションを行う
  //               Zodスキーマを使って react-hook-formのフォームバリデーションを行うための解決策(resolver)です
  //               resolver...useFormフックのオプション。フォームのバリデーションを行うための関数で、ここではzodResolverを使用
  //               zodResolver()...スキーマを受け取り、フォームデータをスキーマに従って検証
  // defaultValues ... フォームのフィールドに初期値を設定
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // z.infer ... Zodを使用して定義したスキーマから、そのスキーマの型を推論して型を生成する
  // → これにより、スキーマで定義した構造に従っているデータを、TypeScriptで静的に型検査できるようになる。
  const onSubmit: SubmitHandler<z.infer<typeof signupFormSchema>> = async (data) => {
    const { username, email, password } = data;

    // Supabaseとの通信
    try {
      // ユーザーを新規登録
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        
      });

      if(signUpError){
        // console.log(signUpError.message);

        if(signUpError.message.includes("User already registered")){
          setError("すでに登録済みのユーザーです。")
        } else {
          setError("エラーが発生しました。もう一度お試しください")
        }

        // throw signUpError;
        return; // catch文には入れない
      }

      // 新規ユーザーをデータベースに登録
      // errorオブジェクトを受け取り、userErrorという任意の名前をつけている
      const { error: userError } = await supabase.from("User").insert([
        {
          id: data.user?.id,
          username,
          email,
        }
      ]);

      if(userError) {
        // console.log(userError.message);

        // ユーザーの登録が重複した場合などの状態を保持
        // setError(userError.message);

        // ユーザーの登録が重複した場合などの状態を保持
        if(userError.message.includes("User already registered")){
          setError("すでに登録済みのユーザーです。")
        } else {
          setError("エラーが発生しました。もう一度お試しください")
        }

        // throw userError;
        return; // catch文には入れない
      }

      router.push("/auth/email-confirm");

    } catch(error){
      // catchブロック
      // → JSで変数未定義、プロパティにアクセスできなかったりなどのエラーがtryブロック
      //   で起きたりするとこのブロックに入る。
      //   throwキーワードで明示的にエラーをスローした時もcatchブロックに入る
      if(error instanceof Error){
        console.log(error.message);

        // // ユーザーの登録が重複した場合などの状態を保持
        // if(error.message.includes("User already registered")){
        //   setError("すでに登録済みのユーザーです。")
        // } else {
        //   setError("エラーが発生しました。もう一度お試しください")
        // }
      }
    }

    // console.log(username, email, password)
  };

  return {
    form,
    onSubmit,
    error,
  };
};
