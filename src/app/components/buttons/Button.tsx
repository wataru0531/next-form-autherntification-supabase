
// 共通ボタン

import React from "react";

// ボタンのtype
// ボタンの意図した動作を確実にするために、type属性を設定することは良い習慣とされている。
// 特に、NextなどのReactアプリケーションでは、ボタンのクリックイベントがさまざまな
// コンポーネント間で定義されるため、ボタンの挙動を明確にするために type 属性を設定するのがベストプラクティスだとも言われる

// formの中でのbuttonはtypeがデフォルトでsubmitとなるため指定しなくてもいい。
// なので、form内で送信とは関係ないbuttonにはtype="button"とつければクリックしても送信されない

interface ButtonProps {
  children: React.ReactNode
  colorClass?: string
  type?: "button" | "submit" | "reset" // buttonはこの3つしか受け付けない
  onClick?: () => void
}

const Button = ({ children, type, colorClass, onClick }: ButtonProps) => {
  const baseClasses = `text-white font-bold py-2 px-4 rounded focus:outline-none`

  return(
    <button
      type={ type }
      className={`${baseClasses} ${colorClass}`}
      onClick={ onClick }
    >
      { children }
    </button>
  )
}

export default Button;