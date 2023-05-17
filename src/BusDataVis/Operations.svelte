<script>
	import * as echarts from "echarts";
	import { onMount } from "svelte";

	let line,
		station = null;
	let stations = [];
	let lines = ["104路快车", "944路"];
	let selectedDate = "2022-05-01";

	// 直方图
	let chartOptions1 = {
		// title: {
		// 	text: "北京市公交线路运营",
		// 	subtext: "coded by sundayLiu",
		// 	// sublink: "http://www.pm25.in",
		// 	left: "center",
		// },
		// tooltip: {
		// 	trigger: "item",
		// },
		// //横坐标
		// xAxis: {
		// 	name: "班次",
		// 	type: "category",
		// 	data: ["1", "2", "3", "4", "5", "6"],
		// },
		// //纵坐标
		// yAxis: {
		// 	name: "发车时间",
		// 	type: "time",
		// },
		// //数据
		// series: [
		// 	{
		// 		name: "Group 1",
		// 		type: "bar",
		// 		data: [
		// 			["1", "2023-04-18T02:30:00Z"],
		// 			["2", "2023-04-18T03:15:00Z"],
		// 			["3", "2023-04-18T04:10:00Z"],
		// 			["4", "2023-04-18T05:00:00Z"],
		// 			["5", "2023-04-18T06:20:00Z"],
		// 			["6", "2023-04-18T07:00:00Z"],
		// 		],
		// 		showBackground: true,
		// 		backgroundStyle: {
		// 			color: "rgba(180, 180, 180, 0.2)",
		// 		},
		// 	},

		// ],
		// dataZoom: [
		// 	{
		// 		type: "slider",
		// 		show: true,
		// 		xAxisIndex: 0,
		// 		start: 0,
		// 		end: 100,
		// 	},
		// ],
		title: {
			text: "北京市公交线路运营",
			subtext: "coded by sundayLiu",
			// sublink: "http://www.pm25.in",
			left: "center",
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
			},
		},
		grid: {
			left: "3%",
			right: "4%",
			bottom: "3%",
			containLabel: true,
		},
		xAxis: [
			{
				name: "班次",
				type: "category",
				data: [
					"1",
					"2",
					"3",
					"4",
					"5",
					"6",
					"7",
					"8",
					"9",
					"10",
					"11",
					"12",
					"13",
					"14",
				],
				axisTick: {
					alignWithLabel: true,
				},
			},
		],
		yAxis: [
			{
				name: "发车时间",
				type: "time",
			},
		],
		series: [
			{
				name: "944",
				type: "bar",
				barWidth: "60%",
				data: [
					["1", "2022-04-30T23:31:00Z"],
					["2", "2022-05-01T00:28:00Z"],
					["3", "2022-05-01T01:37:00Z"],
					["4", "2022-05-01T02:30:00Z"],
					["5", "2022-05-01T03:24:00Z"],
					["6", "2022-05-01T04:25:00Z"],
					["7", "2022-05-01T05:35:00Z"],
					["8", "2022-05-01T06:30:00Z"],
					["9", "2022-05-01T07:40:00Z"],
					["10", "2022-05-01T08:22:00Z"],
					["11", "2022-05-01T09:30:00Z"],
					["12", "2022-05-01T10:44:00Z"],
					["13", "2022-05-01T11:35:00Z"],
					["14", "2022-05-01T12:33:00Z"],
				],
			},
		],
	};
	// 折线图
	let chartOptions2 = {
		// title: {
		// 	text: "北京市公交站点运营",
		// 	subtext: "coded by sundayLiu",
		// 	// sublink: "http://www.pm25.in",
		// 	left: "center",
		// },
		// tooltip: {
		// 	trigger: "item",
		// },
		// xAxis: {
		// 	type: "category",
		// 	//   横坐标
		// 	data: ["A", "B", "C", "D", "E", "F"],
		// },
		// yAxis: {
		// 	type: "time",
		// },
		// series: [
		// 	{
		// 		name: "Series 1",
		// 		type: "line",
		// 		//   横纵坐标
		// 		data: [
		// 			["A", "2023-04-18T02:30:00Z"],
		// 			["B", "2023-04-18T03:15:00Z"],
		// 			["C", "2023-04-18T04:10:00Z"],
		// 			["D", "2023-04-18T05:00:00Z"],
		// 			["E", "2023-04-18T06:20:00Z"],
		// 			["F", "2023-04-18T07:00:00Z"],
		// 		],
		// 	},
		// ],
		// dataZoom: [
		// 	{
		// 		type: "slider",
		// 		show: true,
		// 		xAxisIndex: 0,
		// 		start: 0,
		// 		end: 100,
		// 	},
		// ],
		title: {
			text: "北京市公交线路运营",
			subtext: "coded by sundayLiu",
			// sublink: "http://www.pm25.in",
			left: "center",
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
			},
		},
		grid: {
			left: "3%",
			right: "4%",
			bottom: "3%",
			containLabel: true,
		},
		xAxis: [
			{
				name: "班次",
				type: "category",
				data: [
					"1",
					"2",
					"3",
					"4",
					"5",
					"6",
					"7",
					"8",
					"9",
					"10",
					"11",
					"12",
					"13",
					"14",
				],
				axisTick: {
					alignWithLabel: true,
				},
			},
		],
		yAxis: [
			{
				name: "到达时间",
				type: "time",
			},
		],
		series: [
			{
				name: "菜户营桥西",
				type: "line",
				barWidth: "60%",
				data: [
					["1", "2022-05-01T00:31:00Z"],
					["2", "2022-05-01T01:28:00Z"],
					["3", "2022-05-01T02:37:00Z"],
					["4", "2022-05-01T03:30:00Z"],
					["5", "2022-05-01T04:24:00Z"],
					["6", "2022-05-01T05:25:00Z"],
					["7", "2022-05-01T06:35:00Z"],
					["8", "2022-05-01T07:30:00Z"],
					["9", "2022-05-01T08:40:00Z"],
					["10", "2022-05-01T09:22:00Z"],
					["11", "2022-05-01T10:30:00Z"],
					["12", "2022-05-01T11:44:00Z"],
					["13", "2022-05-01T12:35:00Z"],
					["14", "2022-05-01T13:33:00Z"],
				],
			},
		],
	};
	async function fetchLineData() {
		const response = await fetch(
			`http://127.0.0.1:5000/busNetwork?line=${line}`
		);
		const data = await response.json();
		console.log(data);
		return data;
	}
	async function handleChange() {
		let data = await fetchLineData();
		let stationTemp = [];
		for (let i of data) {
			stationTemp.push(i[2]);
		}
		stations = stationTemp;
		station = null;
	}
	function handleSearch() {
		console.log(selectedDate);
	}
	function fetchData() {}

	onMount(() => {
		// 直方图
		let myChart1 = echarts.init(document.getElementById("myChart1"));
		myChart1.setOption(chartOptions1);
		// 折线图
		let myChart2 = echarts.init(document.getElementById("myChart2"));
		myChart2.setOption(chartOptions2);
	});
</script>

<div class="search-container">
	线路：
	<select bind:value={line} on:change={handleChange}>
		<option disabled selected>选择线路</option>
		{#each lines as item}
			<!-- content here -->
			<option value={item}>{item}</option>
		{/each}
	</select>
	站点：
	<select bind:value={station}>
		<option disabled selected>选择站点</option>
		{#each stations as item}
			<!-- content here -->
			<option value={item}>{item}</option>
		{/each}
	</select>
	<input type="date" bind:value={selectedDate} />
	<button on:click={handleSearch}>查询</button>
	<button on:click={fetchData}>测试</button>
</div>
<!-- 直方图 -->
<div id="myChart1" />
<div id="myChart2" />

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
	/* 直方图 */
	#myChart1 {
		width: 100%;
		height: 40vh;
	}
	/* 折线图 */
	#myChart2 {
		margin-top: 20px;
		width: 100%;
		height: 40vh;
	}
</style>
