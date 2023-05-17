// import App from './Route-test/App.svelte';
// import Bind from "./Bind.svelte"
// import Style from "./Style.svelte"
// import Xiaoming from "./Xiaoming.svelte"
import App from './BusDataVis/App.svelte';
const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;