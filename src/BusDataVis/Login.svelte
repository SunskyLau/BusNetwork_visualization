<script>
  import { navigate } from "svelte-routing";
  import { onMount } from "svelte";

  let username = "";
  let password = "";
  let usernameInput;

  async function handleLogin() {
    if (username && password) {
      const response = await fetch(
        `http://127.0.0.1:5000/login?username=${username}&password=${password}`
      );
      const data = await response.text();
      if (data == "yes") {
        navigate("/Home");
      } else {
        alert("用户名或密码错误");
      }
    } else {
      alert("请输入用户名和密码！");
    }
  }

  function handleKeydown() {
    if (event.key === "Enter") {
      handleLogin();
    }
  }

  onMount(() => {
    usernameInput.focus();
  });
</script>

<div class="container">
  <div class="login-form">
    <h1 class="title">北京公交网络可视化系统</h1>
    <h2>用户登录</h2>
    <div class="input-row">
      <label for="username">用户名：</label>
      <input
        type="text"
        id="username"
        bind:value={username}
        bind:this={usernameInput}
        on:keydown={handleKeydown}
      />
    </div>
    <div class="input-row">
      <label for="password">密码：</label>
      <input
        type="password"
        id="password"
        bind:value={password}
        on:keydown={handleKeydown}
      />
    </div>
    <button on:click={handleLogin}>登录</button>
  </div>
</div>

<style>
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    max-width: 500px; /* 设置最大宽度 */
    margin-left: auto; /* 设置左边距 */
    margin-right: auto; /* 设置右边距 */
  }

  .title {
    color: #4521e7;
    text-align: center;
    margin-top: 20px;
  }

  .input-row {
    display: inline-block;
    margin-bottom: 10px;
    width: 300px;
  }

  label {
    display: inline-block;
    width: 80px;
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
    text-align: right;
  }

  input {
    display: inline-block;
    width: 150px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  input:focus {
    border-color: #4caf50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
    outline: none;
  }

  button {
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #3e8e41;
  }

  .container {
    /* background-color: #140101; */
    background-image: url("./static/img/Login-background.gif");
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }

  h2 {
    color: #333;
    font-size: 24px;
    margin-bottom: 30px;
  }

  input[type="text"],
  input[type="password"] {
    background-color: #f5f5f5;
  }

  label {
    color: #777;
  }
</style>
