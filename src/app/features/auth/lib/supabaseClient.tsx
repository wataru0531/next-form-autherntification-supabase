

// 

import { createClient } from '@supabase/supabase-js'

// クライアントオブジェクトを作成
// → Supabaseのサービス(データベース、認証、ストレージなど)と通信するためのメソッドを持つオブジェクト。

// as string ... string型と明示
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// createClient()
// → Supabaseのクライアントオブジェクトを作成し、Supabaseのサービスと通信するためのエンドポイントと認証情報をセットアップ
// このSupabaseクライアントを使って、クライアント側（フロントエンド）からSupabaseのサービスにアクセスし、
// データの取得、追加、更新、削除などの操作を行うことが可能となる
export const supabase = createClient(supabaseUrl, supabaseKey)


