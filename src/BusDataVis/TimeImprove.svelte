<script>
  import * as echarts from "echarts";
  import { onMount } from "svelte";

  let line = null;
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
    "130路",
    "131路",
    "132路",
    "11路",
    "10路",
    "13路",
    "14路",
    "15路",
    "16路",
    "17路",
    "18路",
  ];

  let stopStation = {
    "0": "城铁柳芳站",
    "4": "柳芳北街",
    "13": "国际展览中心",
    "18": "静安庄",
    "20": "静安里",
    "25": "柳芳东口",
    "34": "柳芳西口",
    "38": "西坝河南路",
    "41": "柳芳北口",
    "45": "和平里路口西",
    "57": "和平里北街",
    "63": "兴化路",
    "67": "和平里北街西口",
    "70": "地坛西门",
    "72": "安定门内",
    "74": "交道口南",
    "77": "宽街路口南",
    "79": "美术馆北",
    "81": "灯市西口",
    "84": "新东安市场",
    "89": "王府井",
    "94": "东单路口南",
    "100": "北京站西",
  };
  // 配置马雷图

  let option1 = {
    title: {
      text: "线路车辆运行马雷图",
      subtext: "coded by sundayLiu",
      // sublink: "http://www.pm25.in",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    xAxis: {
      name: "时刻",
      type: "time",
      splitLine: {
        show: true,
      },
    },
    yAxis: {
      name: "站点",
      type: "value",
      min: 0,
      max: 100,
      interval: 1, // 控制刻度的间隔
      splitLine: {
        show: true,
      },
      axisLabel: {
        formatter: function (value) {
          if (value in stopStation) {
            return stopStation[value];
          } else {
            return "";
          }
        },
      },
    },

    series: [
      {
        type: "line",
        color: "red",
        showSymbol: true,
        data: [
          [new Date("2023/5/11 7:00"), 0, "7:00"],
          [new Date("2023/5/11 7:02"), 4, "7:02"],
          [new Date("2023/5/11 7:13"), 13, "7:13"],
          [new Date("2023/5/11 7:15"), 18, "7:15"],
          [new Date("2023/5/11 7:23"), 20, "7:23"],
          [new Date("2023/5/11 7:28"), 25, "7:28"],
          [new Date("2023/5/11 7:35"), 34, "7:35"],
          [new Date("2023/5/11 7:40"), 38, "7:40"],
          [new Date("2023/5/11 7:44"), 41, "7:44"],
          [new Date("2023/5/11 7:48"), 45, "7:48"],
          [new Date("2023/5/11 7:57"), 57, "7:57"],
          [new Date("2023/5/11 8:04"), 63, "8:04"],
          [new Date("2023/5/11 8:10"), 67, "8:10"],
          [new Date("2023/5/11 8:13"), 70, "8:13"],
          [new Date("2023/5/11 8:15"), 72, "8:15"],
          [new Date("2023/5/11 8:18"), 74, "8:18"],
          [new Date("2023/5/11 8:20"), 77, "8:20"],
          [new Date("2023/5/11 8:24"), 79, "8:24"],
          [new Date("2023/5/11 8:27"), 81, "8:27"],
          [new Date("2023/5/11 8:30"), 84, "8:30"],
          [new Date("2023/5/11 8:32"), 89, "8:32"],
          [new Date("2023/5/11 8:40"), 94, "8:40"],
          [new Date("2023/5/11 8:45"), 100, "8:45"],
        ],
        label: {
          show: true,
          formatter: function (params) {
            // 将数据项的名称作为标签的文本内容
            return params.data[2];
          },
        },
      },
      {
        type: "line",
        color: "green",
        showSymbol: true,
        data: [
          [new Date("2023/5/11 7:07"), 0, "7:07"],
          [new Date("2023/5/11 7:11"), 4, "7:11"],
          [new Date("2023/5/11 7:21"), 13, "7:21"],
          [new Date("2023/5/11 7:26"), 18, "7:26"],
          [new Date("2023/5/11 7:27"), 20, "7:27"],
          [new Date("2023/5/11 7:33"), 25, "7:33"],
          [new Date("2023/5/11 7:43"), 34, "7:43"],
          [new Date("2023/5/11 7:50"), 38, "7:50"],
          [new Date("2023/5/11 7:52"), 41, "7:52"],
          [new Date("2023/5/11 7:58"), 45, "7:58"],
          [new Date("2023/5/11 8:10"), 57, "7:10"],
          [new Date("2023/5/11 8:14"), 63, "8:14"],
          [new Date("2023/5/11 8:22"), 67, "8:22"],
          [new Date("2023/5/11 8:25"), 70, "8:25"],
          [new Date("2023/5/11 8:28"), 72, "8:28"],
          [new Date("2023/5/11 8:30"), 74, "8:30"],
          [new Date("2023/5/11 8:35"), 77, "8:35"],
          [new Date("2023/5/11 8:37"), 79, "8:37"],
          [new Date("2023/5/11 8:38"), 81, "8:38"],
          [new Date("2023/5/11 8:42"), 84, "8:42"],
          [new Date("2023/5/11 8:50"), 89, "8:50"],
          [new Date("2023/5/11 8:55"), 94, "8:55"],
          [new Date("2023/5/11 9:00"), 100, "9:00"],
        ],
        label: {
          show: true,
          formatter: function (params) {
            // 将数据项的名称作为标签的文本内容
            return params.data[2];
          },
        },
      },
      {
        type: "line",
        color: "blue",
        showSymbol: true,
        data: [
          [new Date("2023/5/11 7:15"), 0, "7:15"],
          [new Date("2023/5/11 7:17"), 4, "7:17"],
          [new Date("2023/5/11 7:30"), 13, "7:30"],
          [new Date("2023/5/11 7:33"), 18, "7:33"],
          [new Date("2023/5/11 7:35"), 20, "7:35"],
          [new Date("2023/5/11 7:40"), 25, "7:40"],
          [new Date("2023/5/11 7:47"), 34, "7:47"],
          [new Date("2023/5/11 7:55"), 38, "7:55"],
          [new Date("2023/5/11 7:58"), 41, "7:58"],
          [new Date("2023/5/11 8:04"), 45, "8:04"],
          [new Date("2023/5/11 8:20"), 57, "8:20"],
          [new Date("2023/5/11 8:24"), 63, "8:24"],
          [new Date("2023/5/11 8:35"), 67, "8:35"],
          [new Date("2023/5/11 8:37"), 70, "8:37"],
          [new Date("2023/5/11 8:40"), 72, "8:40"],
          [new Date("2023/5/11 8:45"), 74, "8:45"],
          [new Date("2023/5/11 8:46"), 77, "8:46"],
          [new Date("2023/5/11 8:50"), 79, "8:50"],
          [new Date("2023/5/11 8:52"), 81, "8:52"],
          [new Date("2023/5/11 8:55"), 84, "8:55"],
          [new Date("2023/5/11 9:00"), 89, "9:00"],
          [new Date("2023/5/11 9:07"), 94, "9:07"],
          [new Date("2023/5/11 9:15"), 100, "9:15"],
        ],
        label: {
          show: true,
          formatter: function (params) {
            // 将数据项的名称作为标签的文本内容
            return params.data[2];
          },
        },
      },
    ],
  };
  const option = {
    title: {
      text: "马雷图示例",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    xAxis: {
      type: "time",
      splitLine: {
        show: true,
      },
    },
    yAxis: {
      type: "category",
      splitLine: {
        show: true,
      },
      axisTick: {
        alignWithLabel: true,
      },
      data: ["A站", "B站", "C站", "D站", "E站"],
    },
    series: [
      {
        type: "line",
        showSymbol: true,
        data: [
          { value: [new Date("2023/5/11 0:00"), 0, "A站"] },
          { value: [new Date("2023/5/11 2:00"), 1, "B站"] },
          { value: [new Date("2023/5/11 6:00"), 2, "C站"] },
          { value: [new Date("2023/5/11 8:00"), 3, "D站"] },
          { value: [new Date("2023/5/11 10:00"), 4, "E站"] },
        ],
        lineStyle: {
          opacity: 0.5,
        },
      },
    ],
  };
  let option2 = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    xAxis: {
      type: "time",
      splitLine: {
        show: true,
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: true,
      },
      axisLabel: {
        formatter: function (value, index) {
          // 将 y 轴标签的文本内容转换为数据项的名称
          let data = option1.series[0].data;
          if (data[index]) {
            return data[index].name;
          }
          return "";
        },
      },
    },
    series: [
      {
        type: "line",
        showSymbol: true,
        data: [
          { name: "A", value: [new Date("2023/5/11 0:00"), 20] },
          { name: "B", value: [new Date("2023/5/11 2:00"), 25] },
          { name: "C", value: [new Date("2023/5/11 6:00"), 50] },
          { name: "D", value: [new Date("2023/5/11 8:00"), 70] },
          { name: "E", value: [new Date("2023/5/11 10:00"), 60] },
          { name: "F", value: [new Date("2023/5/11 14:00"), 40] },
          { name: "G", value: [new Date("2023/5/11 16:00"), 30] },
          { name: "H", value: [new Date("2023/5/11 20:00"), 20] },
        ],
        label: {
          show: true,
          formatter: function (params) {
            // 将数据项的名称作为标签的文本内容
            return params.data.name;
          },
        },
      },
    ],
  };

  onMount(() => {
    let myChart1 = echarts.init(document.getElementById("myChart1"));
    myChart1.setOption(option1);
  });
</script>

<div class="TimeImprove">
  <div class="search-container">
    线路：
    <select bind:value={line}>
      <option disabled selected>选择线路</option>
      {#each lines as item}
        <!-- content here -->
        <option value={item}>{item}</option>
      {/each}
    </select>
    <input type="date" />
    <button>查询</button>
  </div>
  <div id="myChart1" />
</div>

<style>
  .TimeImprove {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
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
    flex: 14;
  }
</style>
