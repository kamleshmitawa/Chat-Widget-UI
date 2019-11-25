// let poly = require("preact-cli/lib/lib/webpack/polyfills");
import { h } from "preact";
import habitat from "preact-habitat";
import RootApp from "./components/facebookStart/RootApp";

let _habitat = habitat(RootApp);

_habitat.render({
  selector: '[data-widget-host="habitat"]',
  clean: true
});
