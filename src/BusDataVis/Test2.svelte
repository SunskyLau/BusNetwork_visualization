<script>
	import * as echarts from "echarts";
	import { onMount } from "svelte";

	// 直方图
	let chartOptions1 = {
		//横坐标
		xAxis: {
			type: "category",
			data: ["A", "B", "C", "D", "E", "F"],
		},
		//纵坐标
		yAxis: {
			type: "time",
		},
		//数据
		series: [
			{
				name: "Group 1",
				type: "bar",
				data: [
					["A", "2023-04-18T02:30:00Z"],
					["B", "2023-04-18T03:15:00Z"],
					["C", "2023-04-18T04:10:00Z"],
					["D", "2023-04-18T05:00:00Z"],
					["E", "2023-04-18T06:20:00Z"],
					["F", "2023-04-18T07:00:00Z"],
				],
			},
			{
				name: "Group 2",
				type: "bar",
				data: [
					["A", "2023-04-18T03:00:00Z"],
					["B", "2023-04-18T04:20:00Z"],
					["C", "2023-04-18T05:40:00Z"],
					["D", "2023-04-18T06:30:00Z"],
					["E", "2023-04-18T07:50:00Z"],
					["F", "2023-04-18T08:10:00Z"],
				],
			},
		],
		dataZoom: [
			{
				type: "slider",
				show: true,
				xAxisIndex: 0,
				start: 0,
				end: 100,
			},
		],
	};
	// 折线图
	let chartOptions2 = {
		xAxis: {
			type: "category",
			//   横坐标
			data: ["A", "B", "C", "D", "E", "F"],
		},
		yAxis: {
			type: "time",
		},
		series: [
			{
				name: "Series 1",
				type: "line",
				//   横纵坐标
				data: [
					["A", "2023-04-18T02:30:00Z"],
					["B", "2023-04-18T03:15:00Z"],
					["C", "2023-04-18T04:10:00Z"],
					["D", "2023-04-18T05:00:00Z"],
					["E", "2023-04-18T06:20:00Z"],
					["F", "2023-04-18T07:00:00Z"],
				],
			},
		],
		dataZoom: [
			{
				type: "slider",
				show: true,
				xAxisIndex: 0,
				start: 0,
				end: 100,
			},
		],
	};

	// 关系图
	let edges = [
		{ source: "node1", target: "node2", value: 10 },
		// { source: "node2", target: "node1", value: 10 },
		// { source: "node2", target: "node3", value: 20 },
		{ source: "node1", target: "node3", value: 10 },
		{ source: "node1", target: "node4", value: 100 },
	];

	let edges2 = [];
	for (let edge of edges) {
		let normal = {};
		normal["curveness"] = 0.2;
		normal["width"] = edge["value"] / 2;
		edge["lineStyle"] = normal;
		edges2.push(edge);
	}

	let chartOptions3 = {
		series: [
			{
				type: "graph",
				layout: "force",
				// 点
				data: [
					{ id: "node1", name: "节点1", value: 30 },
					{ id: "node2", name: "节点2", value: 50 },
					{ id: "node3", name: "节点3", value: 100 },
					{ id: "node4", name: "节点4", value: 200 },
				],
				// 边
				links: edges2,
				force: {
					initLayout: "circular",
					repulsion: 200,
					edgeLength: 100,
				},
				// 边两端的标记类型
				edgeSymbol: ["circle", "arrow"],
				// 节点的样式
				itemStyle: {
					color: (params) => {
						// console.log(params)
						// 根据节点的值设置颜色
						const value = params.data.value;
						if (value < 40) {
							return "blue";
						} else if (value > 50) {
							return "green";
						} else {
							return "red";
						}
					},
					borderWidth: 2,
					borderColor: "#fff",
				},
				// 节点的大小
				symbolSize: (params) => {
					// console.log("symbolSize:");
					// console.log(params);
					// 根据节点的值设置大小
					const value = params;
					return value / 2;
				},
				// 边的样式
				lineStyle: {
					color: "source",
				},
			},
		],
		// ...
	};

	onMount(() => {
		// 直方图
		let myChart1 = echarts.init(document.getElementById("myChart1"));
		myChart1.setOption(chartOptions1);
		// 折线图
		let myChart2 = echarts.init(document.getElementById("myChart2"));
		myChart2.setOption(chartOptions2);
		// 折线图
		let myChart3 = echarts.init(document.getElementById("myChart3"));
		myChart3.setOption(chartOptions3);
	});
</script>

<!-- 直方图 -->
<div id="myChart1" />
<div id="myChart2" />
<div id="myChart3" />

<style>
	/* 直方图 */
	#myChart1 {
		width: 20vw;
		height: 30vh;
	}
	/* 折线图 */
	#myChart2 {
		/* padding-top: 10vh; */
		width: 20vw;
		height: 30vh;
	}
	/* 关系图 */
	#myChart3 {
		width: 20vw;
		height: 30vh;
	}
</style>
