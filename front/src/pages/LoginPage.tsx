import React, { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // ログイン処理（API呼び出し）
  };

  return <div>{/* ログインフォーム */}</div>;
}

export default LoginPage;
