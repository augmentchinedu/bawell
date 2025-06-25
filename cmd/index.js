#!/usr/bin/env node
const { init } = require("./core");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");

const app = express();

const router = require("./routes");

// Middlewares
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(router);

// Middleware to serve static assets based on TLD
app.use((req, res, next) => {
	express.static(path.join(__dirname, "client", "dist"))(req, res, next);
});

app.all("/{*any}", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT || 2001;

(async () => {
	await init();

	app.listen(PORT, () => {
		console.log(`Server Started @ ${PORT}`);
	});
})();
