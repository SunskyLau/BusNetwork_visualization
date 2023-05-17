<script>
  // import BusNetwork from "./BusNetwork.svelte";
  // import StopFlow from "./StopFlow.svelte";
  // import Test1 from "./Test1.svelte";
  // import Test2 from "./Test2.svelte";
  // import Test from "./Test.svelte";
  import { navigate } from "svelte-routing";
  import LineFlow from "./LineFlow.svelte";
  import OdFlow from "./OdFlow.svelte";
  import TimeImprove from "./TimeImprove.svelte";
  import Operations from "./Operations.svelte";
  import StopFlowEchart from "./StopFlowEchart.svelte";
  import BusNetworkEchart from "./BusNetworkEchart.svelte";

  let activeTab = "BusNetwork"; // 默认显示地图

  function setActiveTab(tab) {
    activeTab = tab;
  }

  function handleLogout() {
    navigate("/");
  }
</script>

<div class="bigbox">
  <div class="header">
    <h1 class="title">北京公交网络可视化系统</h1>
    <button class="logout-btn" on:click={handleLogout}>退出登录</button>
  </div>
  <div class="container">
    <div class="tabs">
      <button
        class={activeTab === "BusNetwork" ? "active" : ""}
        on:click={() => setActiveTab("BusNetwork")}>公交网络</button
      >
      <button
        class={activeTab === "Operations" ? "active" : ""}
        on:click={() => setActiveTab("Operations")}>运营情况</button
      >
      <button
        class={activeTab === "line" ? "active" : ""}
        on:click={() => setActiveTab("line")}>线路客流</button
      >
      <button
        class={activeTab === "stop" ? "active" : ""}
        on:click={() => setActiveTab("stop")}>站点客流</button
      >
      <button
        class={activeTab === "OD" ? "active" : ""}
        on:click={() => setActiveTab("OD")}>OD客流</button
      >
      <button
        class={activeTab === "marey" ? "active" : ""}
        on:click={() => setActiveTab("marey")}>马雷图</button
      >
    </div>
    <div class="content">
      {#if activeTab === "BusNetwork"}
        <!-- 添加公交网络内容 -->
        <BusNetworkEchart />
      {:else if activeTab === "Operations"}
        <!-- 添加公交网络内容 -->
        <Operations />
      {:else if activeTab === "line"}
        <!-- 添加线路客流内容 -->
        <LineFlow />
      {:else if activeTab === "stop"}
        <!-- 添加站点客流内容 -->
        <StopFlowEchart />
      {:else if activeTab === "OD"}
        <!-- 添加OD客流内容 -->
        <OdFlow />
      {:else if activeTab === "marey"}
        <!-- 添加OD客流内容 -->
        <TimeImprove />
      {/if}
    </div>
  </div>
</div>

<style>
  .bigbox {
    background-color: antiquewhite;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 80px 1fr;
  }
  .header {
    background-color: #2093cf;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    font-weight: bold;
    text-align: center;
    flex: 1; /* 将标题设置为可伸缩的，占据剩余空间 */
    color: beige;
    display: flex; /* 使标题里的文本也能垂直居中 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
  }
  .logout-btn {
    padding: 8px 12px;
    border: none;
    background-color: #007aff;
    color: #fff;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
  }

  .logout-btn:hover {
    background-color: #0062cc;
  }
  .container {
    margin: 10px 10px;
    flex-direction: row;
    display: flex;
    background-color: antiquewhite;
  }
  .tabs {
    flex: 1;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    background-color: white;
  }
  .tabs button {
    padding: 10px;
    border: none;
    background-color: transparent;
    color: #333;
    font-size: 16px;
    cursor: pointer;
  }
  .tabs button.active {
    color: #007aff;
    font-weight: bold;
    border-bottom: 2px solid #007aff;
  }
  .content {
    flex: 8;
    background-color: white;
  }
</style>
