<script>
  import { onMount, onDestroy } from "svelte";

  let bmapgl, view, lineFlow_layer, markerLayer, Line_layer, textLayer;
  let line = "";
  let lines = [
    "104路快车",
    "944路",
    "110路",
    "113路",
    "116路",
    "117路",
    "119路",
    "120路",
    "121路",
    "122路",
    "123路",
    "125路",
    "126路",
    '130路',
    '131路',
    '132路',
    "11路",
    "10路",
    '13路',
    '14路',
    '15路',
    '16路',
    '17路',
    '18路',
  ];

  // 创建地图实例
  function createMap() {
    bmapgl = new BMapGL.Map("Map-container");
    let point = new BMapGL.Point(116.403748, 39.915055);
    // let cityCtrl = new BMapGL.CityListControl(); // 添加城市列表控件
    // bmapgl.addControl(cityCtrl);
    bmapgl.centerAndZoom(point, 17);
    bmapgl.enableScrollWheelZoom(true);
    // bmapgl.setMapStyleV2({
    //   styleId: "d1e6e73b41b83553832f8172aec2b72b",
    // });
  }

  function createLayer() {
    lineFlow_layer = new mapvgl.LineFlowLayer({
      // color: "rgba(255, 71, 26, 0.9)",
      width: 16,
      animation: true,
      duration: 1, // 循环时间1s
      trailLength: 0.8, // 拖尾长度占间隔的0.8
      interval: 1, // 粒子长度占线整体长度的1
    });

    markerLayer = new mapvgl.MarkerListLayer({
      enablePicked: true,
      autoSelect: true,
      fillColor: "rgba(50, 50, 255, 1)",
      fillSize: 30,
      // fillBorderColor:
      // fillBorderWidth:
      shadowColor: "rgba(25, 25, 200, 0.9)",
      shadowSize: 50,
      selectedColor: "#00f", // 选中项颜色
      onClick: (e) => {
        console.log(e);
      },
    });
    Line_layer = new mapvgl.LineLayer({
      color: "rgba(50, 50, 200, 1)",
      blend: "lighter",
      width: 10,
      lineCap: "round",
      lineJoin: "round",
    });
    textLayer = new mapvgl.TextLayer({
      // fontFamily: 'Songti SC',
      fontFamily: '文泉驿微米黑',
      enablePicked: true,
      autoSelect: true,
      // collides: false,
      offset: [0, -24],
      selectedColor: "#f00", // 选中项颜色
      color: "#f0f",
      flat: true
    });

    // view.addLayer(lineFlow_layer);
    view.addLayer(Line_layer);
    view.addLayer(markerLayer);
    view.addLayer(textLayer);
  }

  async function fetchdata() {
    const response = await fetch(
      `http://127.0.0.1:5000/busNetwork?line=${line}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  }

  async function setLayer() {
    let data = await fetchdata();
    let coordinates = [];
    let textData = [];
    for (let i = 0; i < data.length; i++) {
      coordinates.push([data[i][0], data[i][1]]);
      textData.push({
        geometry: {
          type: "Point",
          coordinates: [data[i][0], data[i][1]],
        },
        properties: {
          text: data[i][2],
        },
      });
    }
    let LineFlowData = [
      {
        geometry: {
          type: "LineString",
          coordinates: coordinates,
        },
        properties: {
          color: "rgba(255, 71, 26, 0.9)",
        },
      },
    ];
    let markerData = [];
    for (let i = 0; i < data.length; i++) {
      markerData.push({
        geometry: {
          type: "Point",
          coordinates: [data[i][0], data[i][1]],
        },
        properties: {
          text: data[i][3],
        },
      });
    }
    // lineFlow_layer.setData(LineFlowData);
    markerLayer.setData(markerData);
    Line_layer.setData(LineFlowData);
    textLayer.setData(textData);
  }

  function handleSearch() {
    setLayer();
  }

  onMount(() => {
    createMap();
    view = new mapvgl.View({
      map: bmapgl,
    });
    createLayer();
  });

  onDestroy(() => {
    // 销毁地图和图层实例
    lineFlow_layer.destroy();
    view.destroy();
    bmapgl.destroy();
    lineFlow_layer = null;
    view = null;
    bmapgl = null;
  });
</script>

<div class="search-container">
  线路：
  <select bind:value={line}>
    <option disabled selected>选择线路</option>
    {#each lines as item}
      <!-- content here -->
      <option value={item}>{item}</option>
    {/each}
    <!-- <option disabled selected>选择线路</option>
    <option value='944路'>944路</option>
    <option value="10路">10路</option>
    <option value="104路快车">104路快车</option>
    <option value="110路">110路</option>
    <option value="113路">113路</option>
    <option value="116路">116路</option>
    <option value="117路">117路</option>
    <option value="120路">120路</option>
    <option value="119路">119路</option>
    <option value="11路">11路</option> -->
  </select>
  <button on:click={handleSearch}>查询</button>
  <button on:click={fetchdata}>测试</button>
</div>
<div id="Map-container" />

<style>
  .search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(213, 244, 244);
    height: auto;
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
    position: absolute;
    /* top: 0;
    left: 0;
    right: 0;
    bottom: 0; */
    height: 100%;
    width: 100%;
  }
</style>
