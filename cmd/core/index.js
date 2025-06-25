const { exec } = require("child_process");

const chokidar = require("chokidar");
const path = require("path");
const os = require("os");
const fs = require("fs");

let data;

function init() {
	data = fs.existsSync("data.json")
		? JSON.parse(fs.readFileSync("data.json", "utf-8"))
		: {};

	if (data.username) start();
	else signin();
}

function signin() {
	const data = {
		username: "augmentchinedu",
		workspace: "Documents",
	};

	fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
}

function start() {
	const docsPath = path.join(os.homedir(), data.workspace);

	console.log(`📂 Watching: ${docsPath} (excluding node_modules)`);

	// Ignore hidden files AND node_modules folders
	chokidar
		.watch(docsPath, {
			ignored: /(^|[\/\\])(\.git|node_modules)/,
			persistent: true,
		})
		.on("add", (path) => console.log(`📄 File added: ${path}`))
		.on("change", (path) => console.log(`✏️ File changed: ${path}`))
		.on("unlink", (path) => console.log(`🗑️ File removed: ${path}`))
		.on("addDir", (path) => console.log(`📁 Directory added: ${path}`))
		.on("unlinkDir", (path) => console.log(`❌ Directory removed: ${path}`))
		.on("error", (error) => console.error(`❗Error: ${error}`));
}

module.exports = { init };
