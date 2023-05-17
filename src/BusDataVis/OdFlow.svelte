<script>
	import * as echarts from "echarts";
	import { onMount } from "svelte";
	let colors = ["#FFB6C1", "#FFC0CB", "#FF0F50", "#E6E6FA", "#FF1493"];
	let count = 0;
	let myChart1;
	let lines = [
		"104路快车",
		"944路",
		// "110路",
		// "113路",
		// "116路",
		// "117路",
		// "119路",
		// "120路",
		// "121路",
		// "122路",
		// "123路",
		// "125路",
		// "126路",
		// "130路",
		// "131路",
		// "132路",
		// "11路",
		// "10路",
		// "13路",
		// "14路",
		// "15路",
		// "16路",
		// "17路",
		// "18路",
	];
	let line = null;
	let stations = [];
	let station = null;
	let year = null;
	let month = null;

	let nodes = [
		{ id: "node1", name: "节点1", value: 30 },
		{ id: "node2", name: "节点2", value: 50 },
		{ id: "node3", name: "节点3", value: 100 },
		{ id: "node4", name: "节点4", value: 200 },
	];
	// 关系图
	let edges = [
		{
			source: "node1",
			target: "node2",
			value: 10,
		},
		{
			source: "node1",
			target: "node3",
			value: 10,
		},
		{
			source: "node1",
			target: "node4",
			value: 100,
		},
	];

	let chartOptions1 = {
		title: {
			text: "北京市公交OD客流图",
			subtext: "coded by sundayLiu",
			// sublink: "http://www.pm25.in",
			left: "center",
		},
		tooltip: {
			// trigger: "item",
		},
		animationDurationUpdate: 1500,
		animationEasingUpdate: "quinticInOut",
		series: [
			{
				name: "OD客流图",
				type: "graph",
				layout: "circular",
				circular: {
					rotateLabel: true,
				},
				//开启漫游（也称为拖拽或平移）功能
				roam: true,
				label: {
					position: "right",
					formatter: "{b}",
					show: true, // 是否显示标签
				},
				// 节点的样式
				itemStyle: {
					color: () => {
						let color = colors[count];
						count += 1;
						if (count > 4) {
							count = 0;
						}
						return color;
					},
					borderWidth: 2,
					borderColor: "#fff",
				},
				//边样式
				lineStyle: {
					color: "target",
					curveness: 0.2,
					width: 5,
				},
				// 点
				data: nodes,
				// 边
				links: edges,

				// 边两端的标记类型
				edgeSymbol: ["circle", "arrow"],
				// 节点的大小
				symbolSize: (params) => {
					// console.log("symbolSize:");
					// console.log(params);
					// 根据节点的值设置大小
					const value = params;
					return value * 0.8;
				},
			},
		],
	};
	function updateOption() {
		chartOptions1["series"][0]["data"] = nodes;
		chartOptions1["series"][0]["links"] = edges;
		myChart1.setOption(chartOptions1);
	}
	async function fetchLineData() {
		const response = await fetch(
			`http://127.0.0.1:5000/busNetwork?line=${line}`
		);
		const data = await response.json();
		console.log(data);
		return data;
	}
	async function fetchOdData() {
		const response = await fetch(
			`http://127.0.0.1:5000/OdFlow?line=${line}&station=${station}&year=${year}&month=${month}`
		);
		const data = await response.json();
		console.log(data);
		return data;
	}
	async function handleSearch() {
		if (!line || !station || !year || !month) {
			alert("请选择线路和站点！");
			return;
		}
		let data = await fetchOdData();
		nodes = data[0];
		edges = data[1];
		updateOption();
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

	onMount(() => {
		myChart1 = echarts.init(document.getElementById("myChart1"));
		myChart1.setOption(chartOptions1);
	});
</script>

<div class="ODFlow">
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
		<button on:click={fetchLineData}>测试</button>
	</div>
	<div id="myChart1" />
</div>

<style>
	.ODFlow {
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
