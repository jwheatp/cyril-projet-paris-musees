import express from "express";
import { PrismaClient } from "@prisma/client";

import { fetchAPI } from "../services/fetchAPI.js";
import { getPainting } from "../services/querie.js";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/:id", async (req, res, next) => {
	let paintings;
	try {
		paintings = await fetchAPI(
			getPainting(req.params.id),
			process.env.API_AUTH_TOKEN
		);
		
		res.json(paintings);
	} catch (err) {
		return next(err);
	}
});

export default router;
