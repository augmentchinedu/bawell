#!/usr/bin/env node

const chokidar = require("chokidar");
const path = require("path");
const os = require("os");

function saveChangedFiles() {
	// Save All
}

function start() {
	// Save All Altered Files To Repository

	saveChangedFiles();
}

function initialize() {
	start();

	const docsPath = path.join(os.homedir(), "Documents");

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

initialize();
