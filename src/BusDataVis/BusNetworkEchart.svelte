<script>
  import * as echarts from "echarts";
  import "echarts/extension/bmap/bmap";
  import { onMount } from "svelte";

  let line, stationData;
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

  let myChart1;
  let center = [116.46, 39.92];
  let option1 = {
    title: {
      text: "北京市公交网络线路",
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
    tooltip: {
      trigger: "item",
    },
    bmap: {
      center: center,
      zoom: 13,
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
        type: "scatter",
        coordinateSystem: "bmap",
        data: [],
        symbolSize: 30,
        label: {
          show: true,
          position: "right",
          fontSize: 14,
          fontWeight: "bold",
          formatter: "{@[2]}",
          // formatter: function (params) {
          //   // 自定义标签文本
          //   return ["{a|" + params.data[3] + "}", "{b|" + params.data[2] + "}"];
          // },
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            let content =
              "<strong>" +
              params.data[4] +
              "</strong>" +
              " No." +
              params.data[3] +
              "<br/>" +
              params.marker +
              params.data[2];
            return content;
          },
        },
        itemStyle: {
          color: "#ff0000",
        },
      },
    ],
  };

  async function fetchData() {
    const response = await fetch(
      `http://127.0.0.1:5000/busNetwork?line=${line}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  }

  function updateOption() {
    option1["series"][0]["data"] = stationData;
    myChart1.setOption(option1);
  }

  async function handleSearch() {
    stationData = await fetchData();
    // center = [stationData[0][0], stationData[0][1]];
    updateOption();
  }

  function createChart() {
    myChart1 = echarts.init(document.getElementById("chart1"));
    myChart1.setOption(option1);
  }

  onMount(() => {
    createChart();
  });
</script>

<div class="BusNetwork">
  <div class="search-container">
    线路：
    <select bind:value={line}>
      <option disabled selected>选择线路</option>
      {#each lines as item}
        <!-- content here -->
        <option value={item}>{item}</option>
      {/each}
    </select>
    <button on:click={handleSearch}>查询</button>
    <button on:click={fetchData}>测试</button>
  </div>
  <div id="chart1" />
</div>

<style>
  .BusNetwork {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
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
  #chart1 {
    /* position: absolute; */
    /* top: 0;
    left: 0;
    right: 0;
    bottom: 0; */
    /* width: 100%;
    height: 100%; */
    flex: 14;
  }
</style>
