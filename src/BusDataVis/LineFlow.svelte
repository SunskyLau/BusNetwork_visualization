<script>
	// 导入 echarts 库和 onMount 方法
	import * as echarts from "echarts";
	import "echarts/extension/bmap/bmap";
	import { onMount, onDestroy } from "svelte";
	// import { update_await_block_branch } from "svelte/internal";

	let chart;
	let center = [116.403748, 39.915055];
	let line = null;
	let year = null;
	let month = null;
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
	let geoLinesData = [
		{
			fromName: "天安门",
			toName: "国际展览中心",
			coords: [
				[116.403954, 39.915125],
				[116.407979, 39.913482],
			],
			value: 50,
		},
		{
			fromName: "国际展览中心",
			toName: "天安门",
			coords: [
				[116.407979, 39.913482],
				[116.403954, 39.915125],
			],
			value: 60,
		},
		// 可以添加多条连线数据
	];

	let effectScatterData = [
		{
			name: "天安门",
			value: [116.403954, 39.915125],
		},
		{
			name: "国家博物馆",
			value: [116.407979, 39.913482],
		},
		// 可以添加多个地点数据
	];

	let chartOption = {
		// 百度地图配置项
		//标题
		title: {
			text: "北京市公交线路客流图",
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
		bmap: {
			center: center,
			zoom: 15,
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
		tooltip: {
			trigger: "item",
		},
		series: [
			// 线条图层
			{
				name: "动态OD客流量",
				type: "lines", // 图表类型为线条图
				//指定该系列所使用的坐标系类型
				coordinateSystem: "bmap",
				zlevel: 1, // 图层层级
				effect: {
					// 线条动画效果
					show: true, // 是否显示动画效果
					period: 10, // 动画周期，单位为秒
					trailLength: 0.5, // 特效尾迹的长度，值为 0 到 1
					// color: "#ffff00", // 线条颜色
					symbolSize: 4, // 动画图形大小
				},
				tooltip: {
					trigger: "item",
					formatter: function (params) {
						// 拼接需要展示的属性
						let content =
							"<strong>" +
							params.seriesName +
							"</strong>" +
							"<br/>" +
							params.marker +
							params.data.fromName +
							" -> " +
							params.data.toName +
							"<br/>" +
							"客流量: " +
							"<strong>" +
							params.data.value +
							"</strong>";
						return content;
					},
				},
				lineStyle: {
					// 线条样式
					color: function getColorByValue(params) {
						let value = params.data.value;
						// let maxValue = params.data.maxValue
						// let minValue = params.data.minValue
						let maxValue = 5;
						let minValue = 1;
						let startColor = [0, 255, 255]; // 青色
						let endColor = [255, 0, 255]; // 紫色
						let ratio = (value - minValue) / (maxValue - minValue);
						if (ratio > 1) {
							ratio = 1;
						}
						if (ratio < 0) {
							ratio = 0;
						}
						let color = [
							parseInt((endColor[0] - startColor[0]) * ratio + startColor[0]),
							parseInt((endColor[1] - startColor[1]) * ratio + startColor[1]),
							parseInt((endColor[2] - startColor[2]) * ratio + startColor[2]),
						];
						return "rgb(" + color.join(",") + ")";
					},

					width: 0.2, // 线条宽度
					curveness: 0.2, // 线条的曲度
					// color: "#00ff00", // 修改线条颜色为绿色
					// width: 1, // 修改线条宽度为1
					// curveness: 0.5, // 修改曲度程度为0.5
				},
				data: geoLinesData, // 线条的起始点和终点坐标数据
			},
			// 散点图层
			{
				name: "站点",
				type: "effectScatter", // 图表类型为散点图
				coordinateSystem: "bmap", // 坐标系为百度地图
				zlevel: 2, // 图层层级
				rippleEffect: {
					// 点击动画效果
					brushType: "stroke", // 波纹的绘制方式
				},
				label: {
					// 散点上的标签
					show: true, // 是否显示标签
					position: "right", // 标签位置
					formatter: "{b}", // 标签文本格式
				},
				tooltip: {
					trigger: "item",
					formatter: function (params) {
						let content =
							"<strong>" +
							params.seriesName +
							"</strong>" +
							"<br/>" +
							params.marker +
							params.data.name +
							"<br/>" +
							"经度: " +
							"<strong>" +
							params.data.value[0] +
							"</strong>" +
							"<br/>" +
							"纬度: " +
							"<strong>" +
							params.data.value[1] +
							"</strong>";
						return content;
					},
				},
				symbolSize: 8, // 散点大小
				itemStyle: {
					// 散点样式
					color: "#ed7048", // 散点颜色
				},
				data: effectScatterData, // 散点坐标数据
			},
		],
	};

	function updateOption() {
		chartOption["series"][0]["data"] = geoLinesData;
		chartOption["series"][1]["data"] = effectScatterData;
		chartOption["bmap"]["center"] = center;
		chart.setOption(chartOption);
	}

	async function fetchdata() {
		const response = await fetch(
			`http://127.0.0.1:5000/LineFlow?line=${line}&year=${year}&month=${month}`
		);
		const data = await response.json();
		console.log(data);
		return data;
	}

	async function handleSearch() {
		if (!line) {
			alert("请选择线路！");
			return;
		}
		let data = await fetchdata();
		effectScatterData = data[0];
		geoLinesData = data[1];
		center = effectScatterData[0]["value"];
		updateOption();
	}

	function createOption() {
		// 初始化 echarts 图表，并将其挂载到 id 为 myChart 的 DOM 元素上
		chart = echarts.init(document.getElementById("myChart"));
		chart.setOption(chartOption);
	}
	// function destroyAll() {
	// 	chart.destroy();
	// 	center.destroy();
	// 	line.destroy();
	// 	lines.destroy();
	// 	geoLinesData.destroy();
	// 	effectScatterData.destroy();
	// 	chartOption.destroy();
	// }
	// 在组件挂载时执行的方法
	onMount(() => {
		createOption();
	});
	// onDestroy(() => {
	// 	destroyAll();
	// });
</script>

<div class="LineFlow">
	<div class="search-container">
		线路：
		<select bind:value={line}>
			<option disabled selected>选择线路</option>
			{#each lines as item}
				<!-- content here -->
				<option value={item}>{item}</option>
			{/each}
		</select>
		年：
		<select bind:value={year}>
			<option disabled selected>选择年</option>
			<option value="2012">2012年</option>
			<option value="2013">2013年</option>
		</select>
		月：
		<select bind:value={month}>
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
		<button on:click={fetchdata}>测试</button>
	</div>
	<div id="myChart" />
</div>

<style>
	.LineFlow {
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

	#myChart {
		/*width: 20vw;*/
		/*height: 30vh;*/
		flex: 14;
	}
</style>
