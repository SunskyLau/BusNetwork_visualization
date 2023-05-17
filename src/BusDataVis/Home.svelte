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

<div class="header">
  <h1 class="title">北京公交网络可视化系统</h1>
  <button class="logout-btn" on:click={handleLogout}>退出登录</button>
</div>

<hr />

<div class="container">
  <div class="tabs">
    <!-- <button
      class={activeTab === "test1" ? "active" : ""}
      on:click={() => setActiveTab("test1")}>测试1</button
    >
    <button
      class={activeTab === "test2" ? "active" : ""}
      on:click={() => setActiveTab("test2")}>测试2</button
    > -->
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
      class={activeTab === "time-vis" ? "active" : ""}
      on:click={() => setActiveTab("time-vis")}>时序优化</button
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
    {:else if activeTab === "time-vis"}
      <!-- 添加OD客流内容 -->
      <TimeImprove />
    {/if}
  </div>
</div>

<style>
  /* 头部样式 */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #eee;
    border-bottom: 1px solid #ddd;
  }

  .title {
    margin: 0 auto;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
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

  hr {
    margin: 0;
    border: none;
    border-top: 1px solid #ddd;
  }

  /* 内容区域样式 */
  .container {
    display: flex;
    height: 100%;
    box-shadow: 10px 0 0 rgba(0, 0, 0, 0.5);
    /* padding: 20px; */
  }

  .tabs {
    display: flex;
    flex-direction: column;
    width: 10%;
    /* margin-right: 20px; */
    /* background-color: #007aff; */
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
    flex: 1;
    /* background-color: rgb(0, 0, 50); */
    margin: 0;
    padding: 0;
    overflow-y: auto; /* 或 scroll */
  }
</style>
