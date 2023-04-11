import React, { useState } from "react";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    // 登録処理（API呼び出し）
  };

  return <div>{/* 登録フォーム */}</div>;
}

export default RegisterPage;
