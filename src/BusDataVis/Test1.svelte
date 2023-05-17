<script>
	// 导入 onMount 函数，当组件挂载时执行
	import { onMount, onDestroy } from "svelte";

	let bmapgl, view, lineTrip_layer, Flylayer, bright;

	onMount(() => {
		// 1. 创建地图实例
		bmapgl = new BMapGL.Map("container");
		let point = new BMapGL.Point(116.403748, 39.915055);
		// let cityCtrl = new BMapGL.CityListControl(); // 添加城市列表控件
		// let convertor = new BMapGL.Convertor(); //坐标转换器

		// bmapgl.addControl(cityCtrl);
		bmapgl.centerAndZoom(point, 17);
		bmapgl.enableScrollWheelZoom(true);
		// bmapgl.setMapStyleV2({
		//   styleId: 'd1e6e73b41b83553832f8172aec2b72b'
		// });
		// 2. 创建 MapVGL 图层管理器
		bright = new mapvgl.BrightEffect({
			threshold: 0.2,
			blurSize: 2.0,
			clarity: 0.8,
		});
		view = new mapvgl.View({
			effects: [bright],
			map: bmapgl,
		});

		var layer = new mapvgl.HeatLineLayer({
			gradient: {
				0.0: "rgb(50, 50, 256)",
				0.1: "rgb(50, 250, 56)",
				0.5: "rgb(250, 250, 56)",
				1.0: "rgb(250, 50, 56)",
			},
			data: [
				{
					geometry: {
						type: "LineString",
						coordinates: [
							[116.394191, 39.91334],
							[116.417259, 39.913672],
						],
					},
				},
			],
		});

		lineTrip_layer = new mapvgl.LineTripLayer({
			color: "rgba(50, 50, 200, 1)",
			step: 0.3,
			trailLength: 20,
			startTime: 0,
			endTime: 100,
			data: [
				{
					geometry: {
						type: "LineString",
						coordinates: [
							[116.394191, 39.91334],
							[113.417259, 35.913672],
						],
					},
				},
			],
		});

		Flylayer = new mapvgl.FlyLineLayer({
			color: "rgba(50, 50, 50, 1)",
			textureColor: "rgba(50, 50, 50, 1)",
			textureWidth: 10,
			textureLength: 50,
			data: [
				{
					geometry: {
						type: "LineString",
						coordinates: [
							[116.394191, 39.91334],
							[116.417259, 39.913672],
						],
					},
				},
			],
		});

		view.addLayer(lineTrip_layer);
		view.addLayer(Flylayer);
	});

	onDestroy(() => {
		// 销毁地图和图层实例
		lineTrip_layer.destroy();
		Flylayer.destroy();
		view.destroy();
		bmapgl.destroy();
		lineTrip_layer = null;
		Flylayer = null;
		view = null;
		bmapgl = null;
	});
</script>

<!-- 容器，用于放置 -->
<div id="container" />

<style>
	#container {
		position: absolute;
		/* top: 0;
    left: 0;
    right: 0;
    bottom: 0; */
		height: 100%;
		width: 100%;
	}
</style>
