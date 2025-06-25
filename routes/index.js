const express = require("express");
const router = express.Router();

const fs = require("fs");
const archiver = require("archiver");
const path = require("path");

router.get("/download", async (req, res) => {
	const folderToZip = path.join(__dirname, "..", "cmd");
	const zipName = "bawell.zip";

	res.setHeader("Content-Disposition", `attachment; filename=${zipName}`);
	res.setHeader("Content-Type", "application/zip");

	const archive = archiver("zip", { zlib: { level: 9 } });

	// Stream archive data to the response
	archive.pipe(res);

	// Append entire folder
	archive.directory(folderToZip, false);

	archive.finalize();

	archive.on("error", (err) => {
		console.error("Archive error:", err);
		res.status(500).send({ error: "Could not create zip" });
	});
});

module.exports = router;
