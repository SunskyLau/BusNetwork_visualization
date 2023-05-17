<script>
  // 导入 echarts 库和bmap库和 onMount 方法
  import * as echarts from "echarts";
  import "echarts/extension/bmap/bmap";
  import { onMount } from "svelte";

  let chart1, chart2; //echart实例
  let center = [116.403748, 39.915055];
  let maxFlow, top5;
  // 查询
  let line, selectedYear, selectedMonth;
  //散点数据
  let effectScatterData = [
    // {
    // 	name: "天安门",
    // 	value: [116.403954, 39.915125],
    // },
    // {
    // 	name: "国家博物馆",
    // 	value: [116.407979, 39.913482],
    // },
    // 可以添加多个地点数据
  ];

  let chartOption1 = {
    // 百度地图配置项
    //标题
    title: {
      text: "北京市公交站点客流图",
      subtext: "coded by sundayLiu",
      // sublink: "http://www.pm25.in",
      left: "center",
      textStyle: {
        color: "white",
      },
      subtextStyle: {
        color: "white",
      },
    },
    /*在 ECharts 中，tooltip 是用于展示鼠标悬停在数据项上时的提示框组件。这段代码表示当用户鼠标悬停在数据项上时触发 tooltip 显示提示信息。
    trigger: "item" 表示当用户鼠标悬停在数据项上时触发，"item"表示数据项触发，如果设置为 "axis" 则表示坐标轴触发。*/
    tooltip: {
      trigger: "item",
    },
    //地图
    bmap: {
      center: center,
      zoom: 12,
      type: "map",
      roam: true,
      mapStyle: {
        styleJson: [
          {
            featureType: "water",
            elementType: "all",
            stylers: {
              color: "#031628",
            },
          },
          {
            featureType: "land",
            elementType: "geometry",
            stylers: {
              color: "#000102",
            },
          },
          {
            featureType: "highway",
            elementType: "all",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "arterial",
            elementType: "geometry.fill",
            stylers: {
              color: "#000000",
            },
          },
          {
            featureType: "arterial",
            elementType: "geometry.stroke",
            stylers: {
              color: "#0b3d51",
            },
          },
          {
            featureType: "local",
            elementType: "geometry",
            stylers: {
              color: "#000000",
            },
          },
          {
            featureType: "railway",
            elementType: "geometry.fill",
            stylers: {
              color: "#000000",
            },
          },
          {
            featureType: "railway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#08304b",
            },
          },
          {
            featureType: "subway",
            elementType: "geometry",
            stylers: {
              lightness: -70,
            },
          },
          {
            featureType: "building",
            elementType: "geometry.fill",
            stylers: {
              color: "#000000",
            },
          },
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: {
              color: "#857f7f",
            },
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#000000",
            },
          },
          {
            featureType: "building",
            elementType: "geometry",
            stylers: {
              color: "#022338",
            },
          },
          {
            featureType: "green",
            elementType: "geometry",
            stylers: {
              color: "#062032",
            },
          },
          {
            featureType: "boundary",
            elementType: "all",
            stylers: {
              color: "#465b6c",
            },
          },
          {
            featureType: "manmade",
            elementType: "all",
            stylers: {
              color: "#022338",
            },
          },
          {
            featureType: "label",
            elementType: "all",
            stylers: {
              visibility: "off",
            },
          },
        ],
      },
    },
    series: [
      {
        name: "站点客流量", // 系列名称
        type: "effectScatter", // 图表类型为散点图
        coordinateSystem: "bmap", // 指定该系列所使用的坐标系类型
        data: effectScatterData, // 系列中的数据项
        symbolSize: function (val) {
          // 根据数据项设置散点大小
          return val[2] / 5;
        },
        encode: {
          value: 2, // 对应数据项中的第 2 列数据
        },
        showEffectOn: "render", // 散点图特效的触发时机，即渲染时触发
        rippleEffect: {
          brushType: "stroke", // 波纹特效的绘制方式为描边
        },
        label: {
          formatter: "{b}", // 标签内容为数据项名称
          position: "right", // 标签位置
          show: true, // 是否显示标签
        },
        itemStyle: {
          shadowBlur: 15, // 图形的阴影模糊大小
          shadowColor: "#ff0000", // 图形的阴影颜色
          color: "#ed7048", // 散点颜色
        },
        emphasis: {
          scale: true, // 高亮时是否放大图形
        },
        zlevel: 1, // 图层层级
      },
    ],
  };
  let chartOption2 = {
    title: {
      text: "站点客流Top5",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: "category",
      // data: ["Brazil", "Indonesia", "USA", "India", "China", "World"],
      data: [],
    },
    series: [
      {
        name: "站点-客流",
        type: "bar",
        // data: [18203, 23489, 29034, 104970, 131744, 630230],
        data: [],
      },
    ],
  };
  async function fetchData() {
    const response = await fetch(
      `http://127.0.0.1:5000/StopFlow?line=${line}&selectedYear=${selectedYear}&selectedMonth=${selectedMonth}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  }

  function updateOption() {
    chartOption1["series"][0]["data"] = effectScatterData;
    chart1.setOption(chartOption1);
    chartOption2["yAxis"]["data"] = top5[0];
    chartOption2["series"][0]["data"] = top5[1];
    chart2.setOption(chartOption2);
  }

  async function handleSearch() {
    if (!selectedYear || !selectedMonth || !line) {
      alert("请选择线路和时间！");
      return;
    }
    let data = await fetchData();
    let stationInfo = data[0];
    top5 = data[1];
    maxFlow = data[2];
    effectScatterData = [];
    for (let key in stationInfo) {
      effectScatterData.push({
        name: key,
        value: stationInfo[key]["coord"].concat(stationInfo[key]["count"]),
      });
    }
    updateOption();
  }

  function createOption() {
    // 初始化 echarts 图表，并将其挂载到 id 为 myChart 的 DOM 元素上
    chart1 = echarts.init(document.getElementById("myChart1"));
    chart1.setOption(chartOption1);
    chart2 = echarts.init(document.getElementById("myChart2"));
    chart2.setOption(chartOption2);
  }

  onMount(() => {
    createOption();
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
    <div id="myChart1" />
  </div>
  <div class="sort-container">
    <div id="myChart2" />
  </div>
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
    background-color: #eee;
  }
  .search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(213, 244, 244);
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

  #myChart1 {
    /* position: absolute; */
    flex: 18;
    /* width: 100%; */
  }
  #myChart2 {
    width: 100%;
    height: 90%;
  }
</style>
