import express from "express";

import paintings from "../routes/paintings.js";

const router = express.Router();

router.use("/paintings", paintings);

router.use((err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		return res.status(401).json({ msg: "Ton JWT est invalide !" });
	}

	if (err.status === undefined) {
		err.status = 500;
	}

	return res.status(err.status).json({ error: err.message });
});

export default router;
