<script>
  // import { data } from "./static/data/944line.js";
  // 导入 onMount 函数，当组件挂载时执行
  import { onMount, onDestroy } from "svelte";

  // 查询
  let line = null;
  let selectedYear = null;
  let selectedMonth = null;

  //地图控件
  let bmapgl, view, waveLayer, textLayer, bright;

  function createMap() {
    bmapgl = new BMapGL.Map("Map-container");
    let point = new BMapGL.Point(116.403748, 39.915055);
    // let cityCtrl = new BMapGL.CityListControl(); // 添加城市列表控件
    // bmapgl.addControl(cityCtrl);
    bmapgl.centerAndZoom(point, 17);
    bmapgl.enableScrollWheelZoom(true);
    bmapgl.setMapStyleV2({
      styleId: "d1e6e73b41b83553832f8172aec2b72b",
    });
  }

  function createLayer() {
    waveLayer = new mapvgl.CircleLayer({
      // 绘制带波纹扩散的圆
      type: "wave",
      // 扩散半径，支持直接设置和回调两种形式
      radius: (r) => 1.618 * r,
      // radius: 35,
      // 周期影响扩散速度，越小越快
      duration: 1 / 4,
      // 拖尾影响波纹数，越大越多
      trail: 4,
      color: "rgb(255,165,0)",
      random: false,
    });
    textLayer = new mapvgl.TextLayer({
      // fontFamily: 'Songti SC',
      fontFamily: "文泉驿微米黑",
      enablePicked: true,
      autoSelect: true,
      // collides: false,
      selectedColor: "#f00", // 选中项颜色
      color: "#f00",
      flat: true,
    });
    view.addLayer(waveLayer);
    view.addLayer(textLayer);
  }

  async function fetchData() {
    const response = await fetch(
      `http://127.0.0.1:5000/StopFlow/bus_line?line=${line}&selectedYear=${selectedYear}&selectedMonth=${selectedMonth}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  }

  async function setLayer() {
    let data = await fetchData();
    let maxFlow = data[1];
    let stationInfo = data[0];
    let waveData = [];
    let textData = [];
    for (let key in stationInfo) {
      waveData.push({
        geometry: {
          type: "Point",
          coordinates: stationInfo[key]["coord"],
        },
        // size: (stationInfo[key]["count"] / maxFlow) * 30,
        size: (stationInfo[key]["count"] / 500) * 30,
      });
      textData.push({
        geometry: {
          type: "Point",
          coordinates: stationInfo[key]["coord"],
        },
        properties: {
          text: key, // 展示的文字
        },
      });
    }
    waveLayer.setData(waveData);
    textLayer.setData(textData);
  }

  function handleSearch() {
    if (!selectedYear || !selectedMonth || !line) {
      alert("请选择线路和时间！");
      return;
    }
    setLayer();
  }

  onMount(() => {
    createMap();
    // bright = new mapvgl.BrightEffect({
    //   threshold: 0.2,
    //   blurSize: 2.0,
    //   clarity: 0.8,
    // });
    view = new mapvgl.View({
      // effects: [bright],
      map: bmapgl,
    });
    createLayer();
  });

  onDestroy(() => {
    // 销毁地图和图层实例
    waveLayer.destroy();
    view.destroy();
    bmapgl.destroy();
    waveLayer = null;
    view = null;
    bmapgl = null;
  });
</script>

<div class="container">
  <div class="main-container">
    <div class="search-container">
      线路：
      <select bind:value={line}>
        <option disabled selected>选择线路</option>
        <option value="944路">944路</option>
        <option value="104路快车">104路快车</option>

      </select>
      年：
      <select bind:value={selectedYear}>
        <option disabled selected>选择年</option>
        <option value="2012">2012年</option>
        <option value="2013">2013年</option>
      </select>
      月：
      <select bind:value={selectedMonth}>
        <option selected value="">选择月</option>
        <option value="01">1月</option>
        <option value="02">2月</option>
        <option value="03">3月</option>
        <option value="04">4月</option>
        <option value="05">5月</option>
        <option value="06">6月</option>
        <option value="07">7月</option>
        <option value="08">8月</option>
        <option value="09">9月</option>
        <option value="10">10月</option>
        <option value="11">11月</option>
        <option value="12">12月</option>
      </select>

      <button on:click={handleSearch}>查询</button>
      <button on:click={fetchData}>测试</button>
    </div>
    <div id="Map-container" />
  </div>
  <div class="sort-container" />
</div>

<style>
  .container {
    display: flex;
    flex-direction: row; /* 水平方向排列 */
    height: 100%;
    width: 100%;
  }
  .main-container {
    flex: 3; /* 设置左侧元素宽度比例为1 */
    background-color: #eee;
    display: flex;
    flex-direction: column;
  }
  .sort-container {
    flex: 1; /* 设置右侧元素宽度比例为2 */
    background-color: brown;
  }
  .search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(167, 235, 229);
    height: auto;
    flex: 1;
  }

  .search-container select {
    width: 120px;
    height: 40px;
    padding: 5px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
  }

  .search-container button {
    height: 40px;
    padding: 5px 20px;
    font-size: 16px;
    background-color: #4285f4;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
  }

  .search-container button:hover {
    background-color: #357ae8;
  }

  .search-container button:active {
    background-color: #4a77d4;
  }

  #Map-container {
    /* position: absolute; */
    flex: 11;
    /* width: 100%; */
  }
</style>
