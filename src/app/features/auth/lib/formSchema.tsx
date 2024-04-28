
// スキーマ

// スキーマとは?
// スキーマ(Schema)は、データの構造、形式、および特定の要件を定義するための設計図やテンプレートのようなもの。
// スキーマを使うと、データが正しい形式であるかどうか、必要なフィールドが存在するかどうかなどを確認できます。

// スキーマの主な用途
// データの検証、データの変換、データのドキュメント化、エラーの防止


import { z } from "zod";

// 型定義とバリデーションを定義

// サインアップ 新規登録
// z.object() ... スキーマを定義し、その中に含めたいプロパティと適用するルールを指定
export const signupFormSchema = z.object({
  username: z.string().min(2, { message: "ユーザー名は2文字上で入力してください。" }),

  email: z.string().email({ message: "メールアドレスが正しくありません" }),

  password: z.string()
  .min(6, { message: "パスワードは6文字以上で入力してください。" }) // Supabaseはha6文字以上
  .max(10, { message: "パスワードは10文字以内で入力してください" })
})


// サインイン ログイン用
export const signinFormSchema = z.object({
  email: z.string().email({ message: "メールアドレスが正しくありません" }),

  password: z.string()
  .min(6, { message: "パスワードは6文字以上で入力してください" })
  .max(10, { message: "パスワードは10文字以内で入力してください" })
})